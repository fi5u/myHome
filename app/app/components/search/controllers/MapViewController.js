myHomeApp.controller('MapViewController', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    $scope.map = {};

    $scope.setBounds = function() {

    };

    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            center: $scope.$storage.params.views.map.location,
            zoom: $scope.$storage.params.views.map.zoom,
            events: {
               zoom_changed: function(map) {
                    $scope.$storage.params.views.map.zoom = map.getZoom();
                },
                click: function() {
                    var bounds = new google.maps.LatLngBounds();
                    for (var i in $scope.filteredHomes) {
                        bounds.extend($scope.filteredHomes[i].location);
                    }
                    $scope.map.fitBounds(bounds);
                }
            },
            bounds: {}
        };
        $scope.options = {
            scrollwheel: true
        };

    });

    $scope.resetBounds = function() {
        $scope.setBounds();
    };

}]);