myHomeApp.service('Homes', ['$http', '$sessionStorage', 'resultsFilter', 'removeSpaceFilter', function($http, $sessionStorage, resultsFilter, removeSpaceFilter) {

    var self = this;
    this.homes = [];
    this.filteredHomes = {};
    this.filteredCount = 0;
    this.liveCount = {};
    this.toCount = ['area', 'type'];

    $storage = $sessionStorage.$default({
        homes: {
            toSelect: []
        }
    });

    this.fetch = function() {
        $http.get('app/shared/data/homes.json').success(function(data) {
            self.set(data);
        });
    };

    this.get = function() {
        return this.homes;
    };

    this.set = function(homes) {
        this.homes = homes;
        var areas = this.getUnique('area');
        // Only reset toSelect areas if search/areas have been reset by user
        if (!$sessionStorage.searchReset) {
            $sessionStorage.homes.toSelect = areas;
            $sessionStorage.params.areas = [];
            this.setMaxPrice();
        }
        this.filterHomes();
    };

    this.getUnique = function(key) {
        return _.sortBy(_.pluck(_.uniq(this.homes, key), key));
    };

    this.addToSelect = function(value) {
        if ($sessionStorage.homes.toSelect.indexOf(value) < 0) {
            $sessionStorage.homes.toSelect.push(value);
        }
    };

    this.removeToSelect = function(value) {
        if ($sessionStorage.homes.toSelect.indexOf(value) > -1) {
            _.pull($sessionStorage.homes.toSelect, value);
        }
    };

    this.addSelected = function(value) {
        if ($sessionStorage.params.areas.indexOf(value) < 0) {
            $sessionStorage.params.areas.push(value);
        }
    };

    this.removeSelected = function(value) {
        if ($sessionStorage.params.areas.indexOf(value) > -1) {
            _.pull($sessionStorage.params.areas, value);
        }
    };

    this.getToSelect = function() {
        return $sessionStorage.homes.toSelect;
    };

    this.getSelected = function() {
        return $sessionStorage.params.areas;
    };

    this.resetSelected = function() {
        $sessionStorage.params.areas = [];
        $sessionStorage.homes.toSelect = this.getUnique('area');
    };

    this.setCounts = function(data, key) {
        var propCount;
        var matchObj = {};
        // Set the key as an object key
        this.liveCount[key] = {};
        for (var i = 0; i < data.length; i++) {
            this.liveCount[key][removeSpaceFilter(data[i][key])] = [];
            matchObj[key] = data[i][key];
            propCount = _.countBy(data, matchObj);
            this.liveCount[key][removeSpaceFilter(data[i][key])] = propCount.true;
        }
    };

    this.getCounts = function() {
        return this.liveCount;
    };

    this.filterHomes = function() {
        this.filteredHomes = resultsFilter(this.homes, $sessionStorage.params);
        for (var i = this.toCount.length - 1; i >= 0; i--) {
            this.setCounts(this.filteredHomes, this.toCount[i]);
        }
        this.filteredCount = this.filteredHomes.length;
    };

    this.getFilteredHomes = function() {
        return this.filteredHomes;
    };

    this.setMaxPrice = function() {
        var maxPrice = 0;
        for (var i = 0; i < this.homes.length; i++) {
            if (this.homes[i].rentalCost > maxPrice) {
                maxPrice = this.homes[i].rentalCost;
            }
        }
        $sessionStorage.paramsInit.priceRange.max = maxPrice;
        $sessionStorage.paramsInit.priceRange.ceil = maxPrice;
        $sessionStorage.params.priceRange.max = maxPrice;
        $sessionStorage.params.priceRange.ceil = maxPrice;
    };
}]);