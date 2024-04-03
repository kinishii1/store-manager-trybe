const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const { describe, it } = mocha;
const { expect } = chai;

const productMiddleware = require('../../../src/middlewares/productMiddleware');

describe('productMiddleware', () => {
  describe('validateProduct', () => {
    const req = {
      body: {
        name: 'Product 1',
      },
    };
    const res = {
      status: sinon.stub().returns({
        json: sinon.stub(),
      }),
    };
    const next = sinon.stub().returns();

    afterEach(function () {
      next.resetHistory();
    });

    it('should call next with no errors', () => {
      productMiddleware.validateCreateProduct(req, res, next);
      expect(next).to.have.been.calledWith();
    });

    it('should call next with an error with no name', () => {
      req.body.name = '';
      productMiddleware.validateCreateProduct(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.status().json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('should call next with an error with short name', () => {
      req.body.name = 'Pro';
      productMiddleware.validateCreateProduct(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
    });
  });
});