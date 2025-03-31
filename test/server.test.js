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

describe('Auth Middleware', () => {
  let token;

  before((done) => {
    chai
      .request(server)
      .post('/login')
      .send({ username: 'lazywolf342', password: 'tucker'})
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should allow access with a valid token', (done) => {
    chai
      .request(server)
      .get('/test-auth')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Authenticated');
        res.body.should.have.property('username').eql('lazywolf342');
        done();
      });
  });

  it('should return 401 with no token', (done) => {
    chai
      .request(server)
      .get('/test-auth')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error').eql('No token provided');
        done();
      });
  });

  it('should return 401 with an invalid token', (done) => {
    chai
      .request(server)
      .get('/test-auth')
      .set('Authorization', 'Bearer invalidtoken123')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Token invalid or expired');
        done();
    });
  });
});
