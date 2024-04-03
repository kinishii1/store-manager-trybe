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
const ProductsController = require('../../../src/controllers/ProductsController');
const { productsMock, productMock } = require('../../mocks/ProductMocks');

describe('ProductsController', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('getAllProducts', function () {
    it('should return all products', async function () {
      sinon.stub(ProductService, 'getAllProducts').resolves(productsMock);

      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.getAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return a 404 status when there are no products', async function () {
      sinon.stub(ProductService, 'getAllProducts').resolves(null);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.getAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('getProductById', function () {
    it('should return a product', async function () {
      sinon.stub(ProductService, 'getProductById').resolves(productMock);
      
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('should return a 404 status when the product is not found', async function () {
      sinon.stub(ProductService, 'getProductById').resolves(null);
      
      const req = {
        params: {
          id: 1,
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('createProduct', function () {
    it('should create a product', async function () {
      sinon.stub(ProductService, 'createProduct').resolves(productMock);

      const req = {
        body: {
          name: 'Martelo de Thor',
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
  });

  describe('updateProduct', function () {
    it('should update a product', async function () {
      sinon.stub(ProductService, 'updateProduct').resolves(productMock);

      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'Martelo de Thor',
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return a 404 status when the product is not found', async function () {
      sinon.stub(ProductService, 'updateProduct').throws(new Error('Product not found'));

      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'Martelo de Thor',
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('searchProduct', function () {
    it('should return a product', async function () {
      sinon.stub(ProductService, 'searchProduct').resolves(productsMock);

      const req = {
        query: {
          q: 'Martelo',
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.searchProduct(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return a 404 status when the product is not found', async function () {
      sinon.stub(ProductService, 'searchProduct').resolves(null);

      const req = {
        query: {
          q: 'Martelo',
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ProductsController.searchProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });
});