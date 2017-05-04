const fixWS = require('fix-whitespace')

function getErrorMessage(error, title = 'There was an internal error!') {
  return fixWS`
    **${title}**
    Please send this message to an admin if you can:
    \`\`\`
    ${error.message}
    ${error.stack}
    \`\`\`
  `
}

function getAuthenticationURL(clientID, scope, permissions) {
  // Gets the URL to authenticate a bot on a Discord guild/server.

  return (
    'https://discordapp.com/api/oauth2/authorize' +
    `?client_id=${clientID}&scope=${scope}&permissions=${permissions}`
  )
}

function loadDatabase(db) {
  // Returns a promise that resolves after a datastore is loaded.

  return new Promise((resolve, reject) => {
    db.loadDatabase(err => {
      if (err) reject(err)
      resolve(db)
    })
  })
}

function randomOfArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = {
  getErrorMessage,
  getAuthenticationURL,
  loadDatabase,
  randomOfArray,
}
