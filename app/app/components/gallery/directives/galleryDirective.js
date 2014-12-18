myHomeApp.directive('gallery', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/gallery/views/galleryView.html',
        controller: ['$scope', function($scope) {
            /*$scope.index = {};
            $scope.index.active = 0;*/
        }],
        controllerAs: 'gallery'
    };
});