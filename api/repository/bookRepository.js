let Book = require('../model/book');

/*
 * GET /book route to retrieve all the books.
 */
function getBooks(req, res) {
    //Query the DB and if no errors, send all the books
    let query = Book.find({});
    query.exec((err, books) => {
        if (err) res.send(err);
        //If no errors, send book documents back to the client
        res.json(books);
    });
}

/*
 * POST /book to save a new book.
 */
function postBook(req, res) {
    //console.log('Create New Book');
    //console.log('req body : ', req.body);

    //Create a new book
    var newBook = new Book(req.body);

    newBook.save((err, book) => {
        if (err) {
            console.log("==>> Error ::: ", err);
            res.status(500).send(err);
        } else {
            // If no err send book document to the client
            res.status(200).json({
                success: true,
                message: 'Book added successfully!',
                book
            });
        }
    })
}

/*
 * PUT /book/:id to updatea a book given its id
 */
function updateBook(req, res) {
    try {
        Book.findById({ _id: req.params.bookId }, (err, book) => {
            if (err) throw err;

            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: 'Book not found'
                }).end();
            }

            Object.assign(book, req.body).save((err, book) => {
                if (err) throw err;
                res.json({ success: true, message: 'Book updated!', book });
            });
        });

    } catch (err) {
        console.log('==>> Exception Found :: ', err);
        throw err;
    }
}

/*
 * GET /book/:bookId route to retrieve a book given its id.
 */
function getBook(req, res) {
    Book.findById(req.params.bookId, (err, book) => {
        if (err) throw err;

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            }).end();
        }

        //If no errors, send it back to the client
        res.status(200).json({
            success: true,
            message: 'Book found!',
            book
        }).end();
    });
}

/*
 * DELETE /book/:bookId to delete a book given its id.
 */
function deleteBook(req, res) {

    Book.findById(req.params.bookId, (err, book) => {
        if (err) throw err;

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            }).end();
        }

        Book.deleteOne({ _id: req.params.bookId }, (err, result) => {
            res.json({ message: "Book successfully deleted!", result });
        });
    });
}


module.exports = {
    getBooks,
    postBook, 
    updateBook, 
    getBook, 
    deleteBook
}