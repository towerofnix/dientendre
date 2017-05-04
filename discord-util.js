function getAuthenticationURL(clientID, scope, permissions) {
  return (
    'https://discordapp.com/api/oauth2/authorize' +
    `?client_id=${clientID}&scope=${scope}&permissions=${permissions}`
  )
}

module.exports = {
  getAuthenticationURL
}
