const Perspective = require('perspective-api-client');

Perspective.discoverAPI()

require('dotenv').config();
const axios = require('axios');

const api_key_link = process.env.DISCORD_API_KEY

const {google} = require('googleapis');

async function analyzeKey(text){
    const url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=' + api_key_link;
}


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