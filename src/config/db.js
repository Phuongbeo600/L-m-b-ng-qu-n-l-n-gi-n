const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
});

pool.getConnection()
    .then(connection => {
        console.log("Kết nối thành công tới MySQL Database rồi nhé!");
        connection.release();
    })
    .catch(err => {
        console.error("Kết nối thất bại! Kiểm tra lại mật khẩu hoặc tên database:", err.message)
    });
module.exports = pool;
