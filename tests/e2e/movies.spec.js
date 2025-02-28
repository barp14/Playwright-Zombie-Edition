const { test } = require ('@playwright/test')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

import { LoginPage } from '../pages/LoginPage'
import { MoviesPage } from '../pages/MoviesPage'
import { Toast } from '../pages/Components'


let loginPage
let moviesPage
let toast

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page)
  moviesPage = new MoviesPage(page)
  toast = new Toast(page)
})

test('cadastrar novo filme', async ({ page }) => {
  const movie = data.create
  await executeSQL(`DELETE from public.movies WHERE title = '${movie.title}';`)

  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()

  await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

  await toast.haveText(/Uhull/)
})