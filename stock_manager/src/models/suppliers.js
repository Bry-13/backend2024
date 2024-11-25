const suppliersQueries={
    getAllSupp: 'SELECT * FROM suppliers WHERE is_active = ?',
    getByRfc: 'SELECT * FROM suppliers WHERE rfc = ? AND is_active = 1',
    create: 'INSERT INTO suppliers (rfc, name, description, phone_number, email, address, is_active) VALUES (?,?,?,?,?,?,?)',
    updateByRfc: 'UPDATE suppliers SET name = ?, description = ?, phone_number = ?, email = ?, address = ?, is_active = ? WHERE rfc = ?',
    deleteSupp: 'DELETE FROM suppliers WHERE rfc = ?'
};
module.exports = {suppliersQueries};