myHomeApp.directive('searchInputBlock', function() {
    return {
        restrict: 'E',
        scope: {
            type: '@type', // 'has', 'allowed'
            pos: '@typePos', // position of type in relation to prop: 'before', 'after'
            prop: '@property',
            bindModel: '=ngModel'
        },
        templateUrl: 'app/components/search/views/searchInputBlockView.html'
    };
});