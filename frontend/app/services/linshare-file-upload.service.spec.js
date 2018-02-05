'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The linshareFileUpload service', function() {
  var $q, $rootScope, esnLinshareApiClient;
  var linshareFileUpload;

  beforeEach(module('linagora.esn.linshare'));

  beforeEach(inject(function(_$rootScope_, _$q_, _esnLinshareApiClient_, _linshareFileUpload_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    esnLinshareApiClient = _esnLinshareApiClient_;
    linshareFileUpload = _linshareFileUpload_;
  }));

  describe('The uploadFile fn', function() {
    it('should call Linshare API to create document in My space', function() {
      esnLinshareApiClient.createDocument = sinon.stub().returns($q.when({}));

      var file = { name: 'Learn_JS_in_6_hours.pdf' };
      var size = 12345;
      var fileType = 'text';

      linshareFileUpload.uploadFile(null, file, fileType, size);

      expect(esnLinshareApiClient.createDocument).to.have.been.calledWith({
        file: file,
        fileSize: size
      });
    });

    it('should support upload progress by promise notification', function() {
      var onUploadProgress;

      esnLinshareApiClient.createDocument = function(data, option) {
        onUploadProgress = option.onUploadProgress;

        return $q.when();
      };

      var file = { name: 'Learn_JS_in_6_hours.pdf' };
      var size = 12345;
      var fileType = 'text';
      var notifySpy = sinon.spy();

      linshareFileUpload.uploadFile(null, file, fileType, size).then(null, null, notifySpy);

      var progressEvent = { loaded: 7, total: 10 };

      onUploadProgress(progressEvent);
      $rootScope.$digest();

      expect(notifySpy).to.have.been.calledWith(progressEvent);
    });

    it('should support canceler by calling "cancel" function of the upload promise', function() {
      var promise = $q.when({});

      promise.cancel = sinon.spy();

      esnLinshareApiClient.createDocument = sinon.stub().returns(promise);

      var file = { name: 'Learn_JS_in_6_hours.pdf' };
      var size = 12345;
      var fileType = 'text';
      var cancelerDeferred = $q.defer();

      linshareFileUpload.uploadFile(null, file, fileType, size, {}, cancelerDeferred.promise);

      cancelerDeferred.resolve();
      $rootScope.$digest();

      expect(promise.cancel).to.have.been.calledOnce;
    });
  });
});
