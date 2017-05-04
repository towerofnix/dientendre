const BaseBot = require('./BaseBot')

const fixWS = require('fix-whitespace')

const { getErrorMessage } = require('../util')

module.exports = class AdminBot extends BaseBot {
  constructor(game) {
    super()

    this.game = game

    this.client.on('message', msg => {
      if (msg.content.toLowerCase() === '.ping') {
        msg.reply("Pong!")
      }

      if (msg.content.toLowerCase() === '.login') {
        msg.reply("Logging in!")

        this.game.loadUser(msg.author.id)
          .then(
            () => msg.reply("You're logged in now."),
            error => msg.reply(getErrorMessage(error, fixWS`
              Yikes, there was an error logging you in!
            `))
          )
      }

      if (msg.content.toLowerCase() === '.whereami') {
        this.game.getUser(msg.author.id)
          .then(user => {
            msg.reply(`My best guess would be *${user.location}*.`)
          })
      }

      if (msg.content.toLowerCase().startsWith('.goto ')) {
        let user

        this.game.getUser(msg.author.id)
          .then(_user => { user = _user })
          .then(() => {
            return user.goTo(msg.content.slice(6, 36), msg.guild, msg.author)
          })
          .then(
            () => user.sendMessageAtLocation(
              msg.guild, msg.author, "You're here now!"
            ),

            error => msg.reply(getErrorMessage(error, fixWS`
              But an error blocked your way!
            `))
          )
      }
    })
  }
}
