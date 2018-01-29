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

    /**
     * List user workgroups
     * @return {Promise} Resolve workgroup list on success
     */
    function listWorkgroups() {
      return getClient().then(function(client) {
        return client.user.workgroup.list();
      });
    }

    /**
     * List nodes of a workgroup
     * @param  {String} workGroupUuid - The workgroup UUID
     * @param  {Object} options       - (optional) { parent: 'parentNodeUuid', type: 'FOLDER | DOCUMENT' }
     * @return {Promise}              - Resolve node list on success
     */
    function listNodes(workGroupUuid, options) {
      return getClient().then(function(client) {
        return client.user.workgroup.listNodes(workGroupUuid, options);
      });
    }

    /**
     * List documents in user's My space
     * @return {Promise} - Resolve document list on success
     */
    function listDocuments() {
      return getClient().then(function(client) {
        return client.user.documents.list();
      });
    }

    /**
     * Share documents in My space to email addresses
     * @param  {Object} options - Check for example in https://github.com/linagora/linshare-api-client#share
     * @return {Promise}        - Resolve share result on success
     */
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
