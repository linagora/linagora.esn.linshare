(function() {
  'use strict';

  angular.module('linagora.esn.linshare')
    .directive('linshareApplicationMenu', linshareApplicationMenu);

  function linshareApplicationMenu(applicationMenuTemplateBuilder, LINSHARE_MODULE_METADATA) {
    var directive = {
      retrict: 'E',
      replace: true,
      controller: 'linshareApplicationMenuController',
      controllerAs: '$ctrl',
      scope: true,
      template: applicationMenuTemplateBuilder(
        { url: '{{$ctrl.linshareInstanceUrl}}', target: '_blank', rel: 'noopener noreferrer' },
        { url: LINSHARE_MODULE_METADATA.icon },
        LINSHARE_MODULE_METADATA.title,
        'core.modules.linagora.esn.linshare.enabled',
        false
      )
    };

    return directive;
  }
})();
