import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, getVoiceConnection, NoSubscriberBehavior } from "@discordjs/voice";
import { Client, Snowflake, TextChannel } from "discord.js";
const Gtts = require('gtts')

module.exports = async (guildId: Snowflake, textChannel: TextChannel | undefined) => {
    const voiceConnection = getVoiceConnection(guildId)
    if(!voiceConnection){
        textChannel?.send("I'm not in any voice channel")
        return
    }

    const audioPlayer: AudioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Stop
        }
    })
    const speechStream = new Gtts("ลาก่อนค่ะ", "th")
    const audioResource: AudioResource = createAudioResource(speechStream.stream())
    voiceConnection.subscribe(audioPlayer)
    audioPlayer.play(audioResource)
    audioPlayer.on(AudioPlayerStatus.Idle, async () => {
        voiceConnection.destroy()
        await textChannel?.send("Bye Bye")
    })



    
}