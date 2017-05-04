const BaseBot = require('./BaseBot')

module.exports = class AdminBot extends BaseBot {
  constructor(game) {
    super()

    this.game = game

    this.client.on('message', msg => {
      if (msg.content.toLowerCase() === 'ping') {
        msg.reply('Pong!')
      }

      if (msg.content.toLowerCase() === '.login') {
        msg.reply('Logging in!')

        this.game.loadUser(msg.author.id)
      }
    })
  }
}
