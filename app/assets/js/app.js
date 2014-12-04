(function () {
    var app = angular.module('myhome', []);

    app.controller('MyHomeController', function() {

    });

    app.controller('SearchController', ['$scope', function($scope) {
        $scope.params = {
            isAvailable: true,
            orderby: 'rentalCost',
            reverseOrder: false,
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
            templateUrl: 'single-result.html',
            controller: function() {
                this.resultShow = function(searchCtrl, home) {

                    // Check through each property, if there's a mismatch remove from DOM straight away and don't continue

                    // Store extra properties on an array to loop through
                    // [0] = searchCtrl, [1] = home.extras[0]
                    var extrasProp = [
                        ['hasBalcony', 'balcony'],
                        ['hasGarden', 'garden'],
                        ['allowsPets', 'pets'],
                        ['hasSauna', 'sauna']
                    ];

                    if ((searchCtrl.isAvailable === 'true' || searchCtrl.isAvailable === true) || (searchCtrl.isAvailable === 'false' || searchCtrl.isAvailable === false)) {
                        if (((searchCtrl.isAvailable === 'true' || searchCtrl.isAvailable === true) && home.available === false) || ((searchCtrl.isAvailable === 'false' || searchCtrl.isAvailable === false) && home.available === true)) {
                            return false;
                        }
                    }

                    // Loop through the extrasProp array to remove elements that do not match the search
                    for (var i = 0; i < extrasProp.length; i++) {
                        if (searchCtrl[extrasProp[i][0]] === 'true' || searchCtrl[extrasProp[i][0]] === 'false') {
                            if ((searchCtrl[extrasProp[i][0]] === 'true' && home.extras[0][extrasProp[i][1]] === false) || (searchCtrl[extrasProp[i][0]] === 'false' && home.extras[0][extrasProp[i][1]] === true)) {
                                return false;
                            }
                        }
                    };

                    // Otherwise return true
                    return true;
                };

                this.hasExtra = function(hasExtra) {
                    return hasExtra;
                };
            },
            controllerAs: 'singleResCtrl'
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
                // Array to store keys to be removed
            var toRemove = [],
                // Array to store filtered results
                filteredResults = [];

            // Loop through results and place keys to remove on toRemove[]
            for (var i = 0; i < input.length; i++) {
                if (((params.isAvailable === 'true' || params.isAvailable === true) && input[i].available === false) ||
                    ((params.isAvailable === 'false' || params.isAvailable === false) && input[i].available === true)) {
                    toRemove.push(i);
                }
            };

            // Loop through results adding to filteredResults[] only if not in toRemove[]
            for (var i = 0; i < input.length; i++) {
                if (toRemove.indexOf(i) === -1) {
                    filteredResults.push(input[i]);
                }
            };
            return filteredResults;
        }
    });

})();