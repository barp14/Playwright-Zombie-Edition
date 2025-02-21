// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click(); // barras são 'contains'

  // await page.locator('#name').fill('João Barp');
  // await page.locator('#email').fill('joaobarpy@gmail.com');
  // input[name=name], input[placeholder="Seu nome completo"]

  await expect( // checkpoint
    page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Informe seu nome').fill('João Barp');
  await page.getByPlaceholder('Informe seu email').fill('joaobarpy@gmail.com');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(message); // a classe modal.html foi utilizada para encontrar a classe toast do elemento flutuante pois é um elemento temporário

  await expect(
    page.locator('.toast')).toBeHidden({timeout: 5000}); // garantindo que o elemento flutuante aparece e desaparece em no maximo 5seg
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click(); // barras são 'contains'

  await expect( // checkpoint
    page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Informe seu nome').fill('João Barp');
  await page.getByPlaceholder('Informe seu email').fill('joaobarp.com.br');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Email incorreto');
});

test('não deve cadastrar sem nome preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click(); // barras são 'contains'

  await expect( // checkpoint
    page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Informe seu email').fill('joaobarpy@gmail.com');
    
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('não deve cadastrar sem email preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click(); // barras são 'contains'

  await expect( // checkpoint
    page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera');

    await page.getByPlaceholder('Informe seu nome').fill('João Barp');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');
});

test('não deve cadastrar sem nenhum campo preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click(); // barras são 'contains'

  await expect( // checkpoint
    page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório', 
    'Campo obrigatório'
  ]); // validando dois elementos com um array
});
