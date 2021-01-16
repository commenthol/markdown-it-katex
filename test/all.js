const path = require('path')
const tape = require('tape')
const testLoad = require('markdown-it-testgen').load
const mdk = require('../index')

const md = require('markdown-it')()
  .use(mdk)

/* this uses the markdown-it-testgen module to automatically generate tests
   based on an easy to read text file
 */
testLoad(path.join(__dirname, 'fixtures/default.txt'), function (data) {
  data.fixtures.forEach(function (fixture) {
    /* generic test definition code using tape */
    tape(fixture.header, function (t) {
      t.plan(1)

      const expected = fixture.second.text
      const actual = md.render(fixture.first.text)

      t.equals(actual, expected)
    })
  })
})

require('./xss')
