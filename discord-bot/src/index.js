const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.MessageContent
    ],
})

client.login('MTI4NDM5NDYyMjg4OTc1NDYyNg.G9rud7.pImnmE0p2QKHu-utB8A9y4XC_bTXyWrg9C593M')

const {google} = require('googleapis');

API_KEY = '';
DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

google.discoverAPI(DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!',
        },
        requestedAttributes: {
          TOXICITY: {},
        },
      };

      client.comments.analyze(
          {
            key: API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            console.log(JSON.stringify(response.data, null, 2));
          });
    })
    .catch(err => {
      throw err;
    });

