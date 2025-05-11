import { expect } from '@playwright/test';
import {test} from "@/playwright/setup-test";
//

test('verifier la deconnexion', async ({ page}) => {
    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'admin.admin' }).click();
    await page.getByRole('menuitem', { name: 'Déconnexion' }).click();
    await expect(page).toHaveURL('/auth/signin');
})