const baseCommand = require('./baseCommand')

module.exports = Object.assign(Object.create(baseCommand), {
  name: 'help',
  description: (
    "Presents a help message containing information about as many commands" +
    " as is possible."
  ),

  call(util) {
    const commands = Object.values(util.adminBot.commands)

    const commandsWithDocs = commands.filter(command => {
      return command.description.length > 0
    })

    const docLines = Object.values(commandsWithDocs).map(command => {
      return `**.${command.name}:** ${command.description}`
    })

    util.message.reply(
      "Okay, here's some quick documentation to get you started:\n" +
      "\n" +
      docLines.join("\n")
    )
  }
})
