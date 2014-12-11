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

    // Types
    $scope.liveCount = {};
    $scope.allHomeTypes = null;


    // Areas
    $scope.choose = false;

    // Likes
    $scope.likes = $scope.$storage.local.likes;


    /**
     * CONTROLLER FUNCTIONS
     */

    // Home types
    $scope.countFilteredProp = function(filteredHomes, matchObj) {
        return _.countBy(filteredHomes, matchObj);
    };

    this.populateTypeCount = function(data, type) {
        var typeCount = $scope.countFilteredProp(data, {type: type});
        $scope.liveCount[removeSpaceFilter(type)] = typeCount.true ? typeCount.true : 0;
    };

    this.populatePropCount = function(data, matchObj) {
        var propCount = $scope.countFilteredProp(data, matchObj);
        var keys = Object.keys(matchObj);
        $scope.liveCount[removeSpaceFilter(matchObj[keys[0]])] = propCount.true ? propCount.true : 0;
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
        searchSelf.populateTypeCount(data, 'studio');
        searchSelf.populateTypeCount(data, 'apartment');
        searchSelf.populateTypeCount(data, 'row house');
        searchSelf.populateTypeCount(data, 'house');

        searchSelf.populatePropCount(data, {area: 'Porvoo'});
        searchSelf.populatePropCount(data, {area: 'Järvenpää'});
        searchSelf.populatePropCount(data, {area: 'Bemböle'});
    });
}]);