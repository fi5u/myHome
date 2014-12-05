myHomeApp.controller('SearchController', ['$scope', '$sessionStorage', function($scope, $sessionStorage) {
    $scope.paramsInit = {
        isAvailable: true,
        orderby: 'dateAdded',
        reverseOrder: true,
        hasBalcony: '',
        hasGarden: '',
        allowsPets: '',
        hasSauna: '',
        priceRange: {
            min: 0,
            max: 2000,
            ceil: 2000,
            floor: 0,
            step: 50
        }
    };

    $scope.params = angular.copy($scope.paramsInit);

    $scope.$storage = $sessionStorage.$default({
        params: angular.copy($scope.paramsInit)
    });

    $scope.results = {};
    $scope.results.count = 0;

    $scope.resetSearch = function() {
        $scope.$storage.params = angular.copy($scope.paramsInit);
    };

    $scope.reverseOrder = function() {
        $scope.$storage.params.reverseOrder = !$scope.$storage.params.reverseOrder;
    };
}]);