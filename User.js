const fixWS = require('fix-whitespace')
const { randomOfArray } = require('./util')

module.exports = class User {
  constructor(game, id) {
    this.game = game
    this.discordID = id
    this.location = ''
  }

  goTo(newLocation, guild, discordUser) {
    if (this.location === newLocation) {
      return guild.channels.find('name', 'loc-' + this.location)
        .send(`You're already here!`)
    }

    const oldLocation = this.location

    const oldChannel = guild.channels.find('name', 'loc-' + oldLocation)
    const newChannel = guild.channels.find('name', 'loc-' + newLocation)

    try {
      const exitText = randomOfArray(this.getLocationData(oldLocation).exitText)
        .replace(/@user/g, `<@!${discordUser.id}>`)
      const entryText = randomOfArray(this.getLocationData(newLocation).entryText)
        .replace(/@user/g, `<@!${discordUser.id}>`)
    } catch(e) {
      return oldChannel.send(`_<@!${discordUser.id}> couldn't go there._`)
    }

    return oldChannel.send(`_${exitText}_`)
      .then(() => {
        if (oldChannel) {
          return oldChannel.overwritePermissions(discordUser, {
            SEND_MESSAGES: false, READ_MESSAGES: false
          })
        }
      })
      .then(() => {
        if (newChannel) {
          newChannel.overwritePermissions(discordUser, {
            SEND_MESSAGES: true, READ_MESSAGES: true
          })
        }
      })
      .then(() => {
        this.location = newLocation
        this.saveLocation()
      })
      .then(() =>
        newChannel.send(`_${entryText}_`)
      )
  }

  sendMessageAtLocation(guild, message) {
    // Sends a message to the discord user inside the channel their location
    // is, currently.

    const channel = guild.channels.find('name', 'loc-' + this.location)
    if (channel) {
      return channel.send(message)
    } else {
      console.warn(fixWS`
        Attempted to send a message to ${discordUser.username}'s location, but
        the location they're in doesn't exist!
      `)

      return Promise.resolve()
    }
  }

  getLocationData(location) {
    const locations = require('./locations')
    return locations[location] || null
  }

  saveAll() {
    return Promise.all([
      this.saveLocation()
    ])
  }

  saveLocation() {
    return this.dbUpdate({
      $set: {
        location: this.location
      }
    })
  }

  dbUpdate(doc) {
    return this.game.dbUpdate(this.game.userDB, {id: this.discordID}, doc)
  }

  static fromDocument(game, doc) {
    const user = User.create(game, doc.id)
    user.location = doc.location || user.location
    return user
  }

  static create(game, discordID) {
    const user = new User(game, discordID)
    user.location = 'void'
    return user
  }
}
