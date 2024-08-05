
// const { WebClient } = require('@slack/web-api');

// const slackClient = new WebClient('xoxb-7312579863378-7312727092867-R1dI1c2X5ethgEUk0VBhwiYZ');


// async function createChannel(channelName) {
    //     try {
    //         // Validate channel name against Slack naming rules
    //         if (!isValidChannelName(channelName)) {
    //             throw new Error('Invalid channel name. Channel names must be lowercase alphanumeric with hyphens, periods, or underscores.');
    //         }
    
    //         // Call the conversations.create method using the WebClient instance
    //         const result = await slackClient.conversations.create({
    //             name: channelName,
    //         });
    
    //         // Log and return the created channel object
    //         console.log('Channel created:', result.channel);
    //         return result.channel;
    //     } catch (error) {
    //         // Handle Slack API errors
    //         console.error('Error creating channel:', error);
    //         throw error;
    //     }
    // }
    
    // function isValidChannelName(name) {
    //     // Regex pattern to match Slack channel name rules
    //     const validChannelNameRegex = /^[a-z0-9][a-z0-9._-]{0,20}$/;
    //     return validChannelNameRegex.test(name);
    // }
    
    // createChannel('companynamcloudnito')