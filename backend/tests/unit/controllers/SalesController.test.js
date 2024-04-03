const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const { describe, it, afterEach } = mocha;
const { expect } = chai;

const SalesService = require('../../../src/services/SalesService');
const SalesController = require('../../../src/controllers/SalesController');
const { salesMock, saleMock } = require('../../mocks/SalesMocks');

describe('SalesController', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('getAllSales', function () {
    it('should return all sales', async function () {
      sinon.stub(SalesService, 'getAllSales').resolves(salesMock);

      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.getAllSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return a 404 status when there are no sales', async function () {
      sinon.stub(SalesService, 'getAllSales').resolves(null);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.getAllSales(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('getSaleById', function () {
    it('should return a sale', async function () {
      sinon.stub(SalesService, 'getSaleById').resolves(saleMock);
      
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return a 404 status when the sale is not found', async function () {
      sinon.stub(SalesService, 'getSaleById').resolves(null);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('createSales', function () {
    it('should create a sale', async function () {
      sinon.stub(SalesService, 'createSales').resolves({
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 2,
          },
        ],
      });

      const req = {
        body: [{
          productId: 1,
          quantity: 2,
        }],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.createSales(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
  });

  describe('deleteSale', function () {
    it('should delete a sale', async function () {
      sinon.stub(SalesService, 'deleteSale').resolves(true);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });

    it('should return a 404 status when the sale is not found', async function () {
      sinon.stub(SalesService, 'deleteSale').rejects(
        new Error('Sale not found'),
      );
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('updateSale', function () {
    it('should update a sale', async function () {
      sinon.stub(SalesService, 'updateSale').resolves({
        date: new Date(),
        saleId: 1,
        productId: 1,
        quantity: 2,
      });

      const req = {
        params: {
          saleId: 1,
          productId: 1,
        },
        body: {
          quantity: 2,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.updateSale(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return a 400 status when the sale is not found', async function () {
      sinon.stub(SalesService, 'updateSale').rejects(new Error('Sale not found'));
      const req = {
        params: {
          saleId: 1,
          productId: 1,
        },
        body: {
          quantity: 2,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await SalesController.updateSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });
});