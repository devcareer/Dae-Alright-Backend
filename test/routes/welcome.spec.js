import chai from 'chai';
import request from 'supertest';
import app from '../../src';

const { expect } = chai;

describe('Welcome routes', () => {
  it('should return a welcome message on index route', done => {
    request(app)
      .get('/')
      .end((err, res) => {
        const { status, message } = res.body;
        expect(res.status).to.equal(200);
        expect(status).to.eql('success');
        expect(message).to.eql('Welcome to Dae Alright API');
        done(err);
      });
  });

  specify('error if a wrong endpoint is requested', done => {
    request(app)
      .get('/404')
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql('error');
        expect(res.body.message).to.eql('The endpoint does not exist');
        done(err);
      });
  });
});
