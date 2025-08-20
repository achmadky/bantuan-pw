import { test, expect, request } from '@playwright/test';

test('submit removal request', async ({ request }) => {
  const response = await request.post('https://bantuan-kita.vercel.app/api/request-removal', {
    headers: {
      'accept': '*/*',
      'content-type': 'application/json',
      'origin': 'https://bantuan-kita.vercel.app',
      'referer': 'https://bantuan-kita.vercel.app/tawarkan-bantuan',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
    },
    data: {
      name: "Sita - Dummy",
      phoneNumber: "0",
      reason: "Tidak memerlukan layanan lagi"
    }
  });

  // Ensure status is OK
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  // Validate response fields
  expect(body.success).toBe(true);
  expect(body.message).toContain("Removal request submitted successfully");
});
