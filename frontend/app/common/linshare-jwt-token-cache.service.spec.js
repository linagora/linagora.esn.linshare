'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The linshareJwtTokenCache service', function() {
  var cacheOption;
  var $rootScope, $q;
  var linshareApiService;

  beforeEach(function() {
    function CacheMock(_cacheOption_) {
      cacheOption = _cacheOption_;
    }
    module('esn.cache', function($provide) {
      $provide.value('Cache', CacheMock);
    });
    module('linagora.esn.linshare');

    inject(function(_$q_, _$rootScope_, _linshareApiService_, _linshareJwtTokenCache_) { // eslint-disable-line no-unused-vars
      $q = _$q_;
      $rootScope = _$rootScope_;
      linshareApiService = _linshareApiService_;
    });
  });

  describe('The loader fn', function() {
    it('should call linshareApiService to generate JWT token', function(done) {
      var token = '123';

      linshareApiService.generateJwtToken = sinon.stub().returns($q.when({ data: token }));

      cacheOption.loader().then(function(data) {
        expect(data).to.equal(token);
        done();
      });

      $rootScope.$digest();
    });
  });

  describe('The keyBuilder fn', function() {
    it('should the cache key', function() {
      expect(cacheOption.keyBuilder()).to.equal('token');
    });
  });
});
