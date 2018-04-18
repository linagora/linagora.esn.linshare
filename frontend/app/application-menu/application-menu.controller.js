(function() {
  'use strict';

  angular.module('linagora.esn.linshare')
    .controller('linshareApplicationMenuController', linshareApplicationMenuController);

  function linshareApplicationMenuController(LINSHARE_MODULE_METADATA) {
    var self = this;

    self.linshareInstanceUrl = 'https://linshare-cnam.open-paas.org';
    self.appTitle = LINSHARE_MODULE_METADATA.title;
    self.icon = LINSHARE_MODULE_METADATA.icon;
  }
})();
