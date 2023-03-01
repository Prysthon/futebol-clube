import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test all functions of /matches route', () => {
  let chaiHttpResponse: Response;

  it('02 - Requesting findAll matches function', async () => {
    const res = await chai.request(app).get('/matches');
    expect(res.status).to.be.equal(200);
  });

  afterEach(function () {
    sinon.restore();
  });
});

