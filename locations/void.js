const fixWS = require('fix-whitespace')

module.exports = {
  entryText: [ '@user suddenly appeared.', '@user appeared.', 'Pop.' ],
  exitText:  [ '@user left.', '@user popped out of existence',
               '@user faded away.' ],

  name: 'The Void',
  image: 'http://pre07.deviantart.net/b3dc/th/pre/f/2010/013/c/2/void_space_by_maandersen.jpg',
  description: fixWS`
    There's nothing here.
    `
}
