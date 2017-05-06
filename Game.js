const promisify = require('es6-promisify')

const User = require('./User')
const AdminBot = require('./bots/AdminBot')
const NPCBot = require('./bots/NPCBot')

const bind = (o, p) => o[p].bind(o)
const promisifyMethod = (o, p) => promisify(bind(o, p))

module.exports = class Game {
  constructor({userDB}) {
    this.userDB = userDB
    this.userMap = new Map()
  }

  loadUser(discordID) {
    // Loads a user account from the user database using the discord user's ID
    // for identification. If no user account exists for the passed ID, one is
    // created.

    return this.dbFind(this.userDB, {'id': discordID})
      .then(docs => {
        let user

        if (docs.length > 0) {
          return User.fromDocument(this, docs[0])
        } else {
          return this.dbInsert(this.userDB, {'id': discordID})
            .then(() => User.create(this, discordID))
        }
      })
      .then(user => {
        this.userMap.set(discordID, user)

        return user.saveAll().then(() => user)
      })
  }

  getUser(discordID) {
    // Gets a user account from a discord user ID. If there is no user account
    // loaded for that ID yet, one is laoded.

    if (this.userMap.has(discordID)) {
      return Promise.resolve(this.userMap.get(discordID))
    } else {
      return this.loadUser(discordID)
    }
  }

  setupBots(tokens) {
    // Sets up the various Discord bots used by the game. Requires tokens as
    // an object containing the various bot tokens used here.

    // The order registered dictates the order these commands will appear in
    // the "help" command.
    this.admin = new AdminBot(this)
    this.admin.registerCommand(require('./commands/helpCommand'))
    this.admin.registerCommand(require('./commands/gotoCommand'))
    this.admin.registerCommand(require('./commands/whereamiCommand'))
    this.admin.registerCommand(require('./commands/pingCommand'))
    this.admin.registerCommand(require('./commands/loginCommand'))

    this.npcs = {
      geoffrey: new NPCBot('Geoffrey')
    }

    return Promise.all([
      this.admin.client.login(tokens.admin),

      Object.entries(this.npcs).map(([id, bot]) => {
        return bot.client.login(tokens[id])
      })
    ])
  }

  dbFind(db, ...args) {
    return promisifyMethod(db, 'find')(...args)
  }

  dbInsert(db, ...args) {
    return promisifyMethod(db, 'insert')(...args)
  }

  dbUpdate(db, ...args) {
    return promisifyMethod(db, 'update')(...args)
  }
}
