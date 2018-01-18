(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare')
    .factory('esnLinshareApiClient', esnLinshareApiClient);

  function esnLinshareApiClient($window, $q) {
    var client = null;

    return {
      listWorkgroups: listWorkgroups,
      listNodes: listNodes,
      listDocuments: listDocuments,
      shareDocuments: shareDocuments
    };

    function listWorkgroups() {
      return getClient().then(function(client) {
        return client.user.workgroup.list();
      });
    }

    function listNodes(workGroupUuid, options) {
      return getClient().then(function(client) {
        return client.user.workgroup.listNodes(workGroupUuid, options);
      });
    }

    function listDocuments() {
      return getClient().then(function(client) {
        return client.user.documents.list();
      });
    }

    function shareDocuments(options) {
      return getClient().then(function(client) {
        return client.user.shares.shareDocuments(options);
      });
    }

    function getClient() {
      if (!client) {
        client = new $window.LinshareApiClient.Client({
          baseUrl: 'https://files.linshare.local/linshare/webservice/rest',
          auth: {
            type: 'basic',
            username: 'root@localhost.localdomain',
            password: 'adminlinshare'
          }
        });
      }

      return $q.when(client);
    }

  }
})(angular);
