const staffQueries = {
  getAllStaff: 'SELECT * FROM staff WHERE is_active = 1',
  getById: 'SELECT * FROM staff WHERE id = ? AND is_active = 1',
  create: 'INSERT INTO staff (first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  update: 'UPDATE staff SET first_name = ?, last_name = ?, birth_date = ?, gender = ?, phone_number = ?, email = ?, address = ?, is_active = ?, user_id = ? WHERE id = ?',
  delete: 'UPDATE staff SET is_active = 0 WHERE id = ?'
};

module.exports = { staffQueries };