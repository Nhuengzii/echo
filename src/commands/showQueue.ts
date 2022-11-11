import { Snowflake, TextChannel } from "discord.js";
import { QueueManager } from "src/Bot";



module.exports = async (textChannel: TextChannel, queueManager: QueueManager): Promise<void> => {
    const songQueue = queueManager[textChannel.guild.id]
    if(!songQueue){
        await textChannel.send({content: "There are no queue in this server"})
        return
    }
    await songQueue.showQueue(textChannel)
}