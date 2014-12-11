myHomeApp = angular.module('myHomeApp', ['ngRoute', 'rzModule', 'uiGmapgoogle-maps', 'ngStorage']);

myHomeApp.controller('MyHomeController', ['$scope', '$sessionStorage', '$localStorage', 'Likes', function($scope, $sessionStorage, $localStorage, Likes) {

<<<<<<< HEAD
    $scope.$storage = $sessionStorage.$default({
        searchReset: false
    });
//$localStorage.$reset();
//$sessionStorage.$reset();
=======
    /**
     * CONTROLLER VARIABLE DEFINITIONS
     */

    // Storage
    $scope.$storage = $sessionStorage.$default({
        searchReset: false
    });

>>>>>>> gh-pages
    $scope.$storage.local = $localStorage.$default({
        likes: []
    });

<<<<<<< HEAD
    // TEMP!!! Reset local likes
/*    $scope.$storage.local.likes = [];
    console.log('likes init:');
    console.log($scope.$storage.local.likes);
*/
    // Set the likes
    Likes.set($scope.$storage.local.likes);
    $scope.sortedLikes = Likes.get(true);
    $scope.$watch('$storage.local.likes', function (newParams) {
        if (newParams) {
            Likes.set($scope.$storage.local.likes);
            $scope.sortedLikes = Likes.get(true);
        }
    }, true);
=======
    //$localStorage.$reset();
    //$sessionStorage.$reset();

    // Likes
    $scope.sortedLikes = Likes.get(true);


    /**
     * CONTROLLER FUNCTIONS
     */
>>>>>>> gh-pages

    $scope.hasLike = function(homeId) {
        return Likes.check(homeId);
    };

    $scope.toggleLike = function(homeId, area, address) {
        Likes.toggle(homeId, area, address);
        $scope.$storage.local.likes = Likes.get();
    };
<<<<<<< HEAD
=======


    /**
     * CONTROLLER FUNCTION CALLS
     */

    $scope.$watch('$storage.local.likes', function (newParams) {
        if (newParams) {
            Likes.set($scope.$storage.local.likes);
            $scope.sortedLikes = Likes.get(true);
        }
    }, true);
>>>>>>> gh-pages
}]);