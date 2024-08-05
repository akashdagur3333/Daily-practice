// index.js
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const querystring = require('querystring');

const app = express();
const port = 3000;

const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SLACK_REDIRECT_URI } = process.env;
function generateStateParameter(length = 10) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let state = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        state += charset[randomIndex];
    }
    return state;
}
// Redirect to Slack's OAuth authorization endpoint
app.get('/auth/slack', (req, res) => {
    const scopes = 'chat:write'; // Scopes required for the API actions
    const state = generateStateParameter();// Generate a unique state parameter

    const queryParams = {
        client_id: SLACK_CLIENT_ID,
        redirect_uri: SLACK_REDIRECT_URI,
        scope: scopes,
        state: state,
        response_type: 'code'
    };

    const queryString = querystring.stringify(queryParams);
    res.redirect(`https://slack.com/oauth/v2/authorize?${queryString}`);
});

// Callback route after user authorizes the app
app.get('slack/callback', async (req, res) => {
    const { code } = req.query;
console.log(req.query)
    // Verify state parameter if needed

    // Exchange code for access token
    try {
        const tokenResponse = await axios.post('https://slack.com/api/oauth.v2.access', querystring.stringify({
            client_id: SLACK_CLIENT_ID,
            client_secret: SLACK_CLIENT_SECRET,
            code: code,
            redirect_uri: SLACK_REDIRECT_URI
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;
       console.log(tokenResponse,'accessToken')
        // Start chat using the access token (example)
        const channelId = 'C1234567890'; // Replace with your channel ID
        const messageText = 'Hello, Slack!';

        const chatResponse = await axios.post('https://slack.com/api/chat.postMessage', {
            channel: channelId,
            text: messageText
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Message sent successfully:', chatResponse.data);

        res.send('Message sent successfully! Check your Slack channel.');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Failed to send message.');
    }
});


app.post('/send-message', async (req, res) => {
    try {
        const { channelId, messageText } = req.body;

        if (!channelId || !messageText) {
            return res.status(400).json({ error: 'Channel ID and message text are required.' });
        }

        // Example usage of sendMessage function
        const result = await sendMessage(channelId, messageText);
        console.log('Message sent successfully:', result);

        res.json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
