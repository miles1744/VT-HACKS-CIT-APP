

require('dotenv').config();
const axios = require('axios');

const api_key_link = process.env.DISCORD_API_KEY

const {google} = require('googleapis');

async function analyzeKey(text){
    const url_analyze = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=' + api_key_link;
    try {
        const response = await axios.post(url_analyze, {
          comment: {
            text: text,
          },
          languages: ['en'], // Specify the language of the text (e.g., 'en' for English)
          requestedAttributes: {
            TOXICITY: {}, // You can request multiple attributes like INSULT, PROFANITY, etc.
          },
        });
    
        // Log the API response
        const toxicityScore = response.data.attributeScores.TOXICITY.summaryScore.value;
        console.log(`Toxicity score: ${toxicityScore}`);
      } catch (error) {
        console.error('Error analyzing text:', error.response ? error.response.data : error.message);
      }
    }
    
// Example usage
const textToAnalyze = 'This is a very toxic comment!';
analyzeKey(textToAnalyze);


// google.discoverAPI(url_analyze)
//     .then(client => {
//       const analyzeRequest = {
//         comment: {
//           text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!',
//         },
//         requestedAttributes: {
//           TOXICITY: {},
//         },
//       };

//       client.comments.analyze(
//           {
//             key: API_KEY,
//             resource: analyzeRequest,
//           },
//           (err, response) => {
//             if (err) throw err;
//             console.log(JSON.stringify(response.data, null, 2));
//           });
//     })
//     .catch(err => {
//       throw err;
//     });

