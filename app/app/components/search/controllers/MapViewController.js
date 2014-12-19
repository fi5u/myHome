myHomeApp.controller('MapViewController', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    var boundsChanged = 0,
        boundsForce = false;
    $scope.bounds.isFit = true;


    $scope.map = {};
    $scope.maps = {};
    $scope.mapInstance = {};

    $scope.marker = {};
    $scope.marker.events = {};


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
        $scope.maps = maps;
        $scope.map = {
            center: $scope.$storage.params.views.map.location,
            zoom: $scope.$storage.params.views.map.zoom,
            events: {
                tilesloaded: function (map) {
                    $scope.mapInstance = map;
                },
                zoom_changed: function(map) {
                    $scope.$storage.params.views.map.zoom = map.getZoom();
                },
                bounds_changed: function() {
                    if (boundsChanged > 0) {
                        $scope.bounds.isFit = false;
                    }
                    if (boundsForce === true) {
                        $scope.bounds.isFit = true;
                        boundsForce = false;
                    }
                    ++boundsChanged;
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

    $scope.bounds.reset = function() {
        var bounds = new $scope.maps.LatLngBounds();
        for (var i = 0; i < $scope.filteredHomes.length; i++) {
            var geoCode = new $scope.maps.LatLng($scope.filteredHomes[i].location.latitude, $scope.filteredHomes[i].location.longitude);
            bounds.extend(geoCode);
        }
        $scope.bounds.isFit = true;
        boundsForce = true;
        $scope.mapInstance.fitBounds(bounds);
    };
}]);