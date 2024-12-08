// Mock implementation of the auth service
module.exports = {
  login: (email, password) => {
    if (email !== 'existinguser@example.com') {
      throw new Error("User doesn't exist with that email");
    }
    return { token: 'fake-jwt-token' };
  }
};
