const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return rows;
};

const getById = async (id) => {
  const [[row]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return row;
};

const addProduct = async (name) => {
  const [row] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  
  return {
    id: row.insertId,
    name,
  };
};

const delProductById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  addProduct,
  delProductById,
};
