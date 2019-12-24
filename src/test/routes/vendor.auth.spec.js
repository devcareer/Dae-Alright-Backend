import { expect } from 'chai';
import request from 'supertest';
import app from '../..';

import { vendor } from '../mocks/vendor.mock';

describe('Vendor authentication Route', () => {
  context('Signup route', () => {
    it('should successfully POST to vendor signup route', (done) => {
      request(app)
        .post('/auth/vendor/signup')
        .send(vendor)
        .end((err, res) => {
          const { status, message, data } = res.body;
          expect(res.status).to.equal(201);
          expect(status).to.eql('success');
          expect(message).to.eql('Your account has been created successfully');
          expect(data).to.be.an('object');
          expect(data).to.have.property('vendor');
          expect(data.vendor).to.have.property('name');
          expect(data.vendor).to.have.property('email');
          expect(data.vendor).to.have.property('phone');
          expect(data.vendor).to.have.property('location');
          expect(data.vendor).to.not.have.property('password');
          expect(data).to.have.property('token');
          done(err);
        });
    });

    it('should throw an error if vendor already exists', (done) => {
      request(app)
        .post('/auth/vendor/signup')
        .send(vendor)
        .end((err, res) => {
          const { status, message } = res.body;
          expect(res.status).to.equal(409);
          expect(status).to.eql('error');
          expect(message).to.eql('vendor already exist');
          done(err);
        });
    });

    it('should throw an error if appropriate details are not supplied', (done) => {
      request(app)
        .post('/auth/vendor/signup')
        .send({ email: vendor.email, password: vendor.password })
        .end((err, res) => {
          const { status, errors } = res.body;
          expect(res.status).to.equal(400);
          expect(status).to.eql('error');
          expect(errors.phone).to.eql('enter a valid phone number');
          expect(errors.name)
            .to.eql('name should be between 2 to 25 characters');
          done(err);
        });
    });

    it('should throw an error if email is invalid', (done) => {
      request(app)
        .post('/auth/vendor/signup')
        .send({ name: vendor.name, email: 'wrong', password: vendor.password })
        .end((err, res) => {
          const { status, errors } = res.body;
          expect(res.status).to.equal(400);
          expect(status).to.eql('error');
          expect(errors.email).to.eql('email is not valid');
          done(err);
        });
    });
  });

  context('Signin route', () => {
    it('should successfully POST to signin route', (done) => {
      request(app)
        .post('/auth/vendor/signin')
        .send({ email: vendor.email, password: vendor.password })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should throw an error if email does not exist (incorrect)', (done) => {
      request(app)
        .post('/auth/vendor/signin')
        .send({ email: 'john@doe.com', password: vendor.password })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });

    it('should throw an error if password is incorrect', (done) => {
      request(app)
        .post('/auth/vendor/signin')
        .send({ email: vendor.email, password: 'saligia199323' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });
});
