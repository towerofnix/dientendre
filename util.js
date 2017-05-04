function loadDatabase(db) {
  // Returns a promise that resolves after a datastore is loaded.

  return new Promise((resolve, reject) => {
    db.loadDatabase(err => {
      if (err) reject(err)
      resolve(db)
    })
  })
}

module.exports = {
  loadDatabase
}
