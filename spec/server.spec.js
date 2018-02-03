import babelPolyfill from 'babel-polyfill';
import { expect, assert, should } from 'chai';
import axios from 'axios';
import src from '../src/index.js';

// Possible helper function to code:
// const postAircraft = (body, done) => {
//     axios.post('http://127.0.0.1:3000/enqueue', body)
//       .then(res => { response = res; })
//       .then(() => done())
//       .catch(err => done(err));
//   };

describe('Server GET tests', function() {
  let response;
  before((done) => {
    axios.get('http://127.0.0.1:3000')
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('should respond to GET with 200 status', () => {
    expect(response.status).to.equal(200);
  });
  it('response data should be a string', () => {
    expect(response.data).to.be.a('string');
  });
  it('response data should contain an app tag', () => {
    const app = response.data.includes('app')
    expect(app).to.be.true;
  });
});

describe('Server GET/start tests', function() {
  let response;
  before((done) => {
    axios.get('http://127.0.0.1:3000/start')
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('should respond to GET with 200 status', () => {
    expect(response.status).to.equal(200);
  });
  it('response data should contain an initiation message', () => {
    expect(response.data).to.exist;
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(0);
    expect(response.data.second.length).to.equal(0);
    expect(response.data.third.length).to.equal(0);
    expect(response.data.fourth.length).to.equal(0);
  });
});

describe('Server POST/enqueue basic tests', function() {
  let response;

  before((done) => {
    axios.get('http://127.0.0.1:3000/start')
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  let body = {'aircraftType': 'P', 'aircraftSize': 'L', 'aircraftId': '123ABC'};
  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('should respond to POST with 201 status', () => {
    expect(response.status).to.equal(201);
  });
  it('response data should be an object', () => {
    expect(response.data).to.be.a('object');
  });
  it('response data should contain 1 valid PL aircraft', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(0);
    expect(response.data.third.length).to.equal(0);
    expect(response.data.fourth.length).to.equal(0);
  });
});

describe('Server POST/enqueue bad aircraftType test', function() {
  let response;
  let body = {'aircraftType': 'X', 'aircraftSize': 'L', 'aircraftId': '12ASD1'};

  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('response data should not contain aircraftType X', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(0);
    expect(response.data.third.length).to.equal(0);
    expect(response.data.fourth.length).to.equal(0);
  });

  body = {'aircraftType': '1', 'aircraftSize': 'L', 'aircraftId': '12ASD1'};

  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('response data should not contain aircraftType 1', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(0);
    expect(response.data.third.length).to.equal(0);
    expect(response.data.fourth.length).to.equal(0);
  });
});

describe('Server POST/enqueue bad aircraftSize test', function() {
  let response;
  let body = {'aircraftType': 'P', 'aircraftSize': 'M', 'aircraftId': '12ASD1'};

  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('response data should not contain aircraftSize M', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(0);
    expect(response.data.third.length).to.equal(0);
    expect(response.data.fourth.length).to.equal(0);
  });

  body = {'aircraftType': 'P', 'aircraftSize': '2', 'aircraftId': '12ASD1'};

  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('response data should not contain aircraftSize 2', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(0);
    expect(response.data.third.length).to.equal(0);
    expect(response.data.fourth.length).to.equal(0);
  });
});

describe('Server POST/enqueue 2 valid (PL, CL) aircraft test', function() {
  let response;
  let body = {'aircraftType': 'C', 'aircraftSize': 'L', 'aircraftId': '456DEF'};

  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('response data should contain 2 aircraft', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(0);
    expect(response.data.third.length).to.equal(1);
    expect(response.data.fourth.length).to.equal(0);
  });
});

describe('Server POST/enqueue 3 aircraft test', function() {
  let response;
  let body = {'aircraftType': 'C', 'aircraftSize': 'S', 'aircraftId': '789GHJ'};

  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('response data should contain 3 valid (PL, CL, CS) aircraft', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(0);
    expect(response.data.third.length).to.equal(1);
    expect(response.data.fourth.length).to.equal(1);
  });
});

describe('Server POST/enqueue 4 aircraft test', function() {
  let response;
  let body = {'aircraftType': 'P', 'aircraftSize': 'S', 'aircraftId': '789GHJ'};

  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(res => { response = res; })
      .then(() => done())
      .catch(err => done(err));
  });

  it('response data should contain 4 valid (PL, CL, CS, PS) aircraft', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(1);
    expect(response.data.third.length).to.equal(1);
    expect(response.data.fourth.length).to.equal(1);
  });
});


xdescribe('Server POST/enqueue bad aircraftId test', function() {
  let response;
  let body = {'aircraftType': 'P', 'aircraftSize': 'S', 'aircraftId': []};

  before((done) => {
    axios.post('http://127.0.0.1:3000/enqueue', body)
      .then(err => { response = err; })
      .catch(err => done(err));
  });

  it('should respond to POST with 503 status', () => {
    expect(response.status).to.equal(503);
  });
  it('response data should only contain 4 valid (PL, CL, CS, PS) aircraft', () => {
    expect(response.data).to.be.an('object');
    expect(response.data.first.length).to.equal(1);
    expect(response.data.second.length).to.equal(1);
    expect(response.data.third.length).to.equal(1);
    expect(response.data.fourth.length).to.equal(1);
  });
});