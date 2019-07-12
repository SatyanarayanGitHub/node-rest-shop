//During the test the env variable is set to test
process.env.NODE_ENV = 'testing';

let Product = require('../api/model/product');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

const product = require('../api/routes/products');


chai.use(chaiHttp);


describe('Unit test cases - Product', () => {

    before((done) => {
        console.log("==================== Before ====================");
        Product.deleteMany({}, (err) => {
            done();
        });
    });

    after((done => {
        console.log("==================== After ====================");
        done();
    }));



});