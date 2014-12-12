myHomeApp.controller('SearchController', ['$scope', '$sessionStorage', 'Homes', 'removeSpaceFilter', function($scope, $sessionStorage, Homes, removeSpaceFilter) {

    /**
     * CONTROLLER VARIABLE DEFINITIONS
     */

    var searchSelf = this;

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
    $scope.liveCount = {};

    // Types
    $scope.allHomeTypes = null;


    // Areas
    $scope.choose = false;

    // Likes
    $scope.likes = $scope.$storage.local.likes;


    /**
     * CONTROLLER FUNCTIONS
     */

    // Home types
    /**
     * Generates an object of categories that contain objects of keys and count values
     * @param {object} data The data from which to search for the values
     * @param {string} key  The key to search for
     */
    $scope.setPropCounts = function(data, key) {
        var propCount;
        var matchObj = {};
        // Set the key as an object key
        $scope.liveCount[key] = {};
        for (var i = 0; i < data.length; i++) {
            $scope.liveCount[key][removeSpaceFilter(data[i][key])] = [];
            matchObj[key] = data[i][key];
            propCount = $scope.countFilteredProp(data, matchObj);
            $scope.liveCount[key][removeSpaceFilter(data[i][key])] = propCount.true;
        }
    };

    $scope.countFilteredProp = function(filteredHomes, matchObj) {
        return _.countBy(filteredHomes, matchObj);
    };

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

    // Price slider
    $scope.translate = function(value) {
        return value + ' €';
    };


    /**
     * CONTROLLER FUNCTION CALLS
     */

    $scope.allHomeTypes = $scope.isSearchAllTypes();

    $scope.$watch('$storage.homes.toSelect', function (newVal, oldVal, scope) {
        if (newVal) {
            $scope.setSelected();
        }
    }, true);

    $scope.$on('filteredHomes', function(event, data) {
        $scope.filteredHomes = data;
        $scope.allHomeTypes = $scope.isSearchAllTypes();

        $scope.setPropCounts(data, 'area');
        $scope.setPropCounts(data, 'type');
    });
}]);