const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM products ORDER BY id;',
  );
  return rows;
};

const getById = async (id) => {
  const [[rows]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', [id],
  );
  return rows;
};

module.exports = {
  getAll,
  getById,
};
