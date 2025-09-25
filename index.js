// Import required packages
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Get environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;

// Create a new client instance
// You must specify the 'GuildMembers' intent to receive member join events
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// When the client is ready, log a message to the console
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Listen for the 'guildMemberAdd' event
client.on('guildMemberAdd', member => {
    // Get the welcome channel using its ID
    const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);

    // If the channel exists, send the welcome message
    if (welcomeChannel) {
        welcomeChannel.send(`Welcome to the server, ${member.toString()}! We're glad to have you here.`);
    }
});

// Log in to Discord with your client's token
client.login(BOT_TOKEN);