const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const { describe, it } = mocha;
const { expect } = chai;

const saleMiddleware = require('../../../src/middlewares/saleMiddleware');

describe('saleMiddleware', () => {
  describe('validateCreateSale', () => {
    const validReq = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    const invalidReqQuant = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
        },
      ],
    };

    const invalidReqProductId = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          quantity: 5,
        },
      ],
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
      saleMiddleware.validateCreateSale(validReq, res, next);
      expect(next).to.have.been.calledWith();
    });

    it('should call next with an error with no quantity', () => {
      const response = saleMiddleware.validateCreateSale(invalidReqQuant, res, next);
      expect(response).to.deep.equal(res.status(400).json({ message: '"quantity" is required' }));
    });

    it('should call next with an error with no productId', () => {
      const response = saleMiddleware.validateCreateSale(invalidReqProductId, res, next);
      expect(response).to.deep.equal(res.status(400).json({ message: '"productId" is required' }));
    });
  });

  describe('validateQuantity', () => {
    const validReq = {
      body: {
        quantity: 1,
      },
    };

    const invalidReqQuant = {
      body: {},
    };

    const invalidReqQuantValue = {
      body: {
        quantity: 0,
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
      saleMiddleware.validateQuantity(validReq, res, next);
      expect(next).to.have.been.calledWith();
    });

    it('should call next with an error with no quantity', () => {
      const response = saleMiddleware.validateQuantity(invalidReqQuant, res, next);
      expect(response).to.deep.equal(res.status(400).json({ message: '"quantity" is required' }));
    });

    it('should call next with an error with quantity value 0', () => {
      saleMiddleware.validateQuantity(invalidReqQuantValue, res, next);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.status().json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  });
});