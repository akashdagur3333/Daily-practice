// createChannel.js
// slackMessaging.js
require('dotenv').config();
const { WebClient } = require('@slack/web-api');

// Initialize Slack WebClient with your access token
const slackClient = new WebClient(process.env.SLACK_ACCESS_TOKEN);
async function createChannel(channelName) {
    try {
        const result = await slackClient.conversations.create({
            name: channelName,
        });
        console.log('Channel created:', result.channel);
        return result.channel; // Returns the created channel object
    } catch (error) {
        console.error('Error creating channel:', error);
        throw error;
    }
}
createChannel('akashchaudhary')
