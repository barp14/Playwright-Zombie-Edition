// @ts-check
import { expect, test } from '@playwright/test'
import { LandingPage } from '../pages/LandingPage'
import { Toast } from '../pages/Components'
import { faker } from '@faker-js/faker';

let landingPage
let toast

test.beforeEach(({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('cadastro lead', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)
  await toast.haveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')
})

test('email existente', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', { // consumindo API
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)
  await toast.haveText('O endereço de e-mail fornecido já está registrado em nossa fila de espera.')
})

test('email incorreto', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('João Barp', 'joaobarp.com.br')

  await landingPage.alertHaveText('Email incorreto')
})

test('nome não preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'joaobarpy@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')
})

test('email não preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('João Barp', '')

  await landingPage.alertHaveText('Campo obrigatório')
})

test('nenhum campo preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório', 
    'Campo obrigatório'
  ]) // validando dois elementos com um array
})
