(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare')
    .controller('linshareMyspaceFileBrowserController', linshareMyspaceFileBrowserController);

  function linshareMyspaceFileBrowserController(linshareFileBrowserLoaders, esnI18nService) {
    var self = this;

    self.options = {
      multipleSelect: true,
      rootName: esnI18nService.translate('My space').toString()
    };
    self.loadNode = linshareFileBrowserLoaders.loadMySpace();
  }
})(angular);
