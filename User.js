module.exports = class User {
  constructor(game, id) {
    this.game = game
    this.discordID = id
    this.location = ''
  }

  goTo(newLocation, guild, discordUser) {
    const oldLocation = this.location

    const oldChannel = guild.channels.find('name', 'loc-' + oldLocation)
    const newChannel = guild.channels.find('name', 'loc-' + newLocation)

    return Promise.resolve()
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
  }

  sendMessageAtLocation(guild, discordUser, message) {
    // Sends a message to the discord user inside the channel their location
    // is, currently.

    const channel = guild.channels.find('name', 'loc-' + this.location)
    if (channel) {
      return channel.send(message, {reply: discordUser})
    } else {
      console.warn(fixWS`
        Attempted to send a message to ${discordUser.username}, but the room
        of the location they're in doesn't exist!
      `)

      return Promise.resolve()
    }
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
    user.location = 'Home'
    return user
  }
}
