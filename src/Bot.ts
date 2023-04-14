import { Client, GatewayIntentBits } from "discord.js";
import { SongQueue } from "./libs/SongQueue";

const TOKEN = process.env.TOKEN;
const client: Client = new Client({
    intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
});

export type QueueManager = { [guildId: string]: SongQueue };
const queueManager: QueueManager = {};
export { queueManager };

require("./event/ready")(client);
require("./event/onMessageCreate")(client);
require("./event/speech")(client);

client.login(TOKEN);
