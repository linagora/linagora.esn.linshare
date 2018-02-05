(function(angular) {
  'use strict';

  angular.module('linagora.esn.linshare')
    .factory('linshareFileUpload', linshareFileUpload);

  function linshareFileUpload(
    $q,
    inBackground,
    esnLinshareApiClient
  ) {
    return {
      uploadFile: uploadFile
    };

    function uploadFile(unusedUrl, file, type, size, options, canceler) {
      var deferred = $q.defer();

      var uploadPromise = esnLinshareApiClient.createDocument({
        file: file,
        fileSize: size
      }, {
        onUploadProgress: deferred.notify
      });

      if (canceler) {
        canceler.then(uploadPromise.cancel);
      }

      uploadPromise.then(deferred.resolve, deferred.reject);

      return inBackground(deferred.promise);
    }
  }
})(angular);
