(function () {
    var app = angular.module('myhome', ['rzModule']);

    app.controller('MyHomeController', function() {

    });

    app.controller('SearchController', ['$scope', function($scope) {
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

        $scope.resetSearch = function() {
            $scope.params = angular.copy($scope.paramsInit);
        };

        $scope.reverseOrder = function() {
            $scope.params.reverseOrder = !$scope.params.reverseOrder;
        };
    }]);

    app.controller('SearchResultsController', ['$scope', '$http', 'resultsFilter', function($scope, $http, resultsFilter) {
        var search = this;
        search.homes = [];

        $http.get('assets/js/homes.json').success(function(data) {
            search.homes = data;
            search.filteredHomes = resultsFilter(search.homes, $scope.params);
            $scope.getMaxPrice();
        });

        $scope.$watch('params', function (newParams) {
            if (newParams) {
                search.filteredHomes = resultsFilter(search.homes, newParams);
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
            $scope.params.priceRange.max = maxPrice;
            $scope.params.priceRange.ceil = maxPrice;
        };
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
        }
    });

    app.directive('singleResult', function() {
        return {
            restrict: 'E',
            templateUrl: 'single-result.html'
        }
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
            console.log(toRemove);
            return filteredResults;
        };
    });

})();