const tape = require('tape')
const mdk = require('../index')
const md = require('markdown-it')().use(mdk)

tape('shall not be prone to XSS', function (t) {
  t.plan(1)

  const expected = '<p>$&lt;img src=a onerror=alert(12)&gt;%&gt;</p>\n'
  const actual = md.render('$<img src=a onerror=alert(12)>%>')

  t.equals(actual, expected)
})

tape('shall not be prone to XSS 2', function (t) {
  t.plan(1)

  const expected = '<p>\\unicode{&lt;img src=x onerror=alert(1)&gt;}</p>\n'
  const actual = md.render('$\\unicode{<img src=x onerror=alert(1)>}$')

  t.equals(actual, expected)
})
