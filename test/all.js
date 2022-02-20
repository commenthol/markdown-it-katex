const fs = require('fs')
const assert = require('assert')
const path = require('path')
const testLoad = require('markdown-it-testgen').load
const mdk = require('../index')

const md = require('markdown-it')()
  .use(mdk)

const fixturesFilename = path.join(__dirname, 'fixtures/default.txt')

const writeFixtures = process.env.WRITE_FIXTURES === '1'

let out = ''
const generate = (fixture, actual) => {
  out += `
${fixture.header}
.
${fixture.first.text}.
${actual.trimEnd()}
.
`
}

/* this uses the markdown-it-testgen module to automatically generate tests
   based on an easy to read text file
 */
describe('all', function () {
  after(() => {
    if (writeFixtures) {
      fs.writeFileSync(fixturesFilename, out, 'utf8')
    }
  })

  testLoad(fixturesFilename, function (data) {
    data.fixtures.forEach(function (fixture) {
      /* generic test definition code using tape */
      it(fixture.header, function () {
        const expected = fixture.second.text
        const actual = md.render(fixture.first.text)
        writeFixtures
          ? generate(fixture, actual)
          : assert.strictEqual(actual, expected)
      })
    })
  })
})
