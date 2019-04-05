(function() {
  'use strict';

  angular.module('linagora.esn.linshare')
    .controller('linshareApplicationMenuController', linshareApplicationMenuController);

  function linshareApplicationMenuController(esnConfig) {
    var self = this;

    return esnConfig('linagora.esn.linshare.instanceURL')
      .then(function(instanceURL) {
        self.linshareInstanceUrl = instanceURL;
      });
  }
})();
