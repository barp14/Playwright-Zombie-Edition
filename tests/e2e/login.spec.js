const { test } = require ('@playwright/test')
const { LoginPage } = require ('../pages/LoginPage')
const { MoviesPage } = require ('../pages/MoviesPage')
const { Toast } = require ('../pages/Components')

let loginPage
let toast
let moviesPage

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page)
  toast = new Toast(page)
  moviesPage = new MoviesPage(page)
})

test('login administrador', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()
})

test('senha incorreta', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'abc123')
  await toast.haveText(/Oops!/)
})

test('email inválido', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('joaobarp.com.br', 'pwd123')
  await loginPage.alertHaveText('Email incorreto')
})

test('email não preenchido', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('', 'pwd123')
  await loginPage.alertHaveText('Campo obrigatório')
})

test('senha não preenchida', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', '')
  await loginPage.alertHaveText('Campo obrigatório')
})

test('nenhum campo preenchido', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('', '')
  await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})