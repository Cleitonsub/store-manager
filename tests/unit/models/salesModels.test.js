const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/sales');
const connection = require('../../../helpers/connection');

const mockAllSales = [
  {
    saleId: 1,
    date: "2022-07-11T12:58:27.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-07-11T12:58:27.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2022-07-11T12:58:27.000Z",
    productId: 3,
    quantity: 15
  }
];

describe('Teste ao chamar o model de sales', () => {
  describe('Quando é solicitado todos os produtos da venda', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mockAllSales]);
    });

    after(() => {
      connection.execute.restore();
    });
    it('retorna um array com todos os produtos', async () => {
      const res = await salesModel.getAll();
      // .deep para comparar objetos encontrado em pesquisa no stackoverflow, link:
      // https://stackoverflow.com/questions/38497731/mocha-chai-uncaught-assertionerror-expected-to-equal-expected-actua
      expect(res).to.be.deep.equal(mockAllSales);
    });
  });

  describe('Testa quando é solicitado uma venda pelo id', () => {
    it('é chamado com um id válido', async () => {
      sinon.stub(salesModel, 'getById').resolves(mockAllSales[2]);
      const res = await salesModel.getById(2);
      expect(res).to.be.deep.equal(mockAllSales[2]);
      salesModel.getById.restore();
    });

    it('é chamado com um id inválido', async () => {
      const res = await salesModel.getById(548);
      expect(res).to.be.a('array');
    });
  });
});
