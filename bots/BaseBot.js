const Discord = require('discord.js')
const EventEmitter = require('events')

module.exports = class BasicBot extends EventEmitter {
  constructor() {
    super()

    this.client = new Discord.Client()
  }
}
