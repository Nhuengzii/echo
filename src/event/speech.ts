import { addSpeechEvent, resolveSpeechWithWitai, VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import { queueManager } from "../Bot";

module.exports = async (client: Client) => {
    addSpeechEvent(client, { lang: 'th-TH' })

    client.on('speech', async (voicemessage: VoiceMessage) => {
        if (!voicemessage.content) return;
        if (voicemessage.content.length == 0) return;

        console.log(`${voicemessage.member?.user.username} said: ${voicemessage.content}`)

        const content = voicemessage.content;
        if (content.startsWith("เปิดเพลง")) {
            const querry = content.split("เปิด")[1]
            if (querry == 'เปิดเพลง') { return }
            await require('../commands/play')(client, voicemessage.member, querry, undefined, queueManager)
        }
        else if (content.startsWith("เปลี่ยนเพลง")) {
            await require('../commands/skip')(voicemessage.guild.id, undefined)
        }
        else if (content.startsWith("ออกไป")) {
            await require('../commands/leave')(voicemessage.channel.guild.id, undefined)
        }
        else if (["เพลงอะไรอ่ะ", "เพลงอะไร"].includes(content)) {
            await require('../commands/currentSong')(client, voicemessage.member?.guild.id, undefined)
        }
        else if (["เงียบ", "หยุดพูด", "เลิกพูด", "เงียบไป"].includes(content)) {
            await require('../commands/stopSpeaking')(client, voicemessage.member?.guild.id)
        }
    })
}
