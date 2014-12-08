myHomeApp.service('Field', function() {

    this.getLiked = function(homes, likes, field) {
        var liked = [];
        var likedCount = 0;
        for (var homeIt = 0; homeIt < homes.length; homeIt++) {
            for (var likesIt = 0; likesIt < likes.length; likesIt++) {
                if (homes[homeIt].homeId === likes[likesIt]) {
                    thisLiked = [];
                    /*console.log('homes:');
                    console.log(homes);
                    console.log('homes[homeIt]:');
                    console.log(homes[homeIt]);
                    console.log('homes[homeIt].homeId:');
                    console.log(homes[homeIt].homeId);*/
                    thisLiked['id'] = homes[homeIt].homeId;
                    thisLiked[field] = homes[homeIt].address;
                    liked.push(thisLiked);
                }
            }
        }
        return liked;
    };

});