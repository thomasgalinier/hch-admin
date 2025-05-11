// playwright/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Ajout du cookie avec le bon path
    await context.addCookies([
        {
            name: 'token',
            value: 'mocked-token',
            domain: 'localhost',
            path: '/',
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
        },
    ]);
    await page.route('**/auth/me', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                "id": "cm6jy1xx30000ms79kyzygrog",
                "nom": "admin",
                "prenom": "admin",
                "email": "admin@admin.com",
                "telephone": "0466480897",
                "role": "SUPER_ADMIN",
                "createdAt": "2025-01-30T23:05:59.031Z",
                "entreprise_id": null
            }),
        });
    });

    // Sauvegarde de l'état de la session (cookies + localStorage)
    await context.storageState({ path: path.resolve(__dirname, './.auth/admin.json') });

    await browser.close();
}

export default globalSetup;
