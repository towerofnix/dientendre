const baseCommand = require('./baseCommand')

module.exports = Object.assign(Object.create(baseCommand), {
  name: 'ping',
  description: (
    "The command you might use if you want to see if the game server is" +
    " currently running, and/or the connection speed between you, Discord," +
    " the computer the server's running on, and back. It responds with a" +
    " quick message as soon as it sees that you sent the command."
  ),

  call(util) {
    util.message.reply("Pong!")
  }
})
