'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The linshareFileBrowserLoaders service', function() {
  var $rootScope, linshareFileBrowserLoaders, esnLinshareApiClient;

  beforeEach(function() {
    esnLinshareApiClient = {
      listDocuments: sinon.stub()
    };
  });

  beforeEach(function() {
    module('linagora.esn.linshare');
    module(function($provide) {
      $provide.value('esnLinshareApiClient', esnLinshareApiClient);
    });
  });

  beforeEach(function() {
    inject(function(_$rootScope_, _linshareFileBrowserLoaders_) {
      $rootScope = _$rootScope_;
      linshareFileBrowserLoaders = _linshareFileBrowserLoaders_;
    });
  });

  describe('The loadMySpace function', function() {
    it('should call esnLinshareApiClient.listDocuments and process the documents', function(done) {
      var docs = [
        { name: 'doc1' },
        { name: 'doc2' }
      ];

      esnLinshareApiClient.listDocuments.returns($q.when(docs));

      linshareFileBrowserLoaders.loadMySpace()
        .then(function(results) {
          results.forEach(function(doc) {
            expect(doc.isSelectable).to.be.true;
            expect(doc.icon).to.equal('mdi-file');
          });

          done();
        });

      $rootScope.$digest();
    });
  });
});
