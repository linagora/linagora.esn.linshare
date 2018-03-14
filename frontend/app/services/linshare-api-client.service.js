(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare')
    .factory('esnLinshareApiClient', esnLinshareApiClient);

  function esnLinshareApiClient($window, $q, esnConfig) {
    var LinshareApiClient = $window.LinshareApiClient;
    var client = null;

    return {
      NODE_TYPE: LinshareApiClient.NODE_TYPE,
      ASYNC_TASK_STATUS: LinshareApiClient.ASYNC_TASK_STATUS,
      createDocument: createDocument,
      createDocumentFromUrl: createDocumentFromUrl,
      getDocumentAsyncTaskById: getDocumentAsyncTaskById,
      listWorkgroups: listWorkgroups,
      listNodes: listNodes,
      listDocuments: listDocuments,
      shareDocuments: shareDocuments
    };

    /**
     * Create a document (upload a file) in My space
     * @param  {Object} data    - The data object contains:
     *                            - file: file object to upload
     *                            - fileSize: the file's size
     * @param  {Object} options - (optinal) possible attributes are:
     *                            - async (Boolean): enable async upload
     *                            - onUploadProgress (Function): to track the upload progress
     * @return {Promise}         - Resolve on success
     */
    function createDocument(data, options) {
      var cancelFn = angular.noop;
      var promise = getClient().then(function(client) {
        var formData = new FormData();

        formData.append('file', data.file);
        formData.append('filesize', data.fileSize);

        var promise = client.user.documents.create(formData, options);

        cancelFn = promise.cancel;

        return promise;
      });

      promise.cancel = function() {
        cancelFn();
      };

      return promise;
    }

    /**
     * Create a document (upload a file) in My space from URL
     * @param  {Object} data    - A object:
     *                            + url: url to the file
     *                            + fileName: (optional) custom file name
     *                            + size: (optional) the file size
     * @param  {Object} options - Possible options are:
     *                            + async: set true to upload asynchronously
     * @return {Promise}        - Resolve on success
     */
    function createDocumentFromUrl(data, options) {
      return getClient().then(function(client) {
        return client.user.documents.createFromUrl(data, options);
      });
    }

    /**
     * Get async task when you create document asynchronously
     * @param  {String} taskId - The async task ID
     * @return {Promise}       - Resolve on success
     */
    function getDocumentAsyncTaskById(taskId) {
      return getClient().then(function(client) {
        return client.user.documents.getAsyncTask(taskId);
      });
    }

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
      if (client) {
        return $q.when(client);
      }

      return esnConfig('linagora.esn.linshare.apiBasePathFrontend')
        .then(function(apiBasePath) {
          if (!apiBasePath) {
            return $q.reject(new Error('Linshare API base path for frontend is not configured'));
          }

          client = new LinshareApiClient.Client({
            baseUrl: apiBasePath,
            auth: {
              type: 'basic',
              username: 'root@localhost.localdomain',
              password: 'adminlinshare'
            }
          });

          return client;
        });
    }

  }
})(angular);
