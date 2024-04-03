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

const Product = require('../../../src/models/Product');

describe('Product Model', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('findAll', function () {
    it('should return all products', async function () {
      sinon.stub(pool, 'query').resolves([
        [
          {
            id: 1,
            name: 'Martelo de Thor',
          },
          {
            id: 2,
            name: 'Traje de encolhimento',
          },
        ],
      ]);
      const products = await Product.findAll();
      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(2);
    });
  });

  describe('findById', function () {
    it('should return a product', async function () {
      sinon.stub(pool, 'query').resolves([
        [
          {
            id: 1,
            name: 'Martelo de Thor',
          },
        ],
        [],
      ]);
      const product = await Product.findById(1);
      expect(product).to.be.an('object');
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
    });

    it('should return null', async function () {
      sinon.stub(pool, 'query').resolves([[], []]);
      const product = await Product.findById(1);
      expect(product).to.equal(null);
    });
  });

  describe('create', function () {
    it('should return the created product', async function () {
      sinon.stub(pool, 'query').resolves([{ insertId: 1 }]);
      const product = await Product.create('Martelo de Thor');
      expect(product).to.be.an('object');
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
    });
  });

  describe('update', function () {
    it('should return the updated product', async function () {
      sinon.stub(pool, 'query').resolves([]);
      const product = await Product.update(1, 'Martelo de Thor');
      expect(product).to.be.an('object');
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
    });
  });
});