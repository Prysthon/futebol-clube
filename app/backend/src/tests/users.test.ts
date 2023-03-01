import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import { userMock, userCompleteMock, tokenMock, userWithoutEmailMock, userWithoutPasswordMock, missingFields, wrongEmail, wrongFields, infNotInserted, wrongPassword } from './mocks/users.mock';
import * as bcrypt from 'bcryptjs';

describe('Test all functions of /users route', () => {
  let chaiHttpResponse: Response;

  describe('1 - Requesting login users function to check token', () => {
    it('email and password inserted correctly', async () => {
      sinon.stub(Users, 'findOne').resolves(userCompleteMock);
      sinon.stub(bcrypt, 'compare').resolves(true);
      const res = await chai.request(app).post('/login').send(userMock);
      console.log('OIIIIIIIIIIIIII\n', res.body);
      const token = res.body.token.slice(0,36);
      expect(res.status).to.be.equal(200);
      expect(token).to.be.equal(tokenMock.token);
    });

    it('password inserted correctly but without email', async () => {
      const res = await chai.request(app).post('/login').send(userWithoutEmailMock);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.deep.equal(missingFields);
    });

    it('email inserted correctly but without password', async () => {
      const res = await chai.request(app).post('/login').send(userWithoutPasswordMock);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.deep.equal(missingFields);
    });
  }); 

  describe('2 - Requesting login users function with wrong fields', () => {
    it('email not registered', async () => {
      const res = await chai.request(app).post('/login').send(infNotInserted);
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal(wrongFields);
    });

    it('password inserted with incorrectly format', async () => {
      const res = await chai.request(app).post('/login').send(wrongPassword);
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal(wrongFields);
    });

    it('password not registered', async () => {
      const res = await chai.request(app).post('/login').send(infNotInserted);
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.deep.equal(wrongFields);
    });
  }); 

  afterEach(function () {
    sinon.restore();
  });
});

