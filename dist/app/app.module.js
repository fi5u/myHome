myHomeApp = angular.module('myHomeApp', ['ngRoute', 'rzModule', 'uiGmapgoogle-maps', 'ngStorage']);

myHomeApp.controller('MyHomeController', ['$scope', '$sessionStorage', '$localStorage', 'Likes', function($scope, $sessionStorage, $localStorage, Likes) {

    /**
     * CONTROLLER VARIABLE DEFINITIONS
     */

    // Storage
    //$localStorage.$reset();
    //$sessionStorage.$reset();

    $scope.$storage = $sessionStorage.$default({
        searchReset: false
    });

    $scope.$storage.local = $localStorage.$default({
        likes: []
    });

    // Likes
    if ($scope.$storage.searchReset) {
        $scope.$storage.local.likes = [];
    }
    $scope.sortedLikes = Likes.get(true);


    /**
     * CONTROLLER FUNCTIONS
     */

    $scope.hasLike = function(homeId) {
        return Likes.check(homeId);
    };

    $scope.toggleLike = function(homeId, area, address) {
        console.log('toggles');
        Likes.toggle(homeId, area, address);
        $scope.$storage.local.likes = Likes.get();
    };


    /**
     * CONTROLLER FUNCTION CALLS
     */

    $scope.$watch('$storage.local.likes', function (newParams) {
        if (newParams) {
            Likes.set($scope.$storage.local.likes);
            $scope.sortedLikes = Likes.get(true);
        }
    }, true);
}]);