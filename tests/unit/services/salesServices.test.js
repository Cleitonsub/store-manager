const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/sales');
const salesModel = require('../../../models/sales');

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

describe('Teste ao chamar o service de sales', () => {
  describe('Quando é solicitado todos os produtos da venda', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(mockAllSales);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array com todos os produtos da venda', async () => {
      const res = await salesService.getAll();
      expect(res).to.be.equal(mockAllSales);
    });
  });

  describe('Quando é solicitado uma venda pelo id válido', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves(mockAllSales[2]);
    });

    after(() => {
      salesModel.getById.restore();
    });
    it('é chamado com um id válido', async () => {
      const res = await salesService.getById(2);
      expect(res).to.be.equal(mockAllSales[2]);
    });
  });

  describe('Quando é solicitado um produto pelo id inválido', () => {
    it('é chamado com um id inválido', async () => {
      sinon.stub(salesModel, 'getById').resolves([]);
      const res = await salesService.getById(3);
      expect(res).to.be.equal(false);
      salesModel.getById.restore();
    });
  });
});
