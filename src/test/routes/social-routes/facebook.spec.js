import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import passport from 'passport';
import app from '../../..';

describe('facebook login', () => {
  let stub;
  before(() => {
    stub = sinon.stub(passport, 'use');
  });
  after(() => {
    stub.restore();
  });
  it('should redirect to facebook request', done => {
    request(app)
      .get('/auth/facebook')
      .end((err, res) => {
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.include('https://www.facebook.com/v3.2/dialog/oauth?response_type=code');
        done(err);
      });
  });
});
