// slackMessaging.js
require('dotenv').config();
const { WebClient } = require('@slack/web-api');
console.log('akash chaudhary')
// Initialize Slack WebClient with your access token
const slackClient = new WebClient(process.env.SLACK_ACCESS_TOKEN);
// Function to fetch channel history
// Function to fetch channel history
async function fetchChannelHistory(channelId) {
    try {
        // Call the conversations.history method using the WebClient instance
        const result = await slackClient.conversations.history({
            channel: channelId,
        });

        // Log and return the fetched history
        console.log('Channel history:', result.messages);
        return result.messages;
    } catch (error) {
        // Handle Slack API errors
        console.error('Error fetching channel history:', error);
        throw error;
    }
}

fetchChannelHistory('C07AQL6J0KS')