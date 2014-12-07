myHomeApp.controller('SearchResultsController', ['$scope', '$http', 'resultsFilter', function($scope, $http, resultsFilter) {
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

    $scope.hasLike = function(homeId) {
        if ($scope.$storage.local.likes.indexOf(homeId) > -1) {
            return true;
        } else {
            return false;
        }
    };

    $scope.toggleLike = function(homeId) {
        var newLikeArray = [],
            homeIdIndex = $scope.$storage.local.likes.indexOf(homeId);
        if (homeIdIndex > -1) {
            // Remove the array value at
            $scope.$storage.local.likes.splice(homeIdIndex, 1);
        } else {
            // Add to the likes array
            $scope.$storage.local.likes.push(homeId);
        }
    };
}]);