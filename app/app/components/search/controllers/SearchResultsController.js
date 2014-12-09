myHomeApp.controller('SearchResultsController', ['$scope', '$http', 'resultsFilter', 'Likes', function($scope, $http, resultsFilter, Likes) {
    var search = this;
    search.homes = [];

    $http.get('app/shared/data/homes.json').success(function(data) {
        search.homes = data;
        search.filteredHomes = resultsFilter(search.homes, $scope.$storage.params);
        if ($scope.$storage.searchReset === false) {
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