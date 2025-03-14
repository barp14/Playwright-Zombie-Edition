const { test } = require ('../support/')

test('login administrador', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', 'pwd123')
  await page.movies.isLoggedIn()
})

test('senha incorreta', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', 'abc123')
  await page.toast.haveText(/Oops!/)
})

test('email inválido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('joaobarp.com.br', 'pwd123')
  await page.login.alertHaveText('Email incorreto')
})

test('email não preenchido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('', 'pwd123')
  await page.login.alertHaveText('Campo obrigatório')
})

test('senha não preenchida', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', '')
  await page.login.alertHaveText('Campo obrigatório')
})

test('nenhum campo preenchido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('', '')
  await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})