import { getVoiceConnection } from "@discordjs/voice";
import { Snowflake, TextChannel } from "discord.js";
import { SongQueue } from "../libs/SongQueue";
import { queueManager } from "../Bot";

module.exports = async (guildId: Snowflake, textChannel: TextChannel | undefined) => {
    const voiceConnection = getVoiceConnection(guildId)
    if(!voiceConnection){   
        await textChannel?.send("I'm not in voice channel!!!!!!!")
        return
    }
    
    const songQueue: SongQueue = queueManager[guildId]
    if(!songQueue){
        await textChannel?.send("I'm no queue in this server!")
        return
    }
    songQueue.skipSong()
    

}