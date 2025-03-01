import request from 'supertest';
import app from '../src/server'; // Ensure correct path

let server;

beforeAll(() => {
  // Start the server before tests
  server = app.listen(1111);
});

afterAll(() => {
  // Close the server after tests
  server.close();
});

describe('API Endpoints', () => {
  it('should return 200 for GET /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Server is running');
  });
});
