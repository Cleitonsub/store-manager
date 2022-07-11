const sinon = require('sinon');
const { expect } = require('chai');
const productController = require('../../../controllers/products');
const productService = require('../../../services/products');
const { allProductsResponse } = require('../../../__tests__/_dataMock');

const mockNewProduct = { id: 4, name: 'PlayStation 5' };
const mockInvalidId = { message: "Product not found" };
const mockInvalidProduct = { message: "Product name not acceptable" };

describe('Teste ao chamar o controller de products', () => {
  describe('Quando é solicitado todos os produtos', () => {
    const req = {};
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getAll').resolves(allProductsResponse);
    });

    after(() => {
      productService.getAll.restore();
    });


    it('é chamado o status com o código 200', async () => {
      await productController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });



    it('é chamado o json com todos os produtos', async () => {
      await productController.getAll(req, res);
      expect(res.json.calledWith(allProductsResponse)).to.be.equal(true);
    });
  });
    
  describe('Quando é solicitado um produto pelo id válido', () => {
    const req = {};
    const res = {};
    
    before(() => {
      req.params = {
        id: 1,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getById').resolves(allProductsResponse[0]);
    });

    after(() => {
      productService.getById.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o produto', async () => {
      await productController.getById(req, res);
      expect(res.json.calledWith(allProductsResponse[0])).to.be.equal(true);
    });
  });

  describe('Quando é solicitado um produto pelo id inválido', () => {
    const req = {};
    const res = {};

    before(() => {
      req.params = {
        id: 4,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getById').resolves(null);
    });

    after(() => {
      productService.getById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await productController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com o produto', async () => {
      await productController.getById(req, res);
      expect(res.json.calledWith(mockInvalidId)).to.be.equal(true);
    });
  });

  describe('Quando é solicitado criar um novo produto com nome válido', () => {
    const req = {};
    const res = {};

    before(() => {
      req.body = {
        name: 'Playstation',
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'addProduct').resolves(mockNewProduct);
    });

    after(() => {
      productService.addProduct.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productController.addProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com o produto', async () => {
      await productController.addProduct(req, res);
      expect(res.json.calledWith(mockNewProduct)).to.be.equal(true);
    });
  });

  describe('Quando é solicitado criar um produto com nome inválido', () => {
    const req = {};
    const res = {};
  
    before(() => {
      req.body = {
        name: 526,
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(productService, 'addProduct').resolves(null);
    });
  
    after(() => {
      productService.addProduct.restore();
    });
  
    it('é chamado o status com o código 406', async () => {
      await productController.addProduct(req, res);
      expect(res.status.calledWith(406)).to.be.equal(true);
    });
  
    it('é chamado o json com o produto', async () => {
      await productController.addProduct(req, res);
      expect(res.json.calledWith(mockInvalidProduct)).to.be.equal(true);
    });
  });
});
