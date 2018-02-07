'use strict';

/* global _: false */

angular.module('esn.file-browser', []);
angular.module('esn.module-registry', []);
angular.module('esn.background', [])
  .factory('inBackground', function() {
    return function(promise) {
      return promise;
    };
  });
angular.module('esn.i18n', [])
  .factory('esnI18nService', function() {
    return {
      translate: function(input) { return input; }
    };
  });
angular.module('esn.configuration', [])
  .factory('esnConfig', function() {
    return function() {};
  });
angular.module('esn.lodash-wrapper', [])
  .constant('_', _);
