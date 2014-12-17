myHomeApp.controller('SearchResultsController', ['$scope', 'Homes', function($scope, Homes) {

    /**
     * CONTROLLER VARIABLE DEFINITIONS
     */

    var searchSelf = this;
    searchSelf.filteredHomes = {};
    $scope.results.count = Homes.filteredCount;
    $scope.filteredHomes = {};

    /**
     * CONTROLLER FUNCTIONS
     */



    /**
     * CONTROLLER FUNCTION CALLS
     */

    Homes.fetch();

    $scope.$watch('$storage.params', function (newParams) {
        if (newParams) {
            Homes.filterHomes();
        }
    }, true); // true needed for watching objects

    $scope.$watch(function(){
        return Homes.filteredHomes;
    }, function (newValue) {
        searchSelf.filteredHomes = newValue;
        $scope.filteredHomes = newValue;
        $scope.results.count = Homes.filteredCount;
        // Broadcast down to child scope (map view)
        $scope.$broadcast('filterHomesUpdate', newValue);
    });
}]);