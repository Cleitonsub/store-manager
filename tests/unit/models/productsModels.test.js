const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/products');
const connection = require('../../../helpers/connection');
const {
  allProductsResponse,
  rightProductBody,
  productCreateResponse,
  productSearchNameResponse
} = require('../../../__tests__/_dataMock');

describe('Teste ao chamar o model de products', () => {
  describe('Quando é solicitado todos os produtos', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    });

    after(() => {
      connection.execute.restore();
    });
    it('retorna um array com todos os produtos', async () => {
      const res = await productModel.getAll();
      // .deep para comparar objetos encontrado em pesquisa no stackoverflow, link:
      // https://stackoverflow.com/questions/38497731/mocha-chai-uncaught-assertionerror-expected-to-equal-expected-actua
      expect(res).to.be.deep.equal(allProductsResponse);
    });
  });

  describe('Quando é solicitado um produto pelo id', () => {
    it('é chamado com um id válido', async () => {
      sinon.stub(productModel, 'getById').resolves(allProductsResponse[0]);
      const res = await productModel.getById(1);
      expect(res).to.be.deep.equal(productSearchNameResponse[0]);
      productModel.getById.restore();
    });

    it('é chamado com um id inválido', async () => {
      const res = await productModel.getById(548);
      expect(res).to.be.undefined;
    });
  });

  describe('Quando é solicitado criar um novo produto', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    });
    after(() => {
      connection.execute.restore();
    })
    it('com nome válido', async () => {
      const res = await productModel.addProduct(rightProductBody.name);
      expect(res).to.be.deep.equal(productCreateResponse);
    });
  });
});