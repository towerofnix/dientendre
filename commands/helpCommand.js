const baseCommand = require('./baseCommand')

module.exports = Object.assign(Object.create(baseCommand), {
  name: 'help',

  call(util) {
    util.message.reply(
      "Okay, here's some quick documentation to get you started:\n" +
      "\n" +
      "* .help – Presents this help message.\n" +
      "* .ping – Gets the game server to quickly respond to you. If this" +
      " doesn't work, the server is probably offline!\n" +
      "* .goto (loc) – Teleports you to another location using the power of" +
      " magic.\n" +
      "* .whereami - Tells you what your current location is."
    )
  }
})
