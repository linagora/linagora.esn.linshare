(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare')
    .component('linshareMyspaceFileBrowser', {
      templateUrl: '/linagora.esn.linshare/app/myspace-file-browser/linshare-myspace-file-browser.html',
      bindings: {
        selectedNodes: '='
      },
      controller: 'linshareMyspaceFileBrowserController'
    });
})(angular);
