myHomeApp.service('Likes', function() {
    this.likes = [];

    this.get = function(sorted) {
        if (sorted) {
            return this.sort();
        }
        return this.likes;
    };

    this.set = function(likes) {
        this.likes = likes;
        this.sort();
    };

    this.check = function(homeId) {
        for (var i = 0; i < this.likes.length; i++) {
            if (this.likes[i].homeId === homeId) {
                return true;
            }
        }
        return false;
    };

    this.add = function(homeId, area, address) {
        var modifiedLikes = {};

        modifiedLikes.homeId = homeId;
        modifiedLikes.area = area;
        modifiedLikes.address = address;

        this.likes.push(modifiedLikes);
    };

    this.remove = function(homeId) {
        this.likes = this.likes.filter(function(element) {
            return element.homeId !== homeId;
        });
    };

    this.toggle = function(homeId, area, address) {
        if (this.check(homeId)) {
            this.remove(homeId);
        } else {
            this.add(homeId, area, address);
        }
        this.sort();
    };

    this.sort = function() {
        var thisArea;
        var thisAreaHomes;
        var sorted = {};
        // Loop through areas
        for (var i = 0; i < this.likes.length; i++) {
            thisArea = this.likes[i].area;

            if (!_.has(sorted, thisArea)) {
                // Add all homes that match thisArea
                sorted[thisArea] = _.where(_.sortBy(this.likes, 'address'), {area: thisArea}, 'address');
            }
        }
        return sorted;
    };
});