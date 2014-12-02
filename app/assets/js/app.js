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
        this.reverseOrder = false;
        this.hasBalcony = '';
        this.hasGarden = '';
        this.allowsPets = '';
        this.hasSauna = '';

        this.toggleReverseOrder = function() {
            this.reverseOrder != this.reverseOrder;
        };

        this.toggleSearchAvailability = function() {
            this.searchAvailability != this.searchAvailability;
        };
    });

    app.directive('singleResult', function() {
        return {
            restrict: 'E',
            templateUrl: 'single-result.html',
            controller: function() {
                this.resultShow = function(searchCtrl, home) {

                    // Check through each property, if there's a mismatch hide straight away and don't continue
                    if ((searchCtrl.isAvailable === 'true' || searchCtrl.isAvailable === true) || (searchCtrl.isAvailable === 'false' || searchCtrl.isAvailable === false)) {
                        if (((searchCtrl.isAvailable === 'true' || searchCtrl.isAvailable === true) && home.available === false) || ((searchCtrl.isAvailable === 'false' || searchCtrl.isAvailable === false) && home.available === true)) {
                            return false;
                        }
                    }

                    if (searchCtrl.hasBalcony === 'true' || searchCtrl.hasBalcony === 'false') {
                        if ((searchCtrl.hasBalcony === 'true' && home.extras[0].balcony === false) || (searchCtrl.hasBalcony === 'false' && home.extras[0].balcony === true)) {
                            return false;
                        }
                    }

                    if (searchCtrl.hasGarden === 'true' || searchCtrl.hasGarden === 'false') {
                        if ((searchCtrl.hasGarden === 'true' && home.extras[0].garden === false) || (searchCtrl.hasGarden === 'false' && home.extras[0].garden === true)) {
                            return false;
                        }
                    }

                    if (searchCtrl.allowsPets === 'true' || searchCtrl.allowsPets === 'false') {
                        if ((searchCtrl.allowsPets === 'true' && home.extras[0].pets === false) || (searchCtrl.allowsPets === 'false' && home.extras[0].pets === true)) {
                            return false;
                        }
                    }

                    if (searchCtrl.hasSauna === 'true' || searchCtrl.hasSauna === 'false') {
                        if ((searchCtrl.hasSauna === 'true' && home.extras[0].sauna === false) || (searchCtrl.hasSauna === 'false' && home.extras[0].sauna === true)) {
                            return false;
                        }
                    }



                    // Otherwise return true
                    return true;
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