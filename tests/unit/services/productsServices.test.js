const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../services/products');
const productModel = require('../../../models/products');
const {
  allProductsResponse,
  rightProductBody,
  productCreateResponse,
} = require('../../../__tests__/_dataMock');

describe('Teste ao chamar o service de products', () => {
  describe('Quando é solicitado todos os produtos', () => {
    before(() => {
      sinon.stub(productModel, 'getAll').resolves(allProductsResponse);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('retorna um array com todos os produtos', async () => {
      const res = await productService.getAll();
      expect(res).to.be.equal(allProductsResponse);
    });
  });

  describe('Quando é solicitado um produto pelo id válido', () => {
    before(() => {
      sinon.stub(productModel, 'getById').resolves(allProductsResponse[0]);
    });

    after(() => {
      productModel.getById.restore();
    });
    it('é chamado com um id válido', async () => {
      const res = await productService.getById(1);
      expect(res).to.be.equal(allProductsResponse[0]);
    });
  });

  describe('Quando é solicitado um produto pelo id inválido', () => {
    it('é chamado com um id inválido', async () => {
      sinon.stub(productService, 'getById').resolves(null);
      const res = await productService.getById(4);
      expect(res).to.be.null;
      productService.getById.restore();
    });
  });

  describe('Quando é solicitado criar um novo produto', () => {
    before(() => {
      sinon.stub(productModel, 'addProduct').resolves(productCreateResponse);
    });

    after(() => {
      productModel.addProduct.restore();
    });
    
    it('com o nome válido', async () => {
      const res = await productService.addProduct(rightProductBody.name);
      expect(res).to.be.equal(productCreateResponse);
    });

    it('com o nome inválido', async () => {
      const res = await productService.addProduct(564);
      const res2 = await productService.addProduct(false);
      expect(res).to.be.null;
      expect(res2).to.be.null;
    });
  });
});
