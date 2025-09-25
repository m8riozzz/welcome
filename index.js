// Import required packages
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

// Get environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID; // Add this to your .env file

// Create a new client instance
// You must specify the required intents for the bot's functionality
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

// When the client is ready, log a message to the console and set up voice connection
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Set up interval for voice channel connection and presence update
    setInterval(async () => {
        client.channels.fetch(VOICE_CHANNEL_ID)
            .then((channel) => {
                const VoiceConnection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                    selfDeaf: false
                });
            })
            .catch((error) => {
                console.error('Error fetching or joining voice channel:', error);
            });
        
        // Update bot's presence
        client.user.setPresence({
            status: 'idle'
        });
    }, 10000); // Runs every 10 seconds
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
