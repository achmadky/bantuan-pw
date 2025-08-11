import { test, expect, request } from '@playwright/test';

test('Success Submit Offer API', async ({}) => {
  const apiContext = await request.newContext({
    baseURL: 'https://bantuan-kita.vercel.app',
    extraHTTPHeaders: {
      'accept': '*/*',
      'content-type': 'application/json',
      'origin': 'https://bantuan-kita.vercel.app',
      'referer': 'https://bantuan-kita.vercel.app/tawarkan-bantuan',
      'user-agent': 'playwright-test',
    },
  });

  const response = await apiContext.post('/api/submit-offer', {
    data: {
      name: 'playwright-api-test',
      skill: 'Automation Testing',
      city: 'Cloud',
      phoneNumber: '0819999999999',
      paymentRange: '10000',
      description: 'automation testing using playwright backend',
    },
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.message).toContain('Penawaran bantuan berhasil dikirim');
  expect(typeof body.offerId).toBe('string');
  expect(body.offerId.length).toBeGreaterThan(0);
});
