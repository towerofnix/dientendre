const BaseBot = require('./BaseBot')

module.exports = class AdminBot extends BaseBot {
  constructor() {
    super()

    this.client.on('message', msg => {
      if (msg.content.toLowerCase() === 'ping') {
        msg.reply('Pong!')
      }
    })
  }
}
