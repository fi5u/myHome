myHomeApp.controller('SingleController', ['$scope', '$routeParams', '$http', 'uiGmapGoogleMapApi', 'Likes', function($scope, $routeParams, $http, uiGmapGoogleMapApi, Likes) {

    $scope.index = {};
    $scope.index.active = 0;
    $scope.imgCount;

    $scope.isShowLightbox = false

    $scope.showLightbox = function() {
        $scope.isShowLightbox = true;
    };

    $scope.hideLightbox = function() {
        $scope.isShowLightbox = false;
    };

    $scope.lightboxAdvance = function(dir, index, count) {
        if (dir === 'next') {
            $scope.index.active = index + 1 === count ? 0 : index + 1;
        } else {
            $scope.index.active = index === 0 ? count - 1 : index - 1;
        }
    };

    $http.get('app/shared/data/homes.json').success(function(data) {
        // Pass the single property's details to the single view
        $scope.home = {};
        for (var i = 0; i < data.length; i++) {
            if (data[i].homeId === $routeParams.homeId) {
                $scope.home = data[i];
                break;
            }
        };

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = { center: $scope.home.location, zoom: 14 };
            $scope.options = {scrollwheel: false};
            $scope.marker = {
                id: $scope.home.homeId,
                coords: {
                    latitude: $scope.home.location.latitude,
                    longitude: $scope.home.location.longitude
                }
            };
        });
    });
}]);