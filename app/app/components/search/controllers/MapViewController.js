myHomeApp.controller('MapViewController', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    $scope.map = {};

    $scope.marker = {};
    $scope.marker.events = {};
    $scope.marker.like = function() {
        console.log('likeylikey!');
    };

    $scope.window = {
        options: {
            maxWidth: 600,
            visible: true
        },
        show: false,
        templateUrl: 'app/components/search/views/searchMapInfoView.html',
        templateParameter: $scope
    };

    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            center: $scope.$storage.params.views.map.location,
            zoom: $scope.$storage.params.views.map.zoom,
            events: {
                zoom_changed: function(map) {
                    $scope.$storage.params.views.map.zoom = map.getZoom();
                }
            },
            fit: true,
            options: {
                scrollwheel: false,
                maxZoom: 17
            }
        };

        $scope.marker.events = {
            click: function(marker) {
                $scope.window.show = true;
                $scope.marker.active = marker.model;
            }
        };
    });

    $scope.resetBounds = function() {
        $scope.setBounds();
    };

    /*$scope.hasLike = function(homeId) {
        console.log('hasLike');
        console.log(homeId);
    };*/

   /* $scope.toggleLike = function(homeId, area, address) {
        console.log('toggleLike');
        console.log(homeId, area, address);
    };

    $scope.test = function() {
        alert('test');
    };*/
}]);