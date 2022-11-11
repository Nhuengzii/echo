import { Client } from "discord.js";

module.exports =  (client: Client): void => {
    client.once('ready', async () => {
        console.log(`${client.user?.username} is Online!`)
        return
    })

}