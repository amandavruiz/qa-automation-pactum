const pactum = require('pactum');
const { baseUrl } = require('../config');

module.exports = {
  getAllProducts() {
    return pactum.spec().get(`${baseUrl}/produtos`);
  },

  getProductById(productId) {
    return pactum.spec().get(`${baseUrl}/produtos/${productId}`);
  },

  createProduct(product, token) {
    return pactum.spec()
      .post(`${baseUrl}/produtos`)
      .withHeaders('Authorization', token)
      .withJson(product);
  },

  updateProduct(productId, product, token) {
    return pactum.spec()
      .put(`${baseUrl}/produtos/${productId}`)
      .withHeaders('Authorization', token)
      .withJson(product);
  },

  deleteProduct(productId, token) {
    return pactum.spec()
      .delete(`${baseUrl}/produtos/${productId}`)
      .withHeaders('Authorization', token);
  }
};