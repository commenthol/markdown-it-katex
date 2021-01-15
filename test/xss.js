var tape = require('tape');
var mdk = require('../index');
var md = require('markdown-it')().use(mdk);

tape('shall not be prone to XSS', function(t){
  t.plan(1);

  var expected = '<p>$&lt;img src=a onerror=alert(12)&gt;%&gt;</p>\n',
    actual = md.render('$<img src=a onerror=alert(12)>%>');

  t.equals(actual, expected);
});


tape('shall not be prone to XSS 2', function(t){
  t.plan(1);

  var expected = '<p>unicodeimg srcx onerroralert1</p>\n',
    actual = md.render('$\\unicode{<img src=x onerror=alert(1)>}$');

  t.equals(actual, expected);

});
