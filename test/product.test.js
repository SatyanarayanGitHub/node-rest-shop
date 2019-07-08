//During the test the env variable is set to test
process.env.NODE_ENV = 'testing';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

const product = require('../api/routes/products');


chai.use(chaiHttp);


describe('Unit test cases - Product', () => {

    it('Test 1: Test hello method', (done) => {

        chai.request(app).get('/products/test/hello').end((err, res) => {
            res.should.have.status(200);
            done();            
        });
    });

});