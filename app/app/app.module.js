myHomeApp = angular.module('myHomeApp', ['ngRoute', 'rzModule', 'uiGmapgoogle-maps', 'ngStorage']);

myHomeApp.controller('MyHomeController', ['$scope', '$sessionStorage', '$localStorage', function($scope, $sessionStorage, $localStorage) {

    $scope.$storage = $sessionStorage.$default({
        searchReset: false
    });
//$localStorage.$reset();
    $scope.$storage.local = $localStorage.$default({
        likes: []
    });

}]);