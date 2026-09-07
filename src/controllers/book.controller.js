
const bookModel = require('../models/book.model');

exports.getAllBooks = (req, res) => {
    const books = bookModel.getAll();
    res.json(books);
};

exports.create = (req, res) => {
    const newBook = bookModel.create(req.body);
    res.json({ message: " Thành công ", data: newBook });
};

exports.deleteBook = (req, res) => {
    const id = Number(req.params.id);
    const success = bookModel.remove(id);

    if (success) {
        res.json({ message: "xoá thành công !" });
    } else {
        res.status(404).json({ message: "Không tìm thấy sách để xóa!" });
    }
};