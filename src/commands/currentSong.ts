import { getVoiceConnection } from "@discordjs/voice";
import { Client, Snowflake, TextChannel } from "discord.js";
import { queueManager } from "../Bot";
import { SongQueue } from "../libs/SongQueue";

module.exports = async (client: Client, guildId: Snowflake, textChannel: TextChannel | undefined) => {
    const voiceConnection = getVoiceConnection(guildId);
    if(!voiceConnection){
        textChannel?.send("Bot not in any voice channel!")
        return
    }

    const songQueue: SongQueue = queueManager[guildId]
    if(!songQueue){
        textChannel?.send("There are no queue in this server!")
        return
     }


     const songInfo = await songQueue.getCurrentSong().getSongInfo()
     songQueue.addNotification(`เพลงนี้ชื่อ ${songInfo.title} ขอโดย ${songInfo.requesterName}`)

}