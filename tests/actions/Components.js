const { expect } = require ('@playwright/test')

export class Toast {

  constructor(page) {
    this.page = page
  }

  async haveText(message) {
    const toast = this.page.locator('.toast')
  
    await expect(toast).toHaveText(message) // a classe modal.html foi utilizada para encontrar a classe toast do elemento flutuante pois é um elemento temporário
      await expect(toast).not.toBeVisible({ timeout: 5000 }) // garantindo que o elemento flutuante aparece e desaparece em no maximo 5seg
      // not.toBeVisible garante que o elemento possa existir no html. o to toBeHidden garante o contrário
  }
}