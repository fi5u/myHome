myHomeApp.controller('MapViewController', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    $scope.map = {};

    $scope.marker = {};
    $scope.marker.events = {};

    $scope.window = {};
    $scope.window.show = false;

    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            center: $scope.$storage.params.views.map.location,
            zoom: $scope.$storage.params.views.map.zoom,
            events: {
                tilesloaded: function (map) {
                    $scope.$apply(function () {
                        $scope.mapInstance = map;
                    });
                },
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

        $scope.window.options = {
            maxWidth: 600,
            visible: true
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

}]);