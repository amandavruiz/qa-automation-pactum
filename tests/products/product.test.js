const { expect } = require('chai');
const {
  productCreateSchema,
  productListSchema,
  productByIdSchema,
  productUpdateSchema,
  productDeleteSchema
} = require('../../src/schemas/productSchema');

const productService = require('../../src/services/productService');
const userService = require('../../src/services/userService');
const authService = require('../../src/services/authService');
const { generateRandomEmail } = require('../../src/helpers/randomData');

describe('Products API', () => {
  let token;
  let productId;

  before(async () => {
    // Cria usuário admin
    const adminUser = {
      nome: 'Admin Produto',
      email: generateRandomEmail(),
      password: '123456',
      administrador: 'true'
    };
    await userService.createUser(adminUser).expectStatus(201);

    // Login para obter token
    const loginResponse = await authService.login({
      email: adminUser.email,
      password: adminUser.password
    }).expectStatus(200);
    token = loginResponse.json.authorization;
  });

  it('POST /produtos - deve criar um novo produto com sucesso e validar o contrato', async () => {
    const newProduct = {
      nome: 'Produto Teste',
      preco: 100,
      descricao: 'Produto de teste',
      quantidade: 10
    };

    const response = await productService.createProduct(newProduct, token).expectStatus(201);

    expect(response.json.message).to.equal('Cadastro realizado com sucesso');
    expect(response.json._id).to.be.a('string').and.not.to.be.empty;

    const validation = productCreateSchema.validate(response.json);
    expect(validation.error).to.be.undefined;

    productId = response.json._id;
  });

  it('GET /produtos - deve retornar a lista de produtos e validar o contrato', async () => {
    const response = await productService.getAllProducts().expectStatus(200);

    expect(response.json.quantidade).to.be.a('number');

    const validation = productListSchema.validate(response.json);
    expect(validation.error).to.be.undefined;

    const foundProduct = response.json.produtos.find(p => p._id === productId);
    expect(foundProduct).to.exist;
    expect(foundProduct.nome).to.equal('Produto Teste');
  });

  it('GET /produtos/{_id} - deve buscar o produto por id e validar o contrato', async () => {
    const response = await productService.getProductById(productId).expectStatus(200);

    expect(response.json._id).to.equal(productId);
    expect(response.json.nome).to.equal('Produto Teste');
    expect(response.json.preco).to.equal(100);

    const validation = productByIdSchema.validate(response.json);
    expect(validation.error).to.be.undefined;
  });

  it('PUT /produtos/{_id} - deve alterar o produto por id e validar o contrato', async () => {
    const updatedProduct = {
      nome: 'Produto Atualizado',
      preco: 150,
      descricao: 'Produto atualizado',
      quantidade: 5
    };

    const response = await productService.updateProduct(productId, updatedProduct, token).expectStatus(200);

    expect(response.json.message).to.equal('Registro alterado com sucesso');

    const validation = productUpdateSchema.validate(response.json);
    expect(validation.error).to.be.undefined;

    const getResponse = await productService.getProductById(productId).expectStatus(200);
    expect(getResponse.json.nome).to.equal(updatedProduct.nome);
    expect(getResponse.json.preco).to.equal(updatedProduct.preco);
  });

  it('DELETE /produtos/{_id} - deve excluir o produto por id e validar o contrato', async () => {
    const response = await productService.deleteProduct(productId, token).expectStatus(200);

    expect(response.json.message).to.equal('Registro excluído com sucesso');

    const validation = productDeleteSchema.validate(response.json);
    expect(validation.error).to.be.undefined;

    await productService.getProductById(productId).expectStatus(400);
  });
});