const { expect } = require ('@playwright/test')

export class MoviesPage {

  constructor(page) {
    this.page = page
  }

  async isLoggedIn() {
    await this.page.waitForLoadState('networkidle') // aguarda até que todo tráfico de rede seja finalizado
    await expect(this.page).toHaveURL(/.*admin/) // expressão regular verificando se existe o texto 'admin' na URL
  }

  async create(title, overview, company, release_year) {
    await this.page.locator('a[href*="register"]').click()

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

    await this.page.getByRole('button', {name: 'Cadastrar'}).click()
  }
}