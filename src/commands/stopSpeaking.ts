import { getVoiceConnection } from "@discordjs/voice";
import { Client, Snowflake } from "discord.js";
import { queueManager } from "../Bot";

module.exports = async (client: Client, guildId: Snowflake) => {
    const voiceConnection = getVoiceConnection(guildId)
    if(!voiceConnection){
        return
    }

    const songQueue = queueManager[guildId]
    songQueue?.stopSpeaking()
}