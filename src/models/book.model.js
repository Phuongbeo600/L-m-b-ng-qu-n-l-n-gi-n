const pool = require('../config/db');

exports.getAll = async () => {
    const [rows] = await pool.query(
        "SELECT id, author, title FROM books ORDER BY id DESC"
    );
    return rows;
};

exports.create = async ({ author, title }) => {
    const [result] = await pool.query(
        "INSERT INTO books (author, title) VALUE (?, ?)",
        [author, title]
    );
    return {
        id: result.insertId,
        author,
        title
    };
};

exports.remove = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM books WHERE id = ?",
    );
    return result.affectedRows > 0;
};
