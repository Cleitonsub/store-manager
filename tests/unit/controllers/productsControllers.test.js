const sinon = require('sinon');
const { expect } = require('chai');
const productController = require('../../../controllers/products');
const productService = require('../../../services/products');

const mockProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const mockProduct = { id: 1, name: 'Martelo de Thor' };

const mockInvalidId = { message: "Product not found" }

describe('Teste ao chamar o controller de products', () => {
  describe('Quando é solicitado todos os produtos', () => {
    const req = {};
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getAll').resolves(mockProducts);
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
      expect(res.json.calledWith(mockProducts)).to.be.equal(true);
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

      sinon.stub(productService, 'getById').resolves(mockProduct);
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
      expect(res.json.calledWith(mockProduct)).to.be.equal(true);
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
});
