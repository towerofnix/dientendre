const baseCommand = require('./baseCommand')

const { getErrorMessage } = require('../util')

module.exports = Object.assign(Object.create(baseCommand), {
  name: 'login',

  call(util) {
    util.message.reply("Logging in!")

    util.game.loadUser(util.discordUser.id)
      .then(
        () => util.message.reply("You're logged in now."),
        error => util.message.reply(getErrorMessage(error, fixWS`
          Yikes, there was an error logging you in!
        `))
      )
  }
})
