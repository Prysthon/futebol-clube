import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import { userMock, userCompleteMock, tokenMock, userWithoutEmailMock, userWithoutPasswordMock, missingFields } from './mocks/users.mock';

import jwtToken from '../api/services/jwt';

describe('Test all functions of /users route', () => {
  let chaiHttpResponse: Response;

  describe('Requesting login users function', () => {
    it('email and password inserted correctly', async () => {
      sinon.stub(Users, 'findOne').resolves(userCompleteMock);
      const res = await chai.request(app).post('/login').send(userMock);
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

  afterEach(function () {
    sinon.restore();
  });
});

