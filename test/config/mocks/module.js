'use strict';

angular.module('esn.background', [])
  .factory('inBackground', function() {
    return function(promise) {
      return promise;
    };
  });
