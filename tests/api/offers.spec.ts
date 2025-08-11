import { test, expect } from '@playwright/test';

test.describe('Offers API', () => {
  test('should return correct offer data structure', async ({ request }) => {
    const page = 1;
    const limit = 5;

    const response = await request.get(`/api/offers?page=${page}&limit=${limit}`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    // ✅ Validate top-level keys
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('pagination');
    expect(Array.isArray(body.data)).toBeTruthy();

    // ✅ Validate pagination object
    expect(body.pagination).toMatchObject({
      hasNext: expect.any(Boolean),
      hasPrev: expect.any(Boolean),
      limit: limit,
      page: page,
      total: expect.any(Number),
      totalPages: expect.any(Number)
    });

    // ✅ Validate first offer (if any)
    if (body.data.length > 0) {
      const offer = body.data[0];
      expect(offer).toEqual(
        expect.objectContaining({
          approvedAt: expect.any(String),
          city: expect.any(String),
          createdAt: expect.any(String),
          description: expect.any(String),
          name: expect.any(String),
          paymentRange: expect.any(String),
          phoneNumber: expect.any(String),
          skill: expect.any(String),
          status: expect.any(String)
        })
      );
    }
  });
});
