myHomeApp = angular.module('myHomeApp', ['ngRoute', 'rzModule', 'uiGmapgoogle-maps', 'ngStorage']);

myHomeApp.controller('MyHomeController', ['$scope', '$sessionStorage', '$localStorage', 'Likes', function($scope, $sessionStorage, $localStorage, Likes) {

    $scope.$storage = $sessionStorage.$default({
        searchReset: false
    });
//$localStorage.$reset();
//$sessionStorage.$reset();
    $scope.$storage.local = $localStorage.$default({
        likes: []
    });

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

    $scope.hasLike = function(homeId) {
        return Likes.check(homeId);
    };

    $scope.toggleLike = function(homeId, area, address) {
        Likes.toggle(homeId, area, address);
        $scope.$storage.local.likes = Likes.get();
    };
}]);