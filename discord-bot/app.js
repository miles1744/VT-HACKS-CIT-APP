//require('dotenv').config();
require('dotenv').config(); // Load .env variables
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const DISCORD_API_KEY = process.env.DISCORD_API_KEY;

// Function to analyze messages for profanity
async function analyzeMessage(content) {
  const url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${DISCORD_API_KEY}';

  try {
    const response = await axios.post(url, {
      comment: {
        text: content,
      },
      languages: ['en'], // Specify the language of the message
      requestedAttributes: {
        PROFANITY: {},
        TOXICITY: {}, // Check for profanity
      },
    });

    // Extract the profanity score from the response
    const profanityScore = response.data.attributeScores.PROFANITY.summaryScore.value;
    return profanityScore;
    
    const toxicityScore = response.data.attributeScores.TOXICITY.summaryScore.value;
    return toxicityScore;

  } catch (error) {
    console.error('Error analyzing message:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Event handler when the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Event handler for new messages
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  const content = message.content;
  const profanityScore = await analyzeMessage(content);
  const toxicityScore = await analyzeMessage(content);

  // Define a threshold for detecting profanity (e.g., score > 0.7)
  if (profanityScore > 0.2) {
    // Optionally, delete the message
    await message.delete();

    // Send a warning message
    message.channel.send(`${message.author}, please refrain from using profanity.`);
  }

  if (toxicityScore > 0.2) {
    // Optionally, delete the message
    await message.delete();

    // Send a warning message
    message.channel.send(`${message.author}, please refrain from using toxicity.`);
  }
});

// Login the bot
client.login(process.env.DISCORD_TOKEN);

