myHomeApp.controller('SingleController', ['$scope', '$routeParams', '$http', 'uiGmapGoogleMapApi', function($scope, $routeParams, $http, uiGmapGoogleMapApi) {
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