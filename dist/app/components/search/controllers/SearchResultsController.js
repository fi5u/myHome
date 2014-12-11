<<<<<<< HEAD
myHomeApp.controller('SearchResultsController', ['$scope', '$http', 'resultsFilter', 'Homes', 'Likes', function($scope, $http, resultsFilter, Homes, Likes) {
    var search = this;
    search.homes = [];

    $http.get('app/shared/data/homes.json').success(function(data) {
        Homes.set(data);
        Homes.getUnique('area');
        search.homes = data;
        $scope.results.homes = data;
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
=======
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
>>>>>>> gh-pages
            }
        };
        $scope.$storage.paramsInit.priceRange.max = maxPrice;
        $scope.$storage.paramsInit.priceRange.ceil = maxPrice;
        $scope.$storage.params.priceRange.max = maxPrice;
        $scope.$storage.params.priceRange.ceil = maxPrice;
    };
<<<<<<< HEAD
=======


    /**
     * CONTROLLER FUNCTION CALLS
     */

    Homes.fetch(function() {
        searchSelf.filteredHomes = resultsFilter(Homes.homes, $scope.$storage.params);
        $scope.results.count = searchSelf.filteredHomes.length;
    });

    $scope.$watch('$storage.params', function (newParams) {
        if (newParams) {
            searchSelf.filteredHomes = resultsFilter(Homes.homes, newParams);
            $scope.results.count = searchSelf.filteredHomes.length;
        }
    }, true); // true needed for watching objects

>>>>>>> gh-pages
}]);