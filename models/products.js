const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM products ORDER BY id;',
  );
  return rows;
};

const getById = async (id) => {
  const [[row]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return row;
};

const addProduct = async (name) => {
  const [row] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  
  return {
    id: row.insertId,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  addProduct,
};
