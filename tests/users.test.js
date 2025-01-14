import { connection } from "mongoose";
import supertest from "supertest";
import app from "./app-test";
const api = supertest(app);
import { deleteMany } from "../models/userModel";

beforeAll(async () => {
  await deleteMany({});
});

describe('User Routes', () => {

  describe('POST /api/users/signup', () => {
    it('should signup a new user with valid credentials', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'R3g5T7#gh',
        name:"sami"
      };

      // Act
      const response = await api
        .post('/api/users/signup')
        .send(userData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error with invalid credentials', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'invalidpassword'
      };

      // Act
      const response = await api
        .post('/api/users/signup')
        .send(userData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user with valid credentials', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'R3g5T7#gh'
      };

      // Act
      const response = await api
        .post('/api/users/login')
        .send(userData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error with invalid credentials', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'invalidpassword'
      };

      // Act
      const response = await api
        .post('/api/users/login')
        .send(userData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});

afterAll(() => {
  connection.close();
});