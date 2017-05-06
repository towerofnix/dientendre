const baseCommand = require('./baseCommand')

module.exports = Object.assign(Object.create(baseCommand), {
  name: 'goto',
  description: (
    "Teleports you to any location you will by using the power of magic."
  ),

  call(util, [newLocation]) {
    let user

    util.game.getUser(util.discordUser.id)
      .then(_user => {
        user = _user
      })
      .then(() => user.goTo(
        newLocation.slice(0, 30), util.message.guild, util.discordUser
      ))
      .then(
        () => user.sendMessageAtLocation(
          util.message.guild, util.discordUser, "You're here now!"
        ),

        error => util.message.reply(getErrorMessage(error, fixWS`
          But an error blocked your way!
        `))
      )
  }
})
