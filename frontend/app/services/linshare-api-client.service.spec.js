'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The linshareApiClient service', function() {
  var $rootScope, $q, linshareApiClientProvider, esnLinshareApiClient, esnConfigMock;

  beforeEach(module('linagora.esn.linshare', function($provide) {
    $provide.value('esnConfig', function() {
      return esnConfigMock;
    });
  }));

  beforeEach(inject(function(_$rootScope_, _$q_, _linshareApiClientProvider_, _esnLinshareApiClient_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    linshareApiClientProvider = _linshareApiClientProvider_;
    esnLinshareApiClient = _esnLinshareApiClient_;
  }));

  describe('The createDocument fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      esnLinshareApiClient.createDocument()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should create user document', function() {
      var client = {
        user: {
          documents: {
            create: sinon.stub().returns($q.when())
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      esnLinshareApiClient.createDocument({
        file: { name: 'my file' },
        fileSize: 100
      });

      $rootScope.$digest();

      expect(client.user.documents.create).to.have.been.calledWith();
    });

    it('should support cancellation', function() {
      var promise = $q.when();
      var client = {
        user: {
          documents: {
            create: sinon.stub().returns(promise)
          }
        }
      };

      promise.cancel = sinon.spy();

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));

      var uploadPromise = esnLinshareApiClient.createDocument({
        file: { name: 'my file' },
        fileSize: 100
      });

      $rootScope.$digest();

      uploadPromise.cancel();

      expect(promise.cancel).to.have.been.calledWith();
    });
  });

  describe('The createDocumentFromUrl fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      esnLinshareApiClient.createDocumentFromUrl()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should create document from URL', function() {
      var client = {
        user: {
          documents: {
            createFromUrl: sinon.spy()
          }
        }
      };
      var data = { url: '123' };
      var options = { async: true };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      esnLinshareApiClient.createDocumentFromUrl(data, options);

      $rootScope.$digest();

      expect(client.user.documents.createFromUrl).to.have.been.calledWith(data, options);
    });
  });

  describe('The getDocumentAsyncTaskById fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      esnLinshareApiClient.getDocumentAsyncTaskById()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should get the async task', function() {
      var client = {
        user: {
          documents: {
            getAsyncTask: sinon.spy()
          }
        }
      };
      var asyncTaskId = '123';

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      esnLinshareApiClient.getDocumentAsyncTaskById(asyncTaskId);

      $rootScope.$digest();

      expect(client.user.documents.getAsyncTask).to.have.been.calledWith(asyncTaskId);
    });
  });

  describe('The listWorkgroups fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      esnLinshareApiClient.listWorkgroups()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should list work groups', function() {
      var client = {
        user: {
          workgroup: {
            list: sinon.spy()
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      esnLinshareApiClient.listWorkgroups();

      $rootScope.$digest();

      expect(client.user.workgroup.list).to.have.been.calledWith();
    });
  });

  describe('The listNodes fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      esnLinshareApiClient.listNodes()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should list nodes of a workgroup node', function() {
      var client = {
        user: {
          workgroup: {
            listNodes: sinon.spy()
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      esnLinshareApiClient.listNodes();

      $rootScope.$digest();

      expect(client.user.workgroup.listNodes).to.have.been.calledWith();
    });
  });

  describe('The listDocuments fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      esnLinshareApiClient.listDocuments()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should list user documents', function() {
      var client = {
        user: {
          documents: {
            list: sinon.spy()
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      esnLinshareApiClient.listDocuments();

      $rootScope.$digest();

      expect(client.user.documents.list).to.have.been.calledWith();
    });
  });

  describe('The shareDocuments fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      esnLinshareApiClient.shareDocuments()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should list user documents', function() {
      var client = {
        user: {
          shares: {
            shareDocuments: sinon.spy()
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      esnLinshareApiClient.shareDocuments();

      $rootScope.$digest();

      expect(client.user.shares.shareDocuments).to.have.been.calledWith();
    });
  });
});
