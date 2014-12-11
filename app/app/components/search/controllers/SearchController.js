myHomeApp.controller('SearchController', ['$scope', '$sessionStorage', 'Homes', function($scope, $sessionStorage, Homes) {

    /**
     * CONTROLLER VARIABLE DEFINITIONS
     */

    $scope.$storage = $sessionStorage.$default({
        paramsInit: {
            areas: [],
            isAvailable: true,
            orderby: 'dateAdded',
            reverseOrder: true,
            hasBalcony: '',
            hasGarden: '',
            allowsPets: '',
            hasSauna: '',
            priceRange: {
                min: 0,
                max: 2000,
                ceil: 2000,
                floor: 0,
                step: 50
            }
        }
    });

    $scope.$storage = $sessionStorage.$default({
        params: angular.copy($scope.$storage.paramsInit)
    });

    // Homes
    $scope.results = {};
    $scope.results.count = 0;

    // Areas
    $scope.choose = false;

    // Likes
    $scope.likes = $scope.$storage.local.likes;


    /**
     * CONTROLLER FUNCTIONS
     */

    // Areas
    $scope.setSelected = function() {
        $scope.toSelectAreas = Homes.getToSelect();
        $scope.selectedAreas = Homes.getSelected();
    };

    $scope.addArea = function(area) {
        Homes.addSelected(area);
        Homes.removeToSelect(area);
        $scope.setSelected();
    };

    $scope.removeArea = function(area) {
        Homes.removeSelected(area);
        Homes.addToSelect(area);
        $scope.setSelected();
    };

    $scope.resetSelectedAreas = function() {
        Homes.resetSelected();
        $scope.setSelected();
    };

    // Order
    $scope.reverseOrder = function() {
        $scope.$storage.params.reverseOrder = !$scope.$storage.params.reverseOrder;
    };

    $scope.isReversed = function() {
        return $scope.$storage.params.reverseOrder;
    };

    // Search reset
    $scope.resetSearch = function() {
        $scope.$storage.params = angular.copy($scope.$storage.paramsInit);
        $scope.$storage.searchReset = false;
        Homes.resetSelected();
        $scope.setSelected();
        $scope.choose = false;
    };

    // Likes
    $scope.resetLikes = function() {
        $scope.$storage.local.likes = [];
    };

    // Price slider
    $scope.translate = function(value) {
        return value + ' €';
    }

    /**
     * CONTROLLER FUNCTION CALLS
     */

    $scope.$watch('$storage.homes.toSelect', function (newVal, oldVal, scope) {
        if (newVal) {
            $scope.setSelected();
        }
    }, true);
}]);