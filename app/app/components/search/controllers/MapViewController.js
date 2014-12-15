myHomeApp.controller('MapViewController', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {

    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            center: {
                "latitude": 60.162580,
                "longitude": 24.801832
            },
            zoom: 14
        };
        $scope.options = {
            scrollwheel: false
        };
    });

}]);