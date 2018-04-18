(function() {
  'use strict';

  angular.module('linagora.esn.linshare')
    .controller('linshareApplicationMenuController', linshareApplicationMenuController);

  function linshareApplicationMenuController(esnConfig, LINSHARE_MODULE_METADATA) {
    var self = this;

    return esnConfig('linagora.esn.linshare.instanceURL')
      .then(function(instanceURL) {
        self.linshareInstanceUrl = instanceURL;
        self.appTitle = LINSHARE_MODULE_METADATA.title;
        self.icon = LINSHARE_MODULE_METADATA.icon;
      });
  }
})();
