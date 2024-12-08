const request = require('supertest');
const app = require('../mockApp');

// Test suite for signup functionality
describe('POST /signup', () => {
  it('should return an error message if the email already exists', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ email: 'existinguser@example.com', password: 'newpassword123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists with that email');
  });
});
