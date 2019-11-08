import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../..';
import database from '../../database/models';

import { user, errUser } from '../mocks/user.mock';

const { User } = database;

describe('Authentication Route', () => {
  context('Signup route', () => {
    it('should successfully POST to signup route', (done) => {
      request(app)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          const { status, message, data } = res.body;
          expect(res.status).to.equal(201);
          expect(status).to.eql('success');
          expect(message).to.eql('Your account has been created successfully');
          expect(data).to.be.an('object');
          expect(data).to.have.property('user');
          expect(data.user).to.have.property('firstName');
          expect(data.user).to.have.property('lastName');
          expect(data.user).to.have.property('email');
          expect(data.user).to.have.property('phone');
          expect(data.user).to.have.property('address');
          expect(data.user).to.not.have.property('password');
          expect(data).to.have.property('token');
          done(err);
        });
    });

    it('should throw an error if user already exists', (done) => {
      request(app)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          const { status, message } = res.body;
          expect(res.status).to.equal(409);
          expect(status).to.eql('error');
          expect(message).to.eql('user already exist');
          done(err);
        });
    });

    it('should throw an error if appropriate details are not supplied', (done) => {
      request(app)
        .post('/auth/signup')
        .send({ email: user.email, password: user.password })
        .end((err, res) => {
          const { status, errors } = res.body;
          expect(res.status).to.equal(400);
          expect(status).to.eql('error');
          expect(errors.phone).to.eql('enter a valid phone number');
          expect(errors.firstName)
            .to.eql('first name should be between 2 to 15 characters');
          expect(errors.lastName)
            .to.eql('last name should be between 2 to 15 characters');
          done(err);
        });
    });

    it('should throw an error if email is invalid', (done) => {
      request(app)
        .post('/auth/signup')
        .send({ name: user.name, email: 'wrong', password: user.password })
        .end((err, res) => {
          const { status, errors } = res.body;
          expect(res.status).to.equal(400);
          expect(status).to.eql('error');
          expect(errors.email).to.eql('enter a valid email address');
          done(err);
        });
    });

    it.skip('should return appropriate status if an error occurs on the server', done => {
      const stub = sinon.stub(User, 'create').rejects(new Error('server error'));
      request(app)
        .post('/auth/signup')
        .send(errUser)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).to.equal(500);
          stub.restore();
          done(error);
        });
    });
  });
});
