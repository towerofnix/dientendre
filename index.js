const Datastore = require('nedb')

const Game = require('./Game')
const config = require('./config')

const { loadDatabase } = require('./util')

Promise.resolve()
  .then(() => {
    console.log('Loading databases..')

    return Promise.all([
      loadDatabase(new Datastore({
        filename: 'db/users.db'
      }))
    ])
  })
  .then(([db]) => {
    const game = new Game({
      userDB: db
    })

    console.log('Logging in bots..')

    return game.setupBots(config.tokens)
  }).then(() => {
    console.log('Done.')
  })
  .catch(err => {
    console.error(err)
  })
