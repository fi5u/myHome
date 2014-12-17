myHomeApp.controller('MapViewController', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    $scope.map = {};
    $scope.activeMarker = {};
    $scope.showInfo = false;

    $scope.clearActiveMarker = function() {
        $scope.activeMarker = {};
    };

    $scope.setActiveMarker = function(marker) {
        $scope.activeMarker = {};
        $scope.activeMarker = marker;
    };

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
                }/*,
                click: function() {
                    var bounds = new maps.LatLngBounds();
                    for (var i in $scope.filteredHomes) {
                        bounds.extend($scope.filteredHomes[i].location);
                    }
                    //$scope.mapInstance.fitBounds(bounds);
                }*/
            },
            fit: true
        };

        $scope.options = {
            scrollwheel: true,
            maxZoom: 17
        };

        $scope.windowOptions = {
            maxWidth: 600,
            visible: true
        };

        _.each($scope.filteredHomes, function(marker) {
            marker.markerClick = function() {
                $scope.showInfo = true;
                $scope.setActiveMarker(marker);
            };
        });
    });

    $scope.resetBounds = function() {
        $scope.setBounds();
    };

}]);