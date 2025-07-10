const pactum = require('pactum');
const { baseUrl } = require('../config');

module.exports = {
  login(credentials) {
    return pactum.spec().post(`${baseUrl}/login`).withJson(credentials);
  }
};