myHomeApp.filter('removeSpace', function() {
    return function(input) {
        return input.replace(' ', '');
    };
});