(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare', [
    'ui.router',
    'op.dynamicDirective',
    'restangular',
    'esn.http',
    'esn.configuration',
    'esn.cache',
    'esn.background',
    'esn.i18n',
    'esn.file-browser',
    'esn.module-registry',
    'esn.lodash-wrapper'
  ]);
})(angular);
