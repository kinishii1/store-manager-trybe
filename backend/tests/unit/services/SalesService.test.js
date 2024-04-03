const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const { describe, it } = mocha;
const { expect } = chai;

const SalesService = require('../../../src/services/SalesService');
const Sales = require('../../../src/models/Sales');
const Product = require('../../../src/models/Product');

describe('Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('getAllSales', function () {
    it('should return all products', async function () {
      sinon.stub(Sales, 'findAll').resolves([
        {
          saleId: 1,
          date: '2022-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: '2021-09-09T04:54:54.000Z',
          productId: 2,
          quantity: 2,
        },
      ]);
      const sales = await SalesService.getAllSales();
      expect(sales).to.be.an('array');
      expect(sales).to.have.lengthOf(2);
    });
  });

  describe('getSaleById', function () {
    it('should return a product', async function () {
      sinon.stub(Sales, 'findById').resolves([
        {
          date: '2023-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 2,
        },
        {
          date: '2021-09-09T04:54:54.000Z',
          productId: 2,
          quantity: 2,
        },
      ]);
      const product = await SalesService.getSaleById(1);
      expect(product).to.be.an('array');
    });

    it('should return null', async function () {
      sinon.stub(Sales, 'findById').resolves(null);
      const product = await SalesService.getSaleById(1);
      expect(product).to.equal(null);
    });
  });

  describe('createSale', function () {
    it('should create a sale', async function () {
      const salesData = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      sinon.stub(Sales, 'findById').resolves({
        id: 1,
        name: 'Product 1',
        price: 10,
        quantity: 10,
      });
      sinon.stub(Sales, 'create').resolves({
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      });
      const sale = await SalesService.createSales(salesData);
      expect(sale).to.be.an('object');
    });
  });

  describe('deleteSale', function () {
    it('should delete a sale', async function () {
      sinon.stub(Sales, 'findById').resolves({
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      });
      sinon.stub(Sales, 'deleteFromDB').resolves();
      await SalesService.deleteSale(1);
    });

    it('should throw an error when the sale is not found', async function () {
      sinon.stub(Sales, 'findById').resolves(null);
      try {
        await SalesService.deleteSale(1);
      } catch (error) {
        expect(error.message).to.equal('Sale not found');
      }
    });
  });

  describe('updateSale', function () {
    it('should update a sale', async function () {
      sinon.stub(Sales, 'findById').resolves({
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      });
      sinon.stub(Product, 'findById').resolves({
        id: 1,
        name: 'Product 1',
        price: 10,
        quantity: 10,
      });
      sinon.stub(Sales, 'updateSale').resolves({
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 5,
      });
      const sale = await SalesService.updateSale(1, 1, 5);
      expect(sale).to.be.an('object');
    });

    it('should throw an error when the sale is not found', async function () {
      sinon.stub(Sales, 'findById').resolves(null);
      try {
        await SalesService.updateSale(1, 1, 5);
      } catch (error) {
        expect(error.message).to.equal('Sale not found');
      }
    });

    it('should throw an error when the product is not found in the sale', async function () {
      sinon.stub(Sales, 'findById').resolves({
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      });
      sinon.stub(Product, 'findById').resolves(null);
      try {
        await SalesService.updateSale(1, 1, 5);
      } catch (error) {
        expect(error.message).to.equal('Product not found in sale');
      }
    });
  });
});