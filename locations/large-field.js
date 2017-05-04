const fixWS = require('fix-whitespace')

module.exports = {
  entryText: [ '@user arrived. They look tired.', '@user can be seen in the ' +
               'distance.' ],
  exitText:  [ '@user left.', '@user can\'t be seen anymore.', '@user ran off.',
             ],

  name: 'A large field',
  image: 'http://static.panoramio.com/photos/large/38047797.jpg',
  description: fixWS`
    There are many trees surrounding this large, open field. The sun is shining
    brightly.
    `
}
