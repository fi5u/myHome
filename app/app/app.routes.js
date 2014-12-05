myHomeApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/homes', {
        templateUrl: 'app/components/search/views/searchView.html',
        controller: 'SearchController'
    }).when('/homes/:homeId', {
        templateUrl: 'app/components/single/views/singleView.html',
        controller: 'SingleController'
    }).otherwise({
        redirectTo: '/homes'
    });
}]);