myHomeApp.controller('SearchController', ['$scope', '$sessionStorage', 'Homes', 'Likes', 'removeSpaceFilter', function($scope, $sessionStorage, Homes, Likes, removeSpaceFilter) {

    /**
     * CONTROLLER VARIABLE DEFINITIONS
     */

    $scope.$storage = $sessionStorage.$default({
        paramsInit: {
            areas: [],
            isAvailable: true,
            types: {
                studio: false,
                apartment: false,
                rowhouse: false,
                house: false
            },
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
            },
            views: {
                last: 'grid',
                map: {
                    location: {
                        latitude: 60.173964,
                        longitude: 24.941025
                    },
                    zoom: 14
                }
            }
        }
    });

    $scope.$storage = $sessionStorage.$default({
        params: angular.copy($scope.$storage.paramsInit)
    });

    // Homes
    $scope.results = {};
    $scope.results.count = 0;
    $scope.filteredHomes = {};
    $scope.liveCount = Homes.getCounts();

    // Types
    $scope.allHomeTypes = null;


    // Areas
    $scope.choose = false;

    // Likes
    $scope.likes = $scope.$storage.local.likes;

    // Map
    $scope.bounds = {};


    /**
     * CONTROLLER FUNCTIONS
     */

    // Home types
    $scope.resetHomeTypes = function() {
        $scope.$storage.params.types = {
            studio: false,
            apartment: false,
            rowhouse: false,
            house: false
        };
    };

    $scope.isSearchAllTypes = function() {
        if (($scope.$storage.params.types.studio === false && $scope.$storage.params.types.apartment == false && $scope.$storage.params.types.rowhouse == false && $scope.$storage.params.types.house == false) ||
            ($scope.$storage.params.types.studio === true && $scope.$storage.params.types.apartment == true && $scope.$storage.params.types.rowhouse == true && $scope.$storage.params.types.house == true)) {
            return true;
        }
        return false;
    };

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

    $scope.removeFavorite = function(homeId) {
        Likes.remove(homeId);
        $scope.$storage.local.likes = Likes.get()
    };

    // Price slider
    $scope.translate = function(value) {
        return value + ' €';
    };


    /**
     * CONTROLLER FUNCTION CALLS
     */

    $scope.$watch('$storage.homes.toSelect', function (newVal, oldVal, scope) {
        if (newVal) {
            $scope.setSelected();
        }
    }, true);
}]);