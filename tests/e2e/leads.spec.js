const { expect, test } = require ('../support/')
const { faker } = require ('@faker-js/faker')

test('cadastro lead', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  await page.toast.haveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')
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

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  await page.toast.haveText('O endereço de e-mail fornecido já está registrado em nossa fila de espera.')
})

test('email incorreto', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('João Barp', 'joaobarp.com.br')

  await page.leads.alertHaveText('Email incorreto')
})

test('nome não preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'joaobarpy@gmail.com')

  await page.leads.alertHaveText('Campo obrigatório')
})

test('email não preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('João Barp', '')

  await page.leads.alertHaveText('Campo obrigatório')
})

test('nenhum campo preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  await page.leads.alertHaveText([
    'Campo obrigatório', 
    'Campo obrigatório'
  ]) // validando dois elementos com um array
})
