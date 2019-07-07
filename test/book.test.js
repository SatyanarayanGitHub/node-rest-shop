//During the test the env variable is set to test
process.env.NODE_ENV = 'testing';

let mongoose = require("mongoose");
let Book = require('../api/model/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Unit test cases - Books', () => {

    before((done) => {
        console.log("==================== Before ====================");
        Book.deleteMany({}, (err) => {
            done();
        });
    });

    after((done => {
        console.log("==================== After ====================");
        done();
    }));

    /*
        beforeEach((done) => {
            console.log('Any process or action before test case Start');
            //Before each test we empty the database
            Book.remove({}, (err) => {
                done();
            });
        });
    
        afterEach((done) => {
            console.log('Any process or action after test cases End');
        });
    
    */

    it('Test 1: it should GET all the books', (done) => {
        chai.request(app)
            .get('/books/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    /*
    it('Test 2: it should not POST a book without pages field', (done) => {
        let book = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954
        }
        chai.request(app)
            .post('/books')
            .send(book)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('pages');
                res.body.errors.pages.should.have.property('kind').eql('required');
                done();
            });
    });
*/
    it('Test 3: it should POST a book ', (done) => {
        let book = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954,
            pages: 1170
        }
        chai.request(app)
            .post('/books')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Book added successfully!');
                res.body.book.should.have.property('title');
                res.body.book.should.have.property('author');
                res.body.book.should.have.property('pages');
                res.body.book.should.have.property('year');
                done();
            });

    });

    it('Test 4: it should GET a book by the given id', (done) => {
        let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
        book.save((err, book) => {
            chai.request(app)
                .get('/books/' + book.id)
                // .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.book.should.have.property('title');
                    res.body.book.should.have.property('author');
                    res.body.book.should.have.property('pages');
                    res.body.book.should.have.property('year');
                    res.body.book.should.have.property('_id').eql(book.id);
                    done();
                });
        });

    });


    it('Test 5: it should UPDATE a book given the id', (done) => {
        let book = new Book({ title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778 })
        book.save((err, book) => {
            chai.request(app)
                .put('/books/' + book.id)
                .send({ title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 800 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book updated!');
                    res.body.book.should.have.property('year').eql(1950);
                    res.body.book.should.have.property('pages').eql(800);
                    done();
                });
        });
    });

    it('Test 6: it should DELETE a book given the id', (done) => {
        let book = new Book({ title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778 })
        book.save((err, book) => {
            chai.request(app)
                .delete('/books/' + book.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                    res.body.result.should.have.property('deletedCount').eql(1);
                    done();
                });
        });
    });


});