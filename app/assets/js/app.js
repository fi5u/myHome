(function () {
    var app = angular.module('myhome', []);

    app.controller('MyHomeController', function() {

    });

    app.controller('SearchController', ['$scope', function($scope) {
        $scope.params = {
            isAvailable: true,
            orderby: 'dateAdded',
            reverseOrder: true,
            hasBalcony: '',
            hasGarden: '',
            allowsPets: '',
            hasSauna: ''
        };
    }]);

    app.controller('SearchResultsController', ['$scope', '$http', 'resultsFilter', function($scope, $http, resultsFilter) {
        var search = this;
        search.homes = [];

        $http.get('assets/js/homes.json').success(function(data) {
            search.homes = data;
            search.filteredHomes = resultsFilter(search.homes, $scope.params);
        });

        $scope.$watch('params', function (newParams) {
            if (newParams) {
                search.filteredHomes = resultsFilter(search.homes, newParams);
            }
        }, true); // true needed for watching objects
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

            // Loop through results and place keys to remove on toRemove[]
            for (var i = 0; i < input.length; i++) {
                if (((params.isAvailable === 'true' || params.isAvailable === true) && input[i].available === false) ||
                    ((params.isAvailable === 'false' || params.isAvailable === false) && input[i].available === true)) {
                    toRemove.push(i);
                }
            };

            // Loop through searchProps[]
            for (var searchPropsIt = 0; searchPropsIt < searchProps.length; searchPropsIt++) {
                // Loop through results
                for (var resIt = 0; resIt < input.length; resIt++) {
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