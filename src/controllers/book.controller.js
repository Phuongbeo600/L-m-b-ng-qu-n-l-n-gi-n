
const bookModel = require('../models/book.model');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.getAll();
        res.json(books);
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Lỗi lấy danh sách " });
    }
};

exports.create = async (req, res) => {
    try {
        const { author, title } = req.body;

        if (!author || !title) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        }

        const newBook = await bookModel.create({ author, title });
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: " Lỗi thêm sách" });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const success = await bookModel.remove(id);

        if (!success) {
            return res.status(404).json({ message: "Không tìm thấy sách để xóa" });
        }

        res.json({ message: "Xóa thành công" });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Lỗi xóa sách" });
    }
};

exports.search = async (req, res) => {
    try {
        const keyword = req.query.q;

        if (!keyword || keyword.trim() === '') {
            const books = await bookModel.getAll();
            return res.status(200).json(books);
        }

        const books = await bookModel.search(keyword.trim());
        return res.status(200).json(books);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sách:', error);
        return res.status(500).json({
            message: 'Lỗi server khi tìm kiếm dữ liệu'
        });
    }

};