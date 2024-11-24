const usersQueries={
    getAll: 'SELECT * FROM users WHERE is_active = 1',
    getById: 'SELECT * FROM users WHERE id = ? AND is_active = 1',
    getByUsername: 'SELECT * FROM users WHERE username = ?',
    create: 'INSERT INTO users (username, password, email) VALUES (?,?,?)',
    update: 'UPDATE users SET username = ? WHERE id = ?',
    delete: "DELETE FROM users WHERE id = ?",
};

module.exports = {usersQueries};