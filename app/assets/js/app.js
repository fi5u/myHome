(function () {
    var app = angular.module('myhome', ['ngRoute', 'rzModule', 'uiGmapgoogle-maps', 'ngStorage']);

    app.controller('MyHomeController', function() {

    });

    app.config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, uiGmapGoogleMapApiProvider) {
        $routeProvider.when('/homes', {
            templateUrl: 'home-search.html',
            controller: 'SearchController'
        }).when('/homes/:homeId', {
            templateUrl: 'home-detail.html',
            controller: 'SingleResultController'
        }).otherwise({
            redirectTo: '/homes'
        });
    }]);

    app.controller('SearchController', ['$scope', '$sessionStorage', function($scope, $sessionStorage) {
        $scope.paramsInit = {
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
        };

        $scope.params = angular.copy($scope.paramsInit);

        $scope.$storage = $sessionStorage.$default({
            params: angular.copy($scope.paramsInit)
        });

        $scope.results = {};
        $scope.results.count = 0;

        $scope.resetSearch = function() {
            $scope.$storage.params = angular.copy($scope.paramsInit);
        };

        $scope.reverseOrder = function() {
            $scope.$storage.params.reverseOrder = !$scope.$storage.params.reverseOrder;
        };
    }]);

    app.controller('SearchResultsController', ['$scope', '$http', 'resultsFilter', function($scope, $http, resultsFilter) {
        var search = this;
        search.homes = [];

        $http.get('app/data/homes.json').success(function(data) {
            search.homes = data;
            search.filteredHomes = resultsFilter(search.homes, $scope.$storage.params);
            $scope.getMaxPrice();
            $scope.results.count = search.filteredHomes.length;
        });

        $scope.$watch('$storage.params', function (newParams) {
            if (newParams) {
                search.filteredHomes = resultsFilter(search.homes, newParams);
                $scope.results.count = search.filteredHomes.length;
            }
        }, true); // true needed for watching objects

        // Set the slider's max price to be the maximum available
        $scope.getMaxPrice = function() {
            var maxPrice = 0;
            for (var i = 0; i < search.homes.length; i++) {
                if (search.homes[i].rentalCost > maxPrice) {
                    maxPrice = search.homes[i].rentalCost;
                }
            };
            $scope.paramsInit.priceRange.max = maxPrice;
            $scope.paramsInit.priceRange.ceil = maxPrice;
            $scope.$storage.params.priceRange.max = maxPrice;
            $scope.$storage.params.priceRange.ceil = maxPrice;
        };
    }]);

    app.controller('SingleResultController', ['$scope', '$routeParams', '$http', 'uiGmapGoogleMapApi', function($scope, $routeParams, $http, uiGmapGoogleMapApi) {
        $http.get('app/data/homes.json').success(function(data) {
            // Pass the single property's details to the single view
            $scope.home = {};
            for (var i = 0; i < data.length; i++) {
                if (data[i].homeId === $routeParams.homeId) {
                    $scope.home = data[i];
                    break;
                }
            };

            uiGmapGoogleMapApi.then(function(maps) {
                $scope.map = { center: $scope.home.location, zoom: 14 };
                $scope.options = {scrollwheel: false};
                $scope.marker = {
                    id: $scope.home.homeId,
                    coords: {
                        latitude: $scope.home.location.latitude,
                        longitude: $scope.home.location.longitude
                    }
                };
            });
        });
    }]);

    app.directive('searchInputBlock', function() {
        return {
            restrict: 'E',
            scope: {
                type: '@type', // 'has', 'allowed'
                pos: '@typePos', // position of type in relation to prop: 'before', 'after'
                prop: '@property',
                bindModel: '=ngModel'
            },
            templateUrl: 'search-input-block.html'
        };
    });

    app.directive('singleResult', function() {
        return {
            restrict: 'E',
            templateUrl: 'single-result.html'
        };
    });

    app.directive('gallery', function() {
        return {
            restrict: 'E',
            templateUrl: 'gallery.html',
            controller: ['$scope', function($scope) {
                $scope.index = {};
                $scope.index.active = 0;
            }],
            controllerAs: 'gallery'
        };
    });

    app.filter('boolConvert', function() {
        return function(input) {
            var output = '';
            if (input === true) {
                output = 'yes';
            }
            if (input === false) {
                output = 'no';
            }
            return output === '' ? input : output;
        };
    });

    app.filter('upperFirst', function() {
        return function(input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    });

    app.filter('removeSpace', function() {
        return function(input) {
            return input.replace(' ', '');
        };
    });

    /**
     * Iterate through the results, passing back only what is searched for
     * @return {object} Filtered results
     */
    app.filter('results', function() {
        return function(input, params) {
                // Store search properties on an array to loop through
                // [0] = searchCtrl, [1] = home.extras[0]
            var searchProps = [
                    ['hasBalcony', 'balcony'],
                    ['hasGarden', 'garden'],
                    ['allowsPets', 'pets'],
                    ['hasSauna', 'sauna']
                ],
                // Array to store keys to be removed
                toRemove = [],
                // Array to store filtered results
                filteredResults = [];

            // Remove availability mismatches
            // Loop through results and place keys to remove on toRemove[]
            for (var i = 0; i < input.length; i++) {
                if (((params.isAvailable === 'true' || params.isAvailable === true) && input[i].available === false) ||
                    ((params.isAvailable === 'false' || params.isAvailable === false) && input[i].available === true)) {
                    toRemove.push(i);
                }
            };

            // Remove price range mismatches
            for (var i = 0; i < input.length; i++) {
                // Don't do anything if already in toRemove[]
                if (toRemove.indexOf(i) > -1) {
                    continue;
                }
                if (params.priceRange.min > input[i].rentalCost || params.priceRange.max < input[i].rentalCost) {
                    toRemove.push(i);
                }
            };

            // Loop through searchProps[]
            for (var searchPropsIt = 0; searchPropsIt < searchProps.length; searchPropsIt++) {
                // Loop through results
                for (var resIt = 0; resIt < input.length; resIt++) {
                    // Don't do anything if already in toRemove[]
                    if (toRemove.indexOf(resIt) > -1) {
                        continue;
                    }
                    if (((params[searchProps[searchPropsIt][0]] === 'true' || params[searchProps[searchPropsIt][0]] === true) && input[resIt].extras[0][searchProps[searchPropsIt][1]] === false) ||
                        ((params[searchProps[searchPropsIt][0]] === 'false' || params[searchProps[searchPropsIt][0]] === false) && input[resIt].extras[0][searchProps[searchPropsIt][1]] === true)) {
                        toRemove.push(resIt);
                    }
                };
            };

            // Loop through results adding to filteredResults[] only if not in toRemove[]
            for (var i = 0; i < input.length; i++) {
                if (toRemove.indexOf(i) === -1) {
                    filteredResults.push(input[i]);
                }
            };
            return filteredResults;
        };
    });

})();