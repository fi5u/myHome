myHomeApp.service('Likes', function() {
    this.likes = [];

    this.get = function() {
        return this.likes;
    };

    this.set = function(likes) {
        this.likes = likes;
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
    };
});