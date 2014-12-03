(function () {
    var app = angular.module('myhome', []);

    app.controller('MyHomeController', ['$http', function($http) {
        var search = this;
        search.homes = [];

        $http.get('assets/js/homes.json').success(function(data) {
            search.homes = data;
        });
    }]);

    app.controller('SearchController', function() {
        this.isAvailable = true;
        this.orderby = 'rentalCost';
        this.reverseOrder = false;
        this.hasBalcony = '';
        this.hasGarden = '';
        this.allowsPets = '';
        this.hasSauna = '';

        this.toggleReverseOrder = function() {
            this.reverseOrder != this.reverseOrder;
        };
    });

    app.directive('singleResult', function() {
        return {
            restrict: 'E',
            templateUrl: 'single-result.html',
            controller: function() {
                this.resultShow = function(searchCtrl, home) {

                    // Check through each property, if there's a mismatch hide straight away and don't continue

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

})();