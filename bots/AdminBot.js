const BaseBot = require('./BaseBot')
const { RichEmbed } = require('discord.js')

const fixWS = require('fix-whitespace')

const { getErrorMessage } = require('../util')

module.exports = class AdminBot extends BaseBot {
  constructor(game) {
    super()

    this.game = game

    this.client.on('guildMemberAdd', member => {
      // create usr channel for this member
      member.guild.createChannel(`usr-${member.id}`, 'text', [
        {
          id: member.id,
          type: 'member',
          allow: 0x00000400, // read messages
        },
      ]).then(channel => {
        channel.send(`Welcome to **${member.guild.name}**!`)
      }).catch(console.error)
    })

    this.client.on('message', msg => {
      if (msg.content.toLowerCase() === '.ping') {
        msg.channel.send("Pong!")
      }

      /*
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
      */

      if (msg.content.toLowerCase() === '.look') {
        this.game.getUser(msg.author.id)
          .then(user => user.getLocationData())
          .then(location => {
            let { name, image, description } = location

            let embed = new RichEmbed()
            embed.setTitle(name)
            embed.setImage(image)
            embed.setDescription(description)

            msg.channel.send({ embed })
          })
      }

      if (msg.content.toLowerCase().startsWith('.goto ')) {
        let user

        this.game.getUser(msg.author.id)
          .then(_user => { user = _user })
          .then(() => {
            return user.goTo(msg.content.slice(6, 36), msg.guild, msg.author)
          })
          .catch(error =>
            msg.channel.send(getErrorMessage(error, fixWS`
              But an error blocked your way!
            `))
          )
      }
    })
  }
}
