'use strict';
require('dotenv').config();
const base64 = require('base-64');
const supertest = require('supertest');
const server = require('../src/server');
require('@code-fellows/supergoose');

const request = supertest(server.app);


describe('test server', () => {
  it('to test if its create a new user in the signing up', async () => {
    const response = await request.post('/signup').send({
      username : 'mohammad',
      password : '1234',
    });
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('mohammad');
    
  });
  it('log in as a user in the signing in', async () => {
    const user = base64.encode('mohammad:1234');
    const response = await request.post('/signin').set('Authorization', `Basic ${user}`);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('mohammad');
  });
  it(' fails to log in as an invalid user ', async () => {
    const user = base64.encode('moh:1234');
    const response = await request.post('/signin').set('Authorization', `Basic ${user}`);
    expect(response.status).toEqual(403);
   
  });
  it('fails to log in with wrong password ', async () => {
    const user = base64.encode('moh:123');
    const response = await request.post('/signin').set('Authorization', `Basic ${user}`);
    expect(response.status).toEqual(403);
    expect(response.body.password).not.toEqual('1234');
  });
 
});