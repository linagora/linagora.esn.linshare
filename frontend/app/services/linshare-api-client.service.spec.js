'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The linshareApiClient service', function() {
  var $rootScope, esnLinshareApiClient, esnConfigMock;

  beforeEach(module('linagora.esn.linshare', function($provide) {
    $provide.value('esnConfig', function() {
      return esnConfigMock;
    });
  }));

  beforeEach(inject(function(_$rootScope_, _$q_, _esnLinshareApiClient_) {
    $rootScope = _$rootScope_;
    esnLinshareApiClient = _esnLinshareApiClient_;
  }));

  describe('The listDocuments fn', function() {
    it('should reject in case of there is no api base path for frontend', function(done) {
      esnConfigMock = $q.when();

      esnLinshareApiClient.listDocuments()
        .catch(function(error) {
          expect(error.message).to.equal('Linshare API base path for frontend is not configured');
          done();
        });

      $rootScope.$digest();
    });
  });
});
