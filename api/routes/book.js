const express = require('express');
const Book = require('../model/book');
const bookRepository = require('../repository/bookRepository');

const router = express.Router();

router.get("/", (req, res, next) => {
    bookRepository.getBooks(req, res);
});

router.post("/", (req, res, next) => {
    bookRepository.postBook(req, res);
});

router.put("/:bookId", (req, res, next) => {
    bookRepository.updateBook(req, res);
});

router.get("/:bookId", (req, res, next) => {
    bookRepository.getBook(req, res);
});

router.delete("/:bookId", (req, res, next) => {
    bookRepository.deleteBook(req, res);
});

module.exports = router;