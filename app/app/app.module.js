myHomeApp = angular.module('myHomeApp', ['ngRoute', 'rzModule', 'uiGmapgoogle-maps', 'ngStorage']);

myHomeApp.controller('MyHomeController', ['$scope', '$sessionStorage', '$localStorage', 'Likes', function($scope, $sessionStorage, $localStorage, Likes) {

    $scope.$storage = $sessionStorage.$default({
        searchReset: false
    });
//$localStorage.$reset();
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
    $scope.$watch('$storage.local.likes', function (newParams) {
        if (newParams) {
            Likes.set($scope.$storage.local.likes);
        }
    }, true);
}]);