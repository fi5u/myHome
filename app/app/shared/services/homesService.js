myHomeApp.service('Homes', ['$sessionStorage', function($sessionStorage) {
    this.homes = [];
    $storage = $sessionStorage.$default({
        homes: {
            toSelect: []
        }
    });

    this.get = function() {
        return this.homes;
    };

    this.set = function(homes) {
        this.homes = homes;
        var areas = this.getUnique('area');
        $sessionStorage.homes.toSelect = areas;
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
}]);