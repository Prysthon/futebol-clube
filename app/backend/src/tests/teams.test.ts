import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import teamsMock from './mocks/teams.mock';

describe('Test all functions of /teams route', () => {
  let chaiHttpResponse: Response;

  it('02 - Requesting findAll teams function', async () => {
    sinon.stub(Teams, 'findAll').resolves(teamsMock);
    const res = await chai.request(app).get('/teams');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(teamsMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});

