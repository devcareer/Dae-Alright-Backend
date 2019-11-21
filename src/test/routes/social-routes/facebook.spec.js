import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import FacebookStrategy from 'passport-facebook';
import app from '../../..';

import passport from '../../../config/passport-config/config';


describe('facebook login', () => {
  let stub, fbStub, someStub;
  before(() => {
    someStub = sinon.stub(FacebookStrategy, 'Strategy');
    stub = sinon.stub(passport, 'use');
    fbStub = sinon.stub(passport, 'authenticate');
  });
  after(() => {
    fbStub.restore();
    stub.restore();
    someStub.restore();
  });
  it('should redirect to facebook request', (done) => {
    request(app)
      .get('/auth/facebook')
      .end((err, res) => {
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.include('https://www.facebook.com/');
        done(err);
      });
  });
});
