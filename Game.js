const promisify = require('es6-promisify')

const AdminBot = require('./bots/AdminBot')
const NPCBot = require('./bots/NPCBot')

const bind = (o, p) => o[p].bind(o)
const promisifyMethod = (o, p) => promisify(bind(o, p))

module.exports = class Game {
  setupBots(tokens) {
    // Sets up the various Discord bots used by the game. Requires tokens as
    // an object containing the various bot tokens used here.

    this.admin = new AdminBot()

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
