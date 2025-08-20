import { test, expect } from '@playwright/test';
    const page = 1;
    const limit = 5;

// ----------------------
// Helpers
// ----------------------
const validatePagination = (pagination: any, page: number, limit: number) => {
  expect(pagination).toMatchObject({
    page,
    limit,
    total: expect.any(Number),
    totalPages: expect.any(Number),
    hasNext: expect.any(Boolean),
    hasPrev: expect.any(Boolean),
  });
};

const validateOffer = (offer: any) => {
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
      status: expect.any(String),
    })
  );
};

const validateBaseResponse = (body: any) => {
  expect(body).toHaveProperty('data');
  expect(body).toHaveProperty('pagination');
  expect(Array.isArray(body.data)).toBe(true);
};

// ----------------------
// Tests
// ----------------------
test.describe('Offers API', () => {
  test('Success Get Offers', async ({ request }) => {


    const response = await request.get(`/api/offers?page=${page}&limit=${limit}`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    validateBaseResponse(body);
    validatePagination(body.pagination, page, limit);

    if (body.data.length > 0) {
      validateOffer(body.data[0]);
    }
  });

  test('should fetch offers with skill filter', async ({ request }) => {

    const response = await request.get(`/api/offers?page=${page}&limit=${limit}&skill=Bersih`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    validateBaseResponse(body);
    validatePagination(body.pagination, page, limit);

    expect(body.data.length).toBeGreaterThan(0);

    const offer = body.data[0];
    validateOffer(offer);
    expect(offer.skill).toContain('Bersih'); // filter-specific check
  });

  test('should fetch offers filtered by city Surabaya', async ({ request }) => {

    const response = await request.get(`/api/offers?page=${page}&limit=${limit}&city=Surabaya`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    validateBaseResponse(body);
    validatePagination(body.pagination, page, limit);

    expect(body.data.length).toBeGreaterThan(0);

    const offer = body.data[0];
    validateOffer(offer);
    expect(offer.city).toContain('Surabaya'); // filter-specific check
  });
});
