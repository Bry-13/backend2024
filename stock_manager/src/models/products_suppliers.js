const products_suppliersQueries = {
    getAll: 'SELECT * FROM products_suppliers', 
    getById: 'SELECT * FROM products_suppliers WHERE id = ?',
    getByProduct_id: 'SELECT * FROM products_suppliers WHERE product_id=?',
    create: 'INSERT INTO products_suppliers (product_id, supplier_rfc, notes) VALUES (?, ?, ?)',
    update: 'UPDATE products_suppliers SET product_id = ?, supplier_rfc = ?, notes = ? WHERE id = ?',
    delete: "DELETE FROM products_suppliers WHERE id = ?",
  };
  
  module.exports = { products_suppliersQueries };