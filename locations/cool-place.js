const fixWS = require('fix-whitespace')

module.exports = {
  entryText: [ '@user entered the cool place.', '@user appeared.' ],
  exitText:  [ '@user left.', '@user left, silently.', '@user disappeared.' ],

  name: 'cool place',
  image: 'https://simpleandchicblog.files.wordpress.com/2013/09/110.jpg',
  description: fixWS`
    This is the cool place where the cool kids hang out. It's cool, right?
    `
}
