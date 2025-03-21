import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/server.js';
import User from '../src/models/UserModel.js'; 
import { validateEmail } from '../src/lib/utils.js';


let server;

beforeAll(async () => {
  const url = 'mongodb://localhost:27017/testdb';
  await mongoose.connect(url);

  await User.deleteMany({});

  server = app.listen(3001);
});

afterAll(async () => {
  await mongoose.connection.close();
  if (server) {
    server.close();
  }
});

describe('API Endpoints', () => {
  it('should return 200 for GET /api/health', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Server is running');
  });
});

describe('POST /api/auth/signup', () => {
  it('should successfully register a new user and return user details', async () => {
    const newUser = {
      fullName: 'John Does',
      email: 'johndoes@example.com',
      password: 'Password123',
    };
  
    const response = await request(app).post('/api/auth/signup').send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data'); // Check user data exists
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data.email).toBe(newUser.email);
  });

  it('should return a 400 error if the email is already taken', async () => {
    // Insert a user first
    await User.create({
      fullName: 'Tester1',
      email: 'tester1@example.com',
      password: 'Password123',
    });

    const response = await request(app).post('/api/auth/signup').send({
      fullName: 'Tester1',
      email: 'tester1@example.com',
      password: 'Password123',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email already exists');
  });

  it('should return a 400 error if required fields are missing', async () => {
    const response = await request(app).post('/api/auth/signup').send({
      fullName: '',
      email: 'missing@example.com',
      password: '',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('All fields are required');
  });

  it('should return a 400 error if email format is invalid', async () => {
    const response = await request(app).post('/api/auth/signup').send({
      fullName: 'Invalid Email',
      email: 'invalid-email',
      password: 'Password123',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid email format');
  });
});


describe('validateEmail', () => {
  it('should return true for a valid email address', () => {
    const validEmail = 'test@example.com';
    expect(validateEmail(validEmail)).toBe(true);
  });

  it('should return false for an invalid email address without @ symbol', () => {
    const invalidEmail = 'testexample.com';
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it('should return false for an invalid email address without domain', () => {
    const invalidEmail = 'test@.com';
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it('should return false for an invalid email address with spaces', () => {
    const invalidEmail = 'test @example.com';
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it('should return false for an email address with multiple @ symbols', () => {
    const invalidEmail = 'test@@example.com';
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it('should return false for an empty string', () => {
    const invalidEmail = '';
    expect(validateEmail(invalidEmail)).toBe(false);
  });
});

