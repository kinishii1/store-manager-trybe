const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const { describe, it } = mocha;
const { expect } = chai;

const ProductService = require('../../../src/services/ProductsService');
const Product = require('../../../src/models/Product');
const { productsMock, productMock } = require('../../mocks/ProductMocks');

describe('Product Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('getAllProducts', function () {
    it('should return all products', async function () {
      sinon.stub(Product, 'findAll').resolves(productsMock);

      const products = await ProductService.getAllProducts();
      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(2);
    });
  });

  describe('getProductById', function () {
    it('should return a product', async function () {
      sinon.stub(Product, 'findById').resolves(productMock);
      const product = await ProductService.getProductById(1);
      expect(product).to.be.an('object');
    });

    it('should return null', async function () {
      sinon.stub(Product, 'findById').resolves(null);
      const product = await Product.findById(1);
      expect(product).to.equal(null);
    });
  });

  describe('createProduct', function () {
    it('should create a product', async function () {
      sinon.stub(Product, 'create').resolves(productMock);
      const product = await ProductService.createProduct('Martelo de Thor');
      expect(product).to.be.an('object');
    });
  });

  describe('deleteProduct', function () {
    it('should delete a product', async function () {
      sinon.stub(Product, 'findById').resolves(productMock);
      sinon.stub(Product, 'deleteFromDB').resolves();
      await ProductService.deleteProduct(1);
    });

    it('should throw an error', async function () {
      sinon.stub(Product, 'findById').resolves(null);
      try {
        await ProductService.deleteProduct(1);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('updateProduct', function () {
    it('should update a product', async function () {
      sinon.stub(Product, 'findById').resolves(productMock);
      sinon.stub(Product, 'update').resolves(productMock);
      const product = await ProductService.updateProduct(1, 'Martelo de Thor');
      expect(product).to.be.an('object');
    });

    it('should throw an error', async function () {
      sinon.stub(Product, 'findById').resolves(null);
      try {
        await ProductService.updateProduct(1, 'Martelo de Thor');
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('searchProduct', function () {
    it('should return products', async function () {
      sinon.stub(Product, 'findAll').resolves(productsMock);
      const products = await ProductService.searchProduct('Martelo');
      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(1);
    });

    it('should return an empty array', async function () {
      sinon.stub(Product, 'findAll').resolves(productsMock);
      const products = await ProductService.searchProduct('acxzcxzasd');
      expect(products).to.be.an('array');
      expect(products).to.have.lengthOf(0);
    });
  });
});