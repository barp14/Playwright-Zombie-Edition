const { expect } = require ('@playwright/test')

export class Movies {

  constructor(page) {
    this.page = page
  }

  async goForm() {
    await this.page.locator('a[href*="register"]').click()
  }

  async submit(){
    await this.page.getByRole('button', {name: 'Cadastrar'}).click()
  }

  async create(title, overview, company, release_year) {
    await this.goForm()

    // esse seletor via label é válido apenas a label faz referencia ao id do campo no html
    await this.page.getByLabel('Titulo do filme').fill(title)
    await this.page.getByLabel('Sinopse').fill(overview)

    await this.page.locator('#select_company_id .react-select__indicator').click()
    
    await this.page.locator('.react-select__option')
      .filter({hasText: company})
      .click()
      
    await this.page.locator('#select_year .react-select__indicator').click()
    
    await this.page.locator('.react-select__option')
      .filter({hasText: release_year})
      .click()

    await this.submit()
  }

  async alertHaveText(target) {
    await expect(this.page.locator('.alert')).toHaveText(target)
  }
}