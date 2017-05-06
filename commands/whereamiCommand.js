const baseCommand = require('./baseCommand')

module.exports = Object.assign(Object.create(baseCommand), {
  name: 'whereami',
  description: "Tells you what your current location is.",

  call(util) {
    util.game.getUser(util.discordUser.id).then(user => {
      util.message.reply(`My best guess would be *${user.location}*.`)
    })
  }
})
