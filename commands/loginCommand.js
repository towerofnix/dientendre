const baseCommand = require('./baseCommand')

const { getErrorMessage } = require('../util')

module.exports = Object.assign(Object.create(baseCommand), {
  name: 'login',
  description: (
    "Sets up your user account in the inside the server's RAM. You" +
    " probably won't ever need to use this yourself, since you're" +
    " automatically logged in whenever you need to be anyways, but if you're" +
    " debugging stuff this might be useful."
  ),

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
