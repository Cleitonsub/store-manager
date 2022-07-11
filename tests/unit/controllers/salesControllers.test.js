const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../controllers/sales');
const salesService = require('../../../services/sales');

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
const mockInvalidId = { message: "Sale not found" };

describe('Teste ao chamar o controller de sales', () => {
  describe('Quando é solicitado todas as vendas', () => {
    const req = {};
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(mockAllSales);
    });

    after(() => {
      salesService.getAll.restore();
    });


    it('é chamado o status com o código 200', async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });



    it('é chamado o json com todos os produtos da venda', async () => {
      await salesController.getAll(req, res);
      expect(res.json.calledWith(mockAllSales)).to.be.equal(true);
    });
  });

  describe('Quando é solicitado uma venda pelo id válido', () => {
    const req = {};
    const res = {};

    before(() => {
      req.params = {
        id: 1,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(mockAllSales[0]);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com os produtos da venda', async () => {
      await salesController.getById(req, res);
      expect(res.json.calledWith(mockAllSales[0])).to.be.equal(true);
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

      sinon.stub(salesService, 'getById').resolves(false);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com o produto', async () => {
      await salesController.getById(req, res);
      expect(res.json.calledWith(mockInvalidId)).to.be.equal(true);
    });
  });
});


