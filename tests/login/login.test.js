const { expect } = require('chai');
const { credentials } = require('../../src/config');
const authService = require('../../src/services/authService');
const { loginSchema } = require('../../src/schemas/loginSchema');

describe('Login API', () => {
  it('POST /login - deve fazer login com sucesso e validar o contrato', async () => {
    const response = await authService.login(credentials).expectStatus(200);

    expect(response.json.authorization).to.be.a('string').and.not.to.be.empty;

    const validation = loginSchema.validate(response.json);
    expect(validation.error).to.be.undefined;
  });
});