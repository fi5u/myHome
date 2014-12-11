myHomeApp.controller('SearchResultsController', ['$scope', 'resultsFilter', 'Homes', function($scope, resultsFilter, Homes) {

    /**
     * CONTROLLER VARIABLE DEFINITIONS
     */

    var searchSelf = this;
    searchSelf.filteredHomes = [];
    $scope.results.count = 0;

    /**
     * CONTROLLER FUNCTIONS
     */

    // Set the slider's max price to be the maximum available from unfiltered homes
    $scope.setMaxPrice = function() {
        var maxPrice = 0;
        for (var i = 0; i < Homes.homes.length; i++) {
            if (Homes.homes[i].rentalCost > maxPrice) {
                maxPrice = Homes.homes[i].rentalCost;
            }
        };
        $scope.$storage.paramsInit.priceRange.max = maxPrice;
        $scope.$storage.paramsInit.priceRange.ceil = maxPrice;
        $scope.$storage.params.priceRange.max = maxPrice;
        $scope.$storage.params.priceRange.ceil = maxPrice;
    };


    /**
     * CONTROLLER FUNCTION CALLS
     */

    Homes.fetch(function() {
        searchSelf.filteredHomes = resultsFilter(Homes.homes, $scope.$storage.params);
        $scope.results.count = searchSelf.filteredHomes.length;

        // Emit the filtered homes upward
        $scope.$emit('filteredHomes', searchSelf.filteredHomes);
    });

    $scope.$watch('$storage.params', function (newParams) {
        if (newParams) {
            searchSelf.filteredHomes = resultsFilter(Homes.homes, newParams);
            $scope.results.count = searchSelf.filteredHomes.length;

            // Emit the filtered homes upward
            $scope.$emit('filteredHomes', searchSelf.filteredHomes);
        }
    }, true); // true needed for watching objects

}]);