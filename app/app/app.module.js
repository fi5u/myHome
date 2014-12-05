myHomeApp = angular.module('myHomeApp', ['ngRoute', 'rzModule', 'uiGmapgoogle-maps', 'ngStorage']);

myHomeApp.controller('MyHomeController', ['$scope', '$sessionStorage', function($scope, $sessionStorage) {
    $scope.$storage = $sessionStorage.$default({
        searchReset: false
    });
}]);