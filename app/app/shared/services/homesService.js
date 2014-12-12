myHomeApp.service('Homes', ['$http', '$sessionStorage', 'removeSpaceFilter', function($http, $sessionStorage, removeSpaceFilter) {

    var self = this;
    this.homes = [];
    this.liveCount = {};

    $storage = $sessionStorage.$default({
        homes: {
            toSelect: []
        }
    });

    this.fetch = function(searchReset, cb) {
        $http.get('app/shared/data/homes.json').success(function(data) {
            self.set(searchReset, data, cb);
        });
    };

    this.get = function() {
        return this.homes;
    };

    this.set = function(searchReset, homes, cb) {
        this.homes = homes;
        var areas = this.getUnique('area');
        // Only reset toSelect areas if search/areas have been reset by user
        if (!searchReset) {
            $sessionStorage.homes.toSelect = areas;
            $sessionStorage.params.areas = [];
        }
        cb();
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
}]);