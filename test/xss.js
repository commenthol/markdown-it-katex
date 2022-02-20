const assert = require('assert')
const mdk = require('../index')
const md = require('markdown-it')().use(mdk)

describe('xss', function () {
  it('shall not be prone to XSS', function () {
    const expected = '<p>$&lt;img src=a onerror=alert(12)&gt;%&gt;</p>\n'
    const actual = md.render('$<img src=a onerror=alert(12)>%>')

    assert.strictEqual(actual, expected)
  })

  it('shall not be prone to XSS 2', function () {
    const expected = '<p>\\unicode{&lt;img src=x onerror=alert(1)&gt;}</p>\n'
    const actual = md.render('$\\unicode{<img src=x onerror=alert(1)>}$')

    assert.strictEqual(actual, expected)
  })
})
