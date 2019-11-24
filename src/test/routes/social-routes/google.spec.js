import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import passport from 'passport';
import app from '../../..';

describe('google login', () => {
  let stub;
  before(() => {
    stub = sinon.stub(passport, 'use');
  });
  after(() => {
    stub.restore();
  });
  it('should redirect to google request', done => {
    request(app)
      .get('/auth/google')
      .end((err, res) => {
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.include('https://accounts.google.com/o/oauth2/v2/auth?response_type=code');
        done(err);
      });
  });
});
