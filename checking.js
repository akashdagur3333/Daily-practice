console.log('welcome back Akash Chaudhary on practise section')

const config = require("./config.js");
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');
// const main=(x,y)=>{
//     if(x.length!=y.length){
//         return false
//     }

//     let countCharacter={}
//     for(let a of x){
//         countCharacter[a]=(countCharacter[a] || 0)+1;
//     }
//     console.log(countCharacter)

//     for(let b of y){
//         if(!countCharacter[b]){
//             return false;
//         }
//         countCharacter[b]--;
//     }
//     console.log(countCharacter)
//     return true
// }



// Find the Maximum and Minimum in an Array
// const main=(array)=>{
//     console.log(array)
//     let largest=array[0];
//     let smallest=array[0]
//     for(let i=0;i<array.length;i++){
//       if(array[i]>largest){[
//         largest=array[i]
//       ]}
//       if(array[i]<smallest){
//         smallest=array[i]
//       }
//     }
//     return {smallest,largest}
// }


// Find the "Kth" Maximum and Minimum Element of an Array

// const main=(array,which,type)=>{
//     array=array.sort((a,b)=>a-b)
//     let output;
//     if(type==0){
//         output= array[which-1]  
//     }
//     else{
//         output= array[array.length-which]
//     }
//     return output
// }


// Sort an Array of 0s, 1s, and 2s

// const main =(array)=>{
//      let s=0;
//      let m=0;
//      let l=array.length-1;
//      while(m<=l){
//        if(array[m]==0){
//         [array[s],array[m]]=[array[m],array[s]]
//         s++
//         m++
//        }
//        else if(array[m]===1){
//         m++
//        }
//        else{
//         [array[m],array[l]]=[array[l],array[m]]
//         l--
//        }
//        console.log(array)
//      }
//      return array
// }

// Find the first repeating element in an array of integers(*)

// Input: arr[] = [10, 5, 3, 4, 3, 5, 6]

// Output: 5

// function main(arr) {
//     let seen = {};  // Object to keep track of seen elements
//     let firstRepeatingElement = null;  // Variable to store the result
    
//     for (let i = 0; i < arr.length; i++) {
//         if (seen[arr[i]] !== undefined) {
//             // Update the result if this element is the first repeating element seen
//             firstRepeatingElement = arr[i];
//         } else {
//             // Mark the element as seen
//             seen[arr[i]] = true;
//         }
//         console.log(seen,firstRepeatingElement)
//     }

//     // If a repeating element was found, return it; otherwise, indicate no repeating elements
//     return firstRepeatingElement !== null ? firstRepeatingElement : "No repeating elements found";
// }

// 

// Example usage
// const result = findMissingNumber([1, 3, 7, 5, 6, 2]);
// console.log(result); // Output: 4


// const result=[
//     {
//       id: 3,
//       startTime: '00:00:00,000',
//       endTime: '00:00:11,040',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 33,
//       startTime: '00:00:00,000',
//       endTime: '00:00:15,000',
//       speechLabel: '',
//       text: '♪ music ♪',
//       nonSpeech: ''
//     },
//     {
//       id: 1,
//       startTime: '00:00:00,009',
//       endTime: '00:01:27,000',
//       speechLabel: 'spk_0',
//       text: "Sworn statements This is good This is good as shit Yeah there is It's gone So now what He gets out No now you get out you go get the stuff Do you want me to get out in some Yeah bro I got this priest little brother Where'd you get that You know I know a guy that you know a guy look at you John Wayne Get out What the fuck are you act like that Never listen to me when I tell you to do shit I'm in yo that he's not inside work he's not inside We'll check there's an envelope I'm grabbing this envelope Yes it is I think this is what it says Sticks come in roses Uh huh You got me",
//       nonSpeech: ''
//     },
//     {
//       id: 4,
//       startTime: '00:00:16,800',
//       endTime: '00:00:17,280',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(thunder bangs)'
//     },
//     {
//       id: 5,
//       startTime: '00:00:18,720',
//       endTime: '00:00:26,400',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 28,
//       startTime: '00:00:18,720',
//       endTime: '00:00:23,720',
//       speechLabel: '',
//       text: '♪ music ♪',
//       nonSpeech: ''
//     },
//     {
//       id: 29,
//       startTime: '00:00:23,720',
//       endTime: '00:00:28,720',
//       speechLabel: '',
//       text: '# can you get the stuff #',
//       nonSpeech: ''
//     },
//     {
//       id: 6,
//       startTime: '00:00:27,360',
//       endTime: '00:00:27,840',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(rain falls)'
//     },
//     {
//       id: 7,
//       startTime: '00:00:27,840',
//       endTime: '00:00:40,320',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 37,
//       startTime: '00:00:27,840',
//       endTime: '00:00:32,840',
//       speechLabel: '',
//       text: '# let me hear all this money yeah bro #',
//       nonSpeech: ''
//     },
//     {
//       id: 38,
//       startTime: '00:00:32,840',
//       endTime: '00:00:42,840',
//       speechLabel: '',
//       text: '♪ music ♪',
//       nonSpeech: ''
//     },
//     {
//       id: 8,
//       startTime: '00:00:40,800',
//       endTime: '00:00:54,239',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 30,
//       startTime: '00:00:40,800',
//       endTime: '00:00:45,800',
//       speechLabel: '',
//       text: '# never listen #',
//       nonSpeech: ''
//     },
//     {
//       id: 31,
//       startTime: '00:00:45,800',
//       endTime: '00:00:50,800',
//       speechLabel: '',
//       text: '♪ music ♪',
//       nonSpeech: ''
//     },
//     {
//       id: 32,
//       startTime: '00:00:50,800',
//       endTime: '00:00:55,800',
//       speechLabel: '',
//       text: "# he's not inside #",
//       nonSpeech: ''
//     },
//     {
//       id: 9,
//       startTime: '00:00:54,239',
//       endTime: '00:00:54,720',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(rain falls)'
//     },
//     {
//       id: 10,
//       startTime: '00:00:55,199',
//       endTime: '00:00:55,680',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(rain falls)'
//     },
//     {
//       id: 11,
//       startTime: '00:00:55,680',
//       endTime: '00:01:05,759',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 34,
//       startTime: '00:00:55,680',
//       endTime: '00:01:00,680',
//       speechLabel: '',
//       text: '♪ music ♪',
//       nonSpeech: ''
//     },
//     {
//       id: 35,
//       startTime: '00:01:00,680',
//       endTime: '00:01:05,680',
//       speechLabel: '',
//       text: '# yes it says I think #',
//       nonSpeech: ''
//     },
//     {
//       id: 36,
//       startTime: '00:01:05,680',
//       endTime: '00:01:10,680',
//       speechLabel: '',
//       text: '♪ music ♪',
//       nonSpeech: ''
//     },
//     {
//       id: 12,
//       startTime: '00:01:06,720',
//       endTime: '00:01:08,640',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 13,
//       startTime: '00:01:08,640',
//       endTime: '00:01:09,120',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(loud explosion)'
//     },
//     {
//       id: 14,
//       startTime: '00:01:12,480',
//       endTime: '00:01:20,160',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 15,
//       startTime: '00:01:20,640',
//       endTime: '00:01:21,119',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(rain falls)'
//     },
//     {
//       id: 16,
//       startTime: '00:01:22,560',
//       endTime: '00:01:23,520',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(gun fires)'
//     },
//     {
//       id: 2,
//       startTime: '00:01:27,000',
//       endTime: '00:02:14,770',
//       speechLabel: 'spk_1',
//       text: "Hello Hopefully be in progress on 23 Officer 567 requesting RN 44 with their partner that keys in the ignition New York state vehicle T India 72 Romeo Oscar Roger Hoven copy that and a case of beer to your left hiking tracks Now we got a B mobile for Canadian side's missing He had multiple vehicle accidents you know like a new injury You miss it",
//       nonSpeech: ''
//     },
//     {
//       id: 17,
//       startTime: '00:01:37,920',
//       endTime: '00:01:38,399',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(loud explosion)'
//     },
//     {
//       id: 18,
//       startTime: '00:01:40,800',
//       endTime: '00:01:41,280',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(loud explosion)'
//     },
//     {
//       id: 19,
//       startTime: '00:01:41,280',
//       endTime: '00:01:43,679',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 20,
//       startTime: '00:01:44,160',
//       endTime: '00:01:51,360',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 21,
//       startTime: '00:01:51,839',
//       endTime: '00:01:54,720',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 22,
//       startTime: '00:01:55,199',
//       endTime: '00:01:58,560',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 23,
//       startTime: '00:01:59,520',
//       endTime: '00:02:00,000',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 24,
//       startTime: '00:02:00,479',
//       endTime: '00:02:01,440',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 25,
//       startTime: '00:02:03,360',
//       endTime: '00:02:07,199',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 26,
//       startTime: '00:02:07,679',
//       endTime: '00:02:09,600',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     },
//     {
//       id: 27,
//       startTime: '00:02:10,079',
//       endTime: '00:02:14,880',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(indistinct / foreign chatter)'
//     }
//   ]

//   const convertToSUbtitle = (entries) => {
//     const mergedEntries = [];
//     let currentEntry = null;
  
//     entries.forEach(entry => {
//       const text = entry.text || entry.nonSpeech || '';
//       const isNonSpeech = entry.nonSpeech !== '';
  
//       if (currentEntry) {
//         const isSameSpeaker = currentEntry.speechLabel === entry.speechLabel && entry.speechLabel !== '';
//         const isSameText = currentEntry.text === text && text !== '';
//         const isSameNonSpeech = currentEntry.nonSpeech === entry.nonSpeech && isNonSpeech;
  
//         if ((isSameSpeaker && currentEntry.text && entry.text) || 
//             (isSameText && !isNonSpeech) || 
//             (isSameNonSpeech && isNonSpeech)) {
//           currentEntry.endTime = entry.endTime;
//           if (isNonSpeech) {
//             currentEntry.nonSpeech = text; // Update to the latest non-speech description
//           } else {
//             currentEntry.text += ` ${text.trim()}`;
//           }
//         } else {
//           mergedEntries.push(currentEntry);
//           currentEntry = {
//             ...entry
//           };
//         }
//       } else {
//         currentEntry = {
//           ...entry
//         };
//       }
//     });
  
//     // Add the last entry
//     if (currentEntry) {
//       mergedEntries.push(currentEntry);
//     }
  
//     // Map to subtitle format
//     return mergedEntries.map((entry, index) => {
//       let text = entry.text || entry.nonSpeech || '';
//       const isMusic = text.includes('♪');
//       if (isMusic) {
//         text = '♪ music ♪';
//       }
//       const speaker = entry.speechLabel || '';
//       const labelS = speaker === '' ? '' : `[ ${speaker} ]`;
  
//       return `${index + 1}\n${entry.startTime} --> ${entry.endTime}\n${labelS} ${text.trim()}\n`;
//     }).join('\n');
//   };

//   const res=convertToSUbtitle(result)
//   console.log(res)

// function twoSum(nums, target) {
//   const numMap = new Map();
//   for (let i = 0; i < nums.length; i++) {
    
//       const num = nums[i];
//       const complement = target - num;

//       if (numMap.has(complement)) {
//           return [numMap.get(complement), i];
//       }
//       numMap.set(num, i);
//   }

//   // If no solution is found, return an empty array or null
//   return [];
// }

// // Example usage:
// const nums = [2, 7, 11, 15];
// const target = 9;
// const result = twoSum(nums, target);
// console.log(result); // Output: [0, 1]

// Input: arr[] = {10, 4, 3, 50, 23, 90}
// Output: 90, 50, 23

// const threeLargest=(array)=>{
//   const result=[]
//    array.sort((a,b)=>a-b)
//    result.push(array[array.length-1],array[array.length-2],array[array.length-3])
//    console.log(result)
// }

// threeLargest([10, 4, 3, 50, 23, 90])


// const threeLargest=(array)=>{
//  let first=-Infinity, second =-Infinity,third=-Infinity
//  for(let nums of array){
//   if(nums>first){
//     [first,second,third]=[nums,first,second]
//   }
//   else if(nums>second){
//     [third,second]=[second,nums]
//   }
//   else if(nums>third){
//     third=nums
//   }

//  }
   
//  console.log([first,second,third])
// }

// threeLargest([10, 4, 3, 50, 23, 90])

const AWS = require("aws-sdk");


AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
  region: config.AWS_REGION,
});

const rekognition = new AWS.Rekognition();
const transcribeService = new AWS.TranscribeService();
const bedrockClient = new AWS.BedrockRuntime();

async function summarizeScene(labels,propmt) {
    try {
      const commaSeparatedString = arrayToCommaSeparatedString(labels);
    const response = await bedrockQuery(commaSeparatedString,propmt);
      return response;
    } catch (error) {
      console.error('Error invoking Bedrock model:', error);
    }
  }

  
function arrayToCommaSeparatedString(array) {
    return array.join(',');
  }

  
async function bedrockQuery(labels,prompt) {
    const modelId = 'cohere.command-r-plus-v1:0'; // Replace with the model you want to use
    const promptText =  'Generate a short caption summarizing the scene.';
    const requestBody = {
      chat_history: [
        {
                role: "USER",
                 message: labels
              },
              {
                      role: "CHATBOT",
                      message: prompt
                     }
      ],
      message: promptText
    };
  
    try {
      const params = {
        modelId: modelId,
        body: JSON.stringify(requestBody),
        accept: '*/*',
        contentType: 'application/json',
      };
  
      console.log(params);
      const response = await bedrockClient.invokeModel(params).promise();
  
      const buffer = Buffer.from(response.body);
      const summaryFromBuffer = decoder.write(buffer);
      const responseData = JSON.parse(summaryFromBuffer);
      return responseData.text;
    } catch (error) {
      console.error(`Error querying Bedrock service: ${error}`);
      return "";
    }
  }
async function analyzeClip(clip) {
  try {
    const clipParams = {
      Video: {
        S3Object: {
          Bucket: 'phase2-rawvideo',
          Name: clip,
        },
      },
    };

    // Start video analysis job
    console.log('Job starting for the labeling');
    const analysisResult = await rekognition.startLabelDetection(clipParams).promise();
    const jobId = analysisResult.JobId;

    console.log('Job waiting for the labeling');

    // Wait for video analysis job to complete
    await waitForJobCompletion1(jobId);
    console.log('Job completed for the labeling');

    // Get results of video analysis
    const result = await rekognition.getLabelDetection({ JobId: jobId }).promise();
    const labels = result.Labels.map(label => ({
      Name: label.Label.Name,
      Confidence: label.Label.Confidence
    }));
    console.log(labels,'labels')
    // Clean and filter labels
    const filteredLabels = cleanAndFilterLabels(labels, );
    console.log(filteredLabels,'filteredLabels')
   
    const workRate=3.125
    const duration=10
    const wordLimit = Math.floor(duration * workRate);
const prompt = `Create a detailed and descriptive caption for blind people based on the following context. Please summarize the content within ${duration} seconds of the audio, keeping the summary under ${wordLimit} words:`;
  //  const prompt =`Create a detailed and descriptive caption for blind people based on the following context:`
const summery=await summarizeScene(filteredLabels,prompt);
   console.log(summery)
    return summery;
  } catch (error) {
    console.error("Error analyzing clip:", error);
    throw error;
  }
}

// 3.125

function cleanAndFilterLabels(labels, threshold) {
  let filteredLabels = labels.filter(label => label.Confidence > threshold);
  let uniqueLabels = [...new Set(filteredLabels.map(label => label.Name.toLowerCase().trim()))];
  return uniqueLabels;
}



async function waitForTranscriptionJobCompletion(jobName) {
  while (true) {
    const result = await transcribeService.getTranscriptionJob({ TranscriptionJobName: jobName }).promise();
    const jobStatus = result.TranscriptionJob.TranscriptionJobStatus;

    if (jobStatus === 'COMPLETED') {
      const transcriptUri = result.TranscriptionJob.Transcript.TranscriptFileUri;
      const transcript = await fetch(transcriptUri).then(response => response.json());
      return transcript.results.transcripts[0].transcript;
    } else if (jobStatus === 'FAILED') {
      throw new Error('Transcription job failed');
    } else {
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}



function extractTagsFromSentence(sentence, metadataLabels) {
  return metadataLabels.filter(metadata => sentence.includes(metadata.label));
}

function tagTextWithMetadata(segmentedText, metadataLabels) {
  return segmentedText.map(sentence => {
    let tags = extractTagsFromSentence(sentence, metadataLabels);
    return { sentence: sentence, tags: tags };
  });
}

async function waitForJobCompletion1(jobId) {
  while (true) {
    try {
      const { JobStatus } = await rekognition.getLabelDetection({ JobId: jobId }).promise();
      console.log(JobStatus, 'JobStatus');

      if (JobStatus === "IN_PROGRESS") {
        console.log("Label detection job is still in progress.");
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else if (JobStatus === "FAILED") {
        console.log("Label detection job failed.");
        throw new Error("Label detection failed");
      } else {
        break;
      }
    } catch (error) {
      console.error("Error in waitForJobCompletion1:", error);
      throw error;
    }
  }
}


analyzeClip('clips/test/clip_0.mp4');
