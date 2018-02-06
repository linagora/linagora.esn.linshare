(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare')
    .component('linshareConfigForm', {
      templateUrl: '/linagora.esn.linshare/app/config-form/linshare-config-form.html',
      bindings: {
        configurations: '='
      }
    });
})(angular);
