(function() {
  'use strict';

  angular.module('linagora.esn.linshare')
    .directive('linshareApplicationMenu', linshareApplicationMenu);

  function linshareApplicationMenu() {
    var directive = {
      retrict: 'E',
      replace: true,
      controller: 'linshareApplicationMenuController',
      controllerAs: '$ctrl',
      template:
      '<div>' +
        '<a target="_blank" ng-href="{{$ctrl.linshareInstanceUrl}}">' +
          '<img class="esn-application-menu-icon" src="{{$ctrl.icon}}" />' +
          '<span class="label" translate>' +
            '{{$ctrl.appTitle}}' +
          '</span>' +
        '</a>' +
      '</div>'
    };

    return directive;
  }
})();
