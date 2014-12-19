describe('Unit: MyHomeController', function() {
    beforeEach(module('myHomeApp'));

    var ctrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('MyHomeController', {
            $scope: scope
        });
    }));

    it('should create $scope.greeting when calling sayHello', function() {
        expect(scope.greeting).toBeUndefined();
    });
});