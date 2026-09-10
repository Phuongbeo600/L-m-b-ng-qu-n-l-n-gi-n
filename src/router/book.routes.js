const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');

router.get('/', bookController.getAllBooks);
router.post('/', bookController.create);
router.get('/search', bookController.search);
router.delete('/:id', bookController.deleteBook);

module.exports = router;

