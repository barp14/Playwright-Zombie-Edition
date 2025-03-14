const { test } = require ('../support/')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('cadastrar novo filme', async ({ page }) => {
  const movie = data.create
  await executeSQL(`DELETE from public.movies WHERE title = '${movie.title}';`)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
  await page.toast.haveText(/Uhull/)
})

test('não cadastrar sem campos obrigatórios', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.movies.goForm()
  await page.movies.submit()

  await page.movies.alertHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])
})