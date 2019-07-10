const express = require('express');
const Book = require('../model/book');
const bookRepository = require('../repository/bookRepository');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/books/',
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File extension does not match. select only jpeg or png extension file'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const router = express.Router();

router.get("/", (req, res, next) => {
    bookRepository.getBooks(req, res);
});

router.post("/", (req, res, next) => {
    bookRepository.postBook(req, res);
});

router.post("/bookwithimage", upload.single('bookImage'), (req, res, next) => {
    console.log('Upload book with image');
    console.log('book image file : ', req.file);
    
    //set image filename and dest path in db
    req.body.bookImagePath = req.file.destination;
    req.body.bookImageName = req.file.filename;
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