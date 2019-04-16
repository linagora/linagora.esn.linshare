/* eslint-disable no-console */

const request = require('supertest');
const expect = require('chai').expect;
const path = require('path');

describe('The create token API: POST /token', () => {
  let app, deployOptions, regularUser;
  const password = 'secret';

  beforeEach(function(done) {
    const self = this;

    deployOptions = {
      fixtures: path.normalize(`${__dirname}/../../../fixtures/deployments`)
    };
    app = self.helpers.modules.current.app;

    self.helpers.api.applyDomainDeployment('general', deployOptions, (err, models) => {
      if (err) {
        return done(err);
      }
      regularUser = models.users[1];
      done();
    });
  });

  beforeEach(function(done) {
    this.helpers.jwt.saveTestConfiguration(done);
  });

  it('should respond 401 if not logged in', function(done) {
    this.helpers.api.requireLogin(app, 'post', '/api/token', done);
  });

  it('should respond 200 with JWT token on success', function(done) {
    this.helpers.api.loginAsUser(app, regularUser.emails[0], password, (err, requestAsMember) => {
      expect(err).to.not.exist;
      requestAsMember(request(app).post('/api/token'))
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });
  });
});
