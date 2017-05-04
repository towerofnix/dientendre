module.exports = class User {
  constructor(id) {
    this.discordID = id
  }

  static fromDocument(doc) {
    return new User(doc.id)
  }

  static create(discordID) {
    return new User(discordID)
  }
}
