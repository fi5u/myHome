myHomeApp.controller('TabBarController', ['$scope', function($scope) {

    $scope.changeTab = function(newTab) {
        $scope.$storage.params.views.last = newTab;
        $scope.$storage.paramsInit.views.last = newTab;
    };

}]);