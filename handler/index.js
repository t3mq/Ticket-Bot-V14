const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
const { readdirSync } = require('fs');
const colors = require('colors');

module.exports = (client) => {
    // # slashCommands
    const arrayOfSlashCommands = [];

    const loadSlashCommands = (dir = "./commands/") => {
        readdirSync(dir).forEach(dirs => {
            const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

            for (const files of commands) {
                const getFileName = require(`../${dir}/${dirs}/${files}`);
                client.slashCommands.set(getFileName.name, getFileName);
                console.log(`[SLASH COMMANDS]`.bold.red + ` Loading command :`.bold.white + ` ${getFileName.name}`.bold.red);
                arrayOfSlashCommands.push(getFileName);
            }
        })

        setTimeout(async () => {
            console.log(`API >`.bold.white + ` Synchronize all commands with Discord API.`.bold.green)
            await client.application.commands.set(arrayOfSlashCommands);
            }, 5000)
    }
    loadSlashCommands();

    console.log(`•----------•`.bold.black)

    // # events
    const loadEvents = (dir = "./events/") => {
        readdirSync(dir).forEach(dirs => {
            const events = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"));

            for(const files of events) {
                const getFileName = require(`../${dir}/${dirs}/${files}`)
                client.on(getFileName.name, (...args) => getFileName.execute(...args, client))
                console.log(`[EVENTS]`.bold.red + ` Loading event :`.bold.white + ` ${getFileName.name}`.bold.red);
                if(!events) return console.log(`[EVENTS]`.bold.red + `Nothing event in : `.bold.yellow + `${files}`.bold.red)
            }
        })
    }
    loadEvents();
    console.log(`•----------•`.bold.black)
}