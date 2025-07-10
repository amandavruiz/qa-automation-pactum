const { expect } = require('chai');
const {
  userCreateSchema,
  userListSchema,
  userByIdSchema,
  userDeleteSchema,
  userUpdateSchema
} = require('../../src/schemas/userSchema');

const userService = require('../../src/services/userService');
const { generateRandomEmail } = require('../../src/helpers/randomData');

describe('Users API', () => {
  let userId;
  let createdUser;

  // Arrange
  before(async () => {
    createdUser = {
      nome: 'Usuário Teste',
      email: generateRandomEmail(),
      password: '123456',
      administrador: 'true'
    };
    const response = await userService.createUser(createdUser).expectStatus(201);
    userId = response.json._id;
  });

  it('POST /usuarios - deve criar um novo usuário com sucesso e validar o contrato', async () => {
    // Arrange
    const newUser = {
      nome: 'Novo Usuário',
      email: generateRandomEmail(),
      password: 'abcdef',
      administrador: 'false'
    };

    // Act
    const response = await userService.createUser(newUser).expectStatus(201);

    // Assert
    expect(response.json.message).to.equal('Cadastro realizado com sucesso');
    expect(response.json._id).to.be.a('string').and.not.to.be.empty;

    const validation = userCreateSchema.validate(response.json);
    expect(validation.error).to.be.undefined;
  });

  it('GET /usuarios - deve retornar a lista de usuários e validar o contrato', async () => {
    const response = await userService.getAllUsers().expectStatus(200);

    expect(response.json.quantidade).to.be.a('number');

    const validation = userListSchema.validate(response.json);
    expect(validation.error).to.be.undefined;

    const foundUser = response.json.usuarios.find((user) => user._id === userId);
    expect(foundUser).to.exist;
    expect(foundUser.nome).to.equal(createdUser.nome);
  });

  it('GET /usuarios/{_id} - deve buscar o usuário por id e validar o contrato', async () => {
    const response = await userService.getUserById(userId).expectStatus(200);

    expect(response.json._id).to.equal(userId);
    expect(response.json.nome).to.equal(createdUser.nome);
    expect(response.json.email).to.equal(createdUser.email);

    const validation = userByIdSchema.validate(response.json);
    expect(validation.error).to.be.undefined;
  });

  it('PUT /usuarios/{_id} - deve alterar o usuário por id e validar o contrato', async () => {
    const updatedUser = {
      nome: 'Usuário Alterado',
      email: generateRandomEmail(),
      password: '654321',
      administrador: 'false'
    };

    const response = await userService.updateUser(userId, updatedUser).expectStatus(200);

    expect(response.json.message).to.equal('Registro alterado com sucesso');

    const validation = userUpdateSchema.validate(response.json);
    expect(validation.error).to.be.undefined;

    const getResponse = await userService.getUserById(userId).expectStatus(200);
    expect(getResponse.json.nome).to.equal(updatedUser.nome);
    expect(getResponse.json.administrador).to.equal(updatedUser.administrador);
  });

  it('DELETE /usuarios/{_id} - deve excluir o usuário por id e validar o contrato', async () => {
    const response = await userService.deleteUser(userId).expectStatus(200);

    expect(response.json.message).to.equal('Registro excluído com sucesso');

    const validation = userDeleteSchema.validate(response.json);
    expect(validation.error).to.be.undefined;

    await userService.getUserById(userId).expectStatus(400);
  });
});