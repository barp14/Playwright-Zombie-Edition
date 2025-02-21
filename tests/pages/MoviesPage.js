import { expect } from '@playwright/test'

export class MoviesPage {

  constructor(page) {
    this.page = page
  }
  async isLoggedIn() {
    await this.page.waitForLoadState('networkidle') // aguarda até que todo tráfico de rede seja finalizado
    await expect(this.page).toHaveURL(/.*admin/) // expressão regular verificando se existe o texto 'admin' na URL
  }

}