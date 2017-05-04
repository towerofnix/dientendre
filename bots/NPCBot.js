const BaseBot = require('./BaseBot')

module.exports = class NPCBot extends BaseBot {
  constructor(name) {
    super()

    this.name = name.toString()
    this.location = 'bot-testing'

    this.client.on('message', message => {
      // NPCs should only be able to talk to people that are in the same
      // location! - That is, channel.
      if (message.channel.name !== this.location) {
        return
      }

      if (message.content.startsWith('.talk ')) {
        const who = message.content.slice(6)

        if (who.toLowerCase() === this.name.toLowerCase()) {
          message.reply('Hrmph.')
        }
      }
    })
  }
}
