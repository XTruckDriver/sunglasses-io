const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/server'); // Adjust the path as needed

const should = chai.should();
chai.use(chaiHttp);

// TODO: Write tests for the server

describe('/GET brands', () => {
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

describe('/GET brands/:id/products', () => {
  it('should return array of products for a given brand', (done) => {
    const targetId = brands[0].id;

    chai
      .request(server)
      .get(`brands/${targetId}/products`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.every(product => product.id === targetId).should.be.true;
        done();
      });
    
  });
});

describe('Login', () => {});

describe('Cart', () => {});
