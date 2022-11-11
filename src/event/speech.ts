import { addSpeechEvent, resolveSpeechWithWitai, VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import { queueManager } from "../Bot";

module.exports = async (client: Client) => {
    addSpeechEvent(client, {lang: 'th-TH'})

    client.on('speech', async (voicemessage: VoiceMessage) => {
        if(!voicemessage.content) return;
        if(voicemessage.content.length == 0) return;

        console.log(`${voicemessage.member?.user.username} said: ${voicemessage.content}`)

        const content = voicemessage.content;
        if(content.startsWith("เปิดเพลง")){
            const querry = content.split("เปิด")[1]
            if(querry == 'เปิดเพลง'){return}
            await require('../commands/play')(client, voicemessage.member, querry , undefined, queueManager)
        }
        else if(content.startsWith("เปลี่ยนเพลง")){
            await require('../commands/skip')(voicemessage.guild.id, undefined)
        }
        else if(content.startsWith("ออกไป")){
            await require('../commands/leave')(voicemessage.channel.guild.id, undefined)
        }
        else if(content.startsWith("เพลงอะไรอ่ะ")){
            await require('../commands/currentSong')(client, voicemessage.member?.guild.id, undefined)
        }
        else if(content.startsWith("หยุดพูด")){
            await require('../commands/stopSpeaking')(client, voicemessage.member?.guild.id)
        }
        else if(content.startsWith("เอคโค่") || content.startsWith("Echo") || content.startsWith("Eco")){
            return;
            let question = ""

            if(content.startsWith("เอคโค่")){
                question = content.split("เอคโค่")[1]
            }
            else if(content.startsWith("Echo")){
                question = content.split("Echo")[1]
            }
            else if(content.startsWith("Eco")){
                question = content.split("Eco")[1]
            }

            if(question.length == 0){
                return
            }

            await require('../commands/chat')(client, voicemessage.member?.guild.id, voicemessage.member, question, undefined)
        }
    })
}