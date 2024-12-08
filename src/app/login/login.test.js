const request = require('supertest');
const app = require('../mockApp'); // Adjust the path as necessary

// Mock the login function or use the actual implementation if available
jest.mock('../../services/auth', () => ({
  login: jest.fn((email, password) => {
    if (email !== 'existinguser@example.com') {
      throw new Error("User doesn't exist with that email");
    }
    if (password !== 'password123') {
      throw new Error('Email or password is invalid');
    }
    return { token: 'fake-jwt-token' };
  })
}));

// Test suite for login functionality
describe('POST /login', () => {
  it('should return an error message if the email does not exist', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'nonexistent@example.com', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User doesn't exist with that email");
  });

  it('should return an error message if the email is valid but the password is invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'existinguser@example.com', password: '12312' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email or password is invalid');
  });
});
