const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/server'); // Adjust the path as needed

const should = chai.should();
chai.use(chaiHttp);

// TODO: Write tests for the server

describe('GET /brands', () => {
  it('should return an array of all brands', (done) => {
    chai
      .request(server)
      .get('/brands')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  }); 
});

describe('/GET products', () => {
  it('should return an array of ALL products from all brands', (done) => {
    chai
      .request(server)
      .get('/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  });
});

describe('/GET brands/:id/products', () => {
  it('should return array of products for a given brand', (done) => {
    
    const brandId = 1;
      
    chai
      .request(server)
      .get(`/brands/${brandId}/products`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.every(product => product.categoryId == brandId).should.be.true;
        done();
      });
    
  });
});

describe('POST /login', () => {
  it('should login user and return token', (done) => {
    const loginInfo = { username: 'lazywolf342', password: 'tucker' };
    chai
      .request(server)
      .post('/login')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('token');
        done();
      });
  });
  it('should return 401 code for invalid login', (done) => {
    const loginInfo = {
      username: 'RandomGuy',
      password: 'qwerty'
    };
    chai
      .request(server)
      .post('/login')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('error').eql('Invalid login info');
        done();
      });
  });
});


describe('Login', () => {});


describe('Cart', () => {});

