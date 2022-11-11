import { Client, CommandInteraction } from "discord.js";
import { queueManager } from "../Bot";




module.exports =  (client: Client): void => {
    client.on('messageCreate', async (message) => {
        const PREFIX = "-"
        if(!message.content.startsWith(PREFIX)) return
        
        const commandName: string = message.content.split(' ', 1)[0]
        switch(commandName){
            case `${PREFIX}j`:
                await require('../commands/join')(client, message.member, message)
                break;
            case `${PREFIX}p`:
                const querry: string = message.content.split(' ', 2)[1]
                await require('../commands/play')(client, message.member, querry, message.channel, queueManager)
                break
            case `${PREFIX}q`:
                await require('../commands/showQueue')(message.channel, queueManager)
                break      
            case `${PREFIX}l`:
                await require('../commands/leave')(message.guildId, message.channel)   
                break
            case `${PREFIX}sk`:
                await require('../commands/skip')(message.member?.guild.id, message.channel)
                break
            case `${PREFIX}currentSong`:
                await require('../commands/currentSong')(client, message.guildId, message.channel)
            case `${PREFIX}stsp`:
                await require('../commands/stopSpeaking')(client, message.guildId)
            case `${PREFIX}chat`:
                return;
                const inputRaw = message.content.split(`${PREFIX}chat`)[1].trim()
                console.log('input raw is ' + inputRaw)
                if(inputRaw.length == 0) return;
                await require('../commands/chat')(client, message.member?.guild.id, message.member, inputRaw, message.channel)
            default:
                return;
        }
        

        
    })
}