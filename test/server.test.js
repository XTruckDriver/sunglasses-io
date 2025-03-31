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

describe('Cart', () => {});

