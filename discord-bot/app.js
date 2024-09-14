//require('dotenv').config();
require('dotenv').config(); // Load .env variables
const { Client, IntentsBitField } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ],
});


const DISCORD_API_KEY = process.env.DISCORD_API_KEY;

// Function to analyze messages for profanity
async function analyzeMessage(content) {
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${DISCORD_API_KEY}`;

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
    const toxicityScore = response.data.attributeScores.TOXICITY.summaryScore.value;
    return {profanityScore, toxicityScore};
    
    


  } catch (error) {
    console.error('Error analyzing message:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Event handler when the bot is ready
client.on('ready', (c) => {
  console.log(`${c.user.tag} is Online.`);
});

async function sendMessageWithDelay(channel, content, delay = 200) {
  await new Promise(resolve => setTimeout(resolve, delay));
  await channel.send(content);
}

// Event handler for new messages
client.on('messageCreate', async (message) => {
  try{
    if (message.author.bot) return; // Ignore messages from bot

  if (message.content === 'hello'){
    await sendMessageWithDelay(message.channel,`Hey, ${message.author}!`);
  }

  if (message.content === 'miles'){
    await sendMessageWithDelay(message.channel,'miles i like ur butt - discord');
  }

  const content = message.content;
  const scores = await analyzeMessage(content);

  if (scores == null) return;

  const { profanityScore, toxicityScore } = scores;

  

  // Define a threshold for detecting profanity (e.g., score > 0.7)
  if (profanityScore > 0.2) {
    // Optionally, delete the message
    await message.delete();

    // Send a warning message
    sendMessageWithDelay(message.channel, `${message.author}, please refrain from using profanity.`);
  }

  if (toxicityScore > 0.2) {
    // Optionally, delete the message
    await message.delete();

    // Send a warning message
    sendMessageWithDelay(message.channel,`${message.author}, please refrain from using toxicity.`);
  }

  }
  
  
  catch(err){
    console.error('Error processing the message: ', err);

  }
});

// Login the bot
client.login(process.env.DISCORD_TOKEN);