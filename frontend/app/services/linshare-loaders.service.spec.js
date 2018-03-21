'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The linshareFileBrowserLoaders service', function() {
  var $rootScope, linshareFileBrowserLoaders, linshareApiClient;

  beforeEach(function() {
    linshareApiClient = {
      listDocuments: sinon.stub()
    };
  });

  beforeEach(function() {
    module('linagora.esn.linshare');
    module(function($provide) {
      $provide.value('linshareApiClient', linshareApiClient);
    });
  });

  beforeEach(function() {
    inject(function(_$rootScope_, _linshareFileBrowserLoaders_) {
      $rootScope = _$rootScope_;
      linshareFileBrowserLoaders = _linshareFileBrowserLoaders_;
    });
  });

  describe('The loadMySpace function', function() {
    it('should call linshareApiClient.listDocuments and process the documents', function(done) {
      var docs = [
        { name: 'doc1' },
        { name: 'doc2' }
      ];

      linshareApiClient.listDocuments.returns($q.when(docs));

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
