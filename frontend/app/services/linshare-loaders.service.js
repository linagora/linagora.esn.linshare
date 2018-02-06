(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare')
    .factory('linshareFileBrowserLoaders', linshareFileBrowserLoaders);

  function linshareFileBrowserLoaders(esnLinshareApiClient, LINSHARE_NODE_ICON) {
    return {
      loadMySpace: loadMySpace
    };

    function loadMySpace() {
      return esnLinshareApiClient.listDocuments()
        .then(function(docs) {
          return docs.map(function(doc) {
            doc.icon = LINSHARE_NODE_ICON.DOCUMENT;
            doc.isSelectable = true;

            return doc;
          });
        });
    }
  }
})(angular);
