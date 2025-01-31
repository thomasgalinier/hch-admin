import { test, expect } from '@playwright/test';
//
// test('has title', async ({ page }) => {
//     await page.goto('https://playwright.dev/');
//
//     // Expect a title "to contain" a substring.
//     await expect(page).toHaveTitle(/Playwright/);
// });
//
// test('get started link', async ({ page }) => {
//     await page.goto('https://playwright.dev/');
//
//     // Click the get started link.
//     await page.getByRole('link', { name: 'Get started' }).click();
//
//     // Expects page to have a heading with the name of Installation.
//     await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('verifier la connexion', async ({ page}) => {
    await page.route('**localhost:8081/auth/signin', async (route) => {

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Connexion réussie' }),
        });
    });
    await page.goto('/auth/signin');
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('admin');
    await page.getByRole('button', { name: 'Connexion' }).click();
    await expect(page).toHaveURL('/dashboard');
})

test('verifier la deconnexion', async ({ page}) => {
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
    await page.context().addCookies([
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

    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'admin.admin' }).click();
    await page.getByRole('menuitem', { name: 'Déconnexion' }).click();
    await expect(page).toHaveURL('/auth/signin');
})