const functions = require("firebase-functions");
const admin = require('firebase-admin');
const {NFL_API_KEY} = require('./secret');

admin.initializeApp();

const TEAMS_URL = `http://api.sportradar.us/nfl/official/trial/v7/en/league/hierarchy.json?api_key=${NFL_API_KEY}`;

exports.getPlayers = functions.https.onRequest(async (req, res) => {

});

exports.loadPlayers = functions.pubsub.schedule('0 3 * * *').timeZone('America/Chicago').onRun((context) => {
  // const teams = await this.loadTeams();
  console.log('Good morning!');
});

exports.loadTeams = functions.https.onRequest(async () => {
  const response = await axios.get(TEAMS_URL);
  if (!response?.data?.conferences) {
    throw new Error('Unable to fetch teams.');
  }
  let teams = [];
  response.data.conferences.forEach((conference) => {
    conference.divisions.forEach((division) => {
      division.teams.forEach((team) => {
        teams.push({id: team.id, name: team.name});
      });
    });
  });
  return teams;
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
