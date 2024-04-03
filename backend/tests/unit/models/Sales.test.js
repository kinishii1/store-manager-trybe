const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const pool = require('../../../src/models/Connection');

const { describe, it } = mocha;
const { expect } = chai;

const Sales = require('../../../src/models/Sales');

describe('Product Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('findAll', function () {
    it('should return all sales', async function () {
      sinon.stub(pool, 'query').resolves([
        [
          {
            saleId: 1,
            date: '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 2,
          },
          {
            saleId: 1,
            date: '2021-09-09T04:54:54.000Z',
            productId: 2,
            quantity: 2,
          },
        ],
        [],
      ]);
      const products = await Sales.findAll();
      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(2);
    });
  });

  describe('findById', function () {
    it('should return a sale', async function () {
      sinon.stub(pool, 'query').resolves([
        [
          {
            date: '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 2,
          },
          {
            date: '2021-09-09T04:54:54.000Z',
            productId: 2,
            quantity: 2,
          },
        ],
        [],
      ]);
      const sale = await Sales.findById(1);
      expect(sale).to.be.an('array');
      expect(sale).to.have.lengthOf(2);
    });

    it('should return null', async function () {
      sinon.stub(pool, 'query').resolves([[], []]);
      const sale = await Sales.findById(1);
      expect(sale).to.equal(null);
    });
  });

  describe('create', function () {
    it('should return a sale', async function () {
      sinon.stub(pool, 'query').resolves([
        { insertId: 1 },
        {},
      ]);
      const saleData = [
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 2,
        },
      ];
      const sale = await Sales.create(saleData);
      expect(sale).to.be.an('object');
      expect(sale).to.have.property('id');
      expect(sale).to.have.property('itemsSold');
      expect(sale.itemsSold).to.be.an('array');
      expect(sale.itemsSold).to.have.lengthOf(2);
    });
  });

  describe('deleteFromDB', function () {
    it('should delete a sale', async function () {
      sinon.stub(pool, 'query').resolves([{}, {}]);
      await Sales.deleteFromDB(1);
    });
  });
});