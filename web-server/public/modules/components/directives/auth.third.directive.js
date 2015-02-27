'use strict';

angular.module('components').directive('hbThirdAuth', function() {
    var directive = {};

    directive.restrict = 'EA';

    directive.templateUrl = 'modules/components/views/auth.third.view.html';

    return directive;
});
