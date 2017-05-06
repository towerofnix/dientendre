const baseCommand = require('./baseCommand')

module.exports = Object.assign(Object.create(baseCommand), {
  name: 'ping',

  call(util) {
    util.message.reply("Pong!")
  }
})
