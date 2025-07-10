const pactum = require('pactum');
const { baseUrl } = require('../config');

module.exports = {
  getAllUsers() {
    return pactum.spec().get(`${baseUrl}/usuarios`);
  },

  createUser(user) {
    return pactum.spec().post(`${baseUrl}/usuarios`).withJson(user);
  },

  getUserById(id) {
    return pactum.spec().get(`${baseUrl}/usuarios/${id}`);
  },

  updateUser(id, user) {
    return pactum.spec().put(`${baseUrl}/usuarios/${id}`).withJson(user);
  },

  deleteUser(id) {
    return pactum.spec().delete(`${baseUrl}/usuarios/${id}`);
  }
};