const { expect } = require('chai');
const productModel = require('../../../services/products');

const mockProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const mockProduct = { id: 1, name: 'Martelo de Thor' };

describe('Teste ao chamar o model de products', () => {
  describe('Quando é solicitado todos os produtos', () => {
    it('retorna um array com todos os produtos', async () => {
      const res = await productModel.getAll();
      // .deep para comparar objetos encontrado em pesquisa no stackoverflow, link:
      // https://stackoverflow.com/questions/38497731/mocha-chai-uncaught-assertionerror-expected-to-equal-expected-actua
      expect(res).to.be.deep.equal(mockProducts);
    });
  });

  describe('Quando é solicitado um produto pelo id', () => {
    it('é chamado com um id válido', async () => {
      const res = await productModel.getById(1);
      expect(res).to.be.deep.equal(mockProduct);
    });

    it('é chamado com um id inválido', async () => {
      const res = await productModel.getById(4);
      expect(res).to.be.null;
    });
  });
});