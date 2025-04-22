import {test} from "@/playwright/setup-test";
import { expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/dashboard/produits/create');
  await page.getByLabel('Nom').fill('test');
  await page.getByRole('textbox', {name: 'Nom'}).click();
  await page.getByRole('textbox', {name: 'Nom'}).fill('test');
  await page.getByRole('textbox', {name: 'Description'}).click();
  await page.getByRole('textbox', {name: 'Description'}).fill('test description');
  await page.getByRole('combobox', {name: 'Catégorie'}).click();
  await page.getByRole('option', {name: 'entretien'}).click();
  await page.getByRole('spinbutton', {name: 'Prix'}).click();
  await page.getByRole('spinbutton', {name: 'Prix'}).press('ArrowLeft');
  await page.getByRole('spinbutton', {name: 'Prix'}).fill('10');
  await page.getByRole('spinbutton', {name: 'Quantité'}).click();
  await page.getByRole('spinbutton', {name: 'Quantité'}).press('ArrowLeft');
  await page.getByRole('spinbutton', {name: 'Quantité'}).fill('100');
  await page.getByRole('button', {name: 'Créer le produit aditionel'}).click();
   await page.route('**/produit/create', async (route) => {
     route.fulfill(
         {
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              id: '123456',
              nom: 'test',
              description: 'test description',
              categorie: 'entretien',
              prix: 10,
              quantite: 100,
            }),
         }
     )
   })
    await expect(page.getByText('Produit crée avec succés')).toBeVisible();
});