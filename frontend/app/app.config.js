(function() {
  'use strict';

  angular.module('linagora.esn.linshare')
    .config(injectApplicationMenu);

    function injectApplicationMenu(dynamicDirectiveServiceProvider) {
      var linshare = new dynamicDirectiveServiceProvider.DynamicDirective(true, 'linshare-application-menu', { priority: -10 });

      dynamicDirectiveServiceProvider.addInjection('esn-application-menu', linshare);
    }
})();
