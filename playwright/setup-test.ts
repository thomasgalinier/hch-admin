// playwright/custom-setup-setup-test.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.route('**/auth/me', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: "cm6jy1xx30000ms79kyzygrog",
                    nom: "admin",
                    prenom: "admin",
                    email: "admin@admin.com",
                    telephone: "0466480897",
                    role: "SUPER_ADMIN",
                    createdAt: "2025-01-30T23:05:59.031Z",
                    entreprise_id: null,
                }),
            });
        });

        await use(page);
    },
});
