const BaseBot = require('./BaseBot')

const fixWS = require('fix-whitespace')

module.exports = class AdminBot extends BaseBot {
  constructor(game) {
    super()

    this.game = game

    this.commands = {}

    this.client.on('message', msg => {
      if (msg.content.startsWith('.')) {
        this.handleCommandMessage(msg)
        return
      }
    })
  }

  registerCommand(commandObj) {
    if (commandObj.name === '') {
      throw new Error("Commands must have a name")
    }

    if (commandObj.name in this.commands) {
      console.warn(
        `Command with name "${commandObj.name}" exists but a new command is ` +
        "being registered with that name - overwriting the old one!"
      )
    }

    if (commandObj.description.length === 0) {
      console.warn(
        `Command with name "${commandObj.name}" has no description.`
      )
    }

    this.commands[commandObj.name] = commandObj
  }

  handleCommandMessage(msg) {
    const commandNameMatch = msg.content.match(/^\.([^ ]*)/)

    if (!commandNameMatch) {
      console.warn(
        `Failed to get command name from message content "${msg.content}".`
      )

      msg.reply(
        "Hrmph, there was an error in the server dealing with that command!" +
        " (We've taken notice, but it'd also be appreciated if you could" +
        " tell a developer about this.)"
      )
    }

    const commandName = commandNameMatch[1]
    const args = msg.content.slice(2 + commandName.length).split(' ')

    let commandObj

    if (commandName in this.commands) {
      commandObj = this.commands[commandName]
    } else {
      if ('_not_found_' in this.commands) {
        commandObj = this.commands['_not_found_']
      } else {
        msg.reply(`The command "${commandName}" wasn't found, sorry.`)
        return
      }
    }

    commandObj.call({
      message: msg,
      discordUser: msg.author,
      game: this.game,
      adminBot: this
    }, args)
  }
}
