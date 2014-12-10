myHomeApp.filter('boolConvert', function() {
    return function(input) {
        var output = '';
        if (input === true) {
            output = 'yes';
        }
        if (input === false) {
            output = 'no';
        }
        return output === '' ? input : output;
    };
});