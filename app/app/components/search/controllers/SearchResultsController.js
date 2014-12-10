myHomeApp.controller('SearchResultsController', ['$scope', '$http', 'resultsFilter', 'Homes', 'Likes', function($scope, $http, resultsFilter, Homes, Likes) {
    var search = this;
    search.homes = [];

    $http.get('app/shared/data/homes.json').success(function(data) {
        search.homes = data;
        $scope.results.homes = data;
        search.filteredHomes = resultsFilter(search.homes, $scope.$storage.params);
        if (!('searchReset' in $scope.$storage) || $scope.$storage.searchReset === false) {
            Homes.set(data);
            Homes.getUnique('area');
            $scope.setMaxPrice();
        }
        $scope.results.count = search.filteredHomes.length;
    });

    $scope.$watch('$storage.params', function (newParams) {
        if (newParams) {
            search.filteredHomes = resultsFilter(search.homes, newParams);
            $scope.results.count = search.filteredHomes.length;
        }
    }, true); // true needed for watching objects

    // Set the slider's max price to be the maximum available
    $scope.setMaxPrice = function() {
        var maxPrice = 0;
        for (var i = 0; i < search.homes.length; i++) {
            if (search.homes[i].rentalCost > maxPrice) {
                maxPrice = search.homes[i].rentalCost;
            }
        };
        $scope.$storage.paramsInit.priceRange.max = maxPrice;
        $scope.$storage.paramsInit.priceRange.ceil = maxPrice;
        $scope.$storage.params.priceRange.max = maxPrice;
        $scope.$storage.params.priceRange.ceil = maxPrice;
    };
}]);