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
        [id]
    );
    return result.affectedRows > 0;
};

exports.search = async (keyword) => {
    const sql = `
    SELECT id, author, title
    FROM books
    WHERE title LIKE ? OR author LIKE ?
    ORDER BY id DESC
    `;
    const searchTerm = `%${keyword}`;

    const [rows] = await pool.query(sql, [searchTerm, searchTerm]);
    return rows;
};
