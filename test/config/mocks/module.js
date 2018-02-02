'use strict';

angular.module('esn.background', [])
  .factory('inBackground', function() {
    return function(promise) {
      return promise;
    };
  });
angular.module('esn.file-browser', []);
angular.module('esn.i18n', [])
  .factory('esnI18nService', function() {
    return {
      translate: function(input) { return input; }
    };
  });
