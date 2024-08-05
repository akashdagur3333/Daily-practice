// slackMessaging.js
require('dotenv').config();
const { WebClient } = require('@slack/web-api');

// Initialize Slack WebClient with your access token
const slackClient = new WebClient(process.env.SLACK_ACCESS_TOKEN);

// Function to send a message to a Slack channel
async function sendMessage(channelId, messageText) {
    try {
        const result = await slackClient.chat.postMessage({
            channel: channelId,
            text: messageText,
        });
        console.log('Message sent: ', result.ts);
        return result;
    } catch (error) {
        if (error.code === 'slack_webapi_platform_error' && error.data.error === 'missing_scope') {
            console.error('Missing required scope: chat:write:bot');
        } else if (error.code === 'slack_webapi_platform_error' && error.data.error === 'channel_not_found') {
            console.error('Channel not found:', error.message);
        } else {
            console.error('Error sending message: ', error);
        }
        throw error;
    }
}


sendMessage('C079Q486L4C','Hello Akash Chaudhary')

// module.exports = {
//     sendMessage,
// };
