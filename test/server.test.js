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

describe('POST /login', () => {
  it('should login user and return token', (done) => {
    const loginInfo = { username: 'yellowleopard753', password: 'jonjon' };
    chai
      .request(server)
      .post('/login')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have(200);
        res.body.should.be.an('object');
        res.body.should.have.property('token');
        done();
      });
  });
});

describe('Cart', () => {});
