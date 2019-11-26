import { expect } from 'chai';
import request from 'supertest';
import app from '../..';


describe('Handles request to retrieve vendors', () => {
  context('Get all vendors', () => {
    it('should successfully GET the list of all vendors from the system', (done) => {
      request(app)
        .get('/vendors')
        .end((err, res) => {
          const { status, message, data } = res.body;
          expect(res.status).to.equal(200);
          expect(status).to.eql('success');
          expect(message).to.be.a('string').that.includes('vendors retrieved successfully');
          expect(data).to.be.an('object');
          expect(data).to.have.property('vendors');
          expect(data.vendors).to.be.an('array');
          done(err);
        });
    });
  });

  context('Retrieve a single vendor by ID', () => {
    it('should return an Invalid uuid error', (done) => {
      request(app)
        .get('/vendor/thisisnotavaliduuid')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('Please provide a valid uuid');
          done(err);
        });
    });

    it('should return vendor with invalid id not found error', (done) => {
      request(app)
        .get('/vendor/6a253574-bb3c-44e2-b6a6-a309e075a1f8')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.be.a('string').that.includes('No vendor with id');
          expect(res.body.message).to.be.a('string').that.includes('in the system');
          done(err);
        });
    });
  });
});
