(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare')
    .constant('LINSHARE_NODE_ICON', {
      DOCUMENT: 'mdi-file'
    })
    .constant('LINSHARE_MODULE_METADATA', {
      id: 'linagora.esn.linshare',
      title: 'Linshare',
      icon: '/linagora.esn.linshare/images/linshare-icon.svg',
      config: {
        template: 'linshare-config-form',
        displayIn: {
          user: false,
          domain: false,
          platform: true
        }
      }
    });
})(angular);
