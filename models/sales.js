const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    `SELECT id AS saleId, date, product_id AS productId, quantity
    FROM StoreManager.sales AS sal
    JOIN StoreManager.sales_products AS salpr
    ON sal.id = salpr.sale_id ORDER BY id`,
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
    FROM StoreManager.sales AS sal
    JOIN StoreManager.sales_products AS salpr
    ON sal.id = salpr.sale_id WHERE id = ?
    ORDER BY id, productId`, [id],
  );
  return rows;
};

module.exports = {
  getAll,
  getById,
};
