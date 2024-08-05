// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Set up multer for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Endpoint to handle file upload and classification
// app.post('/classify', upload.single('file'), async (req, res) => {
//   const audioFilePath = req.file.path;
// console.log(audioFilePath)
//   const form = new FormData();
//   form.append('file', fs.createReadStream(audioFilePath));

//   try {
//     const response = await axios.post('https://tensorflow.closedcaptions.ai/classify', form, {
//       headers: {
//         ...form.getHeaders()
//       }
//     });
//     const sounds = response.data;
//     const groupedSounds = groupSounds(sounds, 5);
//     const prioritizedSounds = groupedSounds.map(group => ({
//       start_time: group[0].start_time,
//       end_time: group[group.length - 1].end_time,
//       dominant_sound: getDominantSound(group)
//     }));
 

//     const frequentSounds = filterRepeatedSounds(prioritizedSounds);
//     const mergedSounds = mergeConsecutiveSounds(frequentSounds);
//     res.json(mergedSounds);
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: error.message });
//   } finally {
//     // Clean up the uploaded file
//     fs.unlink(audioFilePath, (err) => {
//       if (err) console.error('Failed to delete file:', err);
//     });
//   }
// });


// // Function to group sounds
// function groupSounds(sounds, groupSize) {
//     const groups = [];
//     for (let i = 0; i < sounds.length; i += groupSize) {
//       const group = sounds.slice(i, i + groupSize);
//       groups.push(group);
//     }
//     return groups;
//   }
  
//   // Function to determine the dominant sound in a group
//   function getDominantSound(group) {
//     const soundCounts = {};
//     group.forEach(item => {
//       const sound = item.sound.present;
//       if (soundCounts[sound]) {
//         soundCounts[sound]++;
//       } else {
//         soundCounts[sound] = 1;
//       }
//     });
  
//     let dominantSound = null;
//     let maxCount = 0;
//     for (const sound in soundCounts) {
//       if (soundCounts[sound] > maxCount) {
//         maxCount = soundCounts[sound];
//         dominantSound = sound;
//       }
//     }
    
//     return dominantSound;
//   }


// // Function to filter sounds based on repetition
// function filterRepeatedSounds(sounds) {
//     const soundCounts = sounds.reduce((counts, sound) => {
//       counts[sound.dominant_sound] = (counts[sound.dominant_sound] || 0) + 1;
//       return counts;
//     }, {});
  
//     const repeatedSounds = sounds.filter(sound => soundCounts[sound.dominant_sound] > 1);
  
//     return repeatedSounds.length > 0 ? repeatedSounds : sounds;
//   }

//   // Function to merge consecutive entries with the same dominant sound
// function mergeConsecutiveSounds(sounds) {
//     if (sounds.length === 0) return sounds;
  
//     const mergedSounds = [sounds[0]];
//     for (let i = 1; i < sounds.length; i++) {
//       const lastSound = mergedSounds[mergedSounds.length - 1];
//       const currentSound = sounds[i];
//       if (lastSound.dominant_sound === currentSound.dominant_sound) {
//         lastSound.end_time = currentSound.end_time;
//       } else {
//         mergedSounds.push(currentSound);
//       }
//     }
  
//     return mergedSounds;
//   }
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Set up multer for file uploads
// const upload = multer({ dest: 'uploads/' });


// const ignoredSounds = [
//     "Silence",
//     "sound effects",
//   ];

//   const prioritySounds = [
//     "machine gun firing",
//   ];

//   const alwaysPassThroughSounds = [
//     "always pass through sound 1",
//     "always pass through sound 2",
//     // Add more sounds as needed
//   ];


// // Endpoint to handle file upload and classification
// app.post('/classify', upload.single('file'), async (req, res) => {
//   const audioFilePath = req.file.path;
//   console.log(audioFilePath);
//   const form = new FormData();
//   form.append('file', fs.createReadStream(audioFilePath));

//   try {
//     const response = await axios.post('https://tensorflow.closedcaptions.ai/classify', form, {
//       headers: {
//         ...form.getHeaders()
//       }
//     });
//     const sounds = response.data;
//     // res.json(sounds);
//     const prioritizedSounds = sounds.filter(sound => prioritySounds.includes(sound.sound.present));
//     const interval = 20; 
//     const soundsByInterval = splitByInterval(sounds, interval);
//     const groupedSounds = soundsByInterval.flatMap(intervalSounds => groupSounds(intervalSounds, 5));
//     const nonPrioritySounds = groupedSounds.map(group => ({
//       start_time: group[0].start_time,
//       end_time: group[group.length - 1].end_time,
//       dominant_sound: getDominantSound(group)
//     }));

//     const frequentSounds = filterRepeatedSounds(nonPrioritySounds);
//     const final = frequentSounds.filter(sound => !ignoredSounds.includes(sound.dominant_sound));
//     const mergedSounds = mergeConsecutiveSounds(final);
//   // Combine priority sounds with the processed remaining sounds
//   const finalSounds = mergeConsecutiveSounds([...prioritizedSounds, ...mergedSounds]);
//     res.json(finalSounds);
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: error.message });
//   } finally {
//     // Clean up the uploaded file
//     fs.unlink(audioFilePath, (err) => {
//       if (err) console.error('Failed to delete file:', err);
//     });
//   }
// });

// // Function to split sounds by time intervals
// function splitByInterval(sounds, interval) {
//   const groupedIntervals = [];
//   let currentInterval = [];
//   let currentIntervalEnd = interval;

//   sounds.forEach(sound => {
//     if (sound.end_time <= currentIntervalEnd) {
//       currentInterval.push(sound);
//     } else {
//       groupedIntervals.push(currentInterval);
//       currentInterval = [sound];
//       currentIntervalEnd += interval;
//     }
//   });

//   if (currentInterval.length > 0) {
//     groupedIntervals.push(currentInterval);
//   }

//   return groupedIntervals;
// }

// // Function to group sounds by a fixed group size
// function groupSounds(sounds, groupSize) {
//   const groups = [];
//   for (let i = 0; i < sounds.length; i += groupSize) {
//     const group = sounds.slice(i, i + groupSize);
//     groups.push(group);
//   }
//   return groups;
// }

// // Function to determine the dominant sound in a group
// function getDominantSound(group) {
//   const soundCounts = {};
//   group.forEach(item => {
//     const sound = item.sound.present;
//     if (soundCounts[sound]) {
//       soundCounts[sound]++;
//     } else {
//       soundCounts[sound] = 1;
//     }
//   });

//   let dominantSound = null;
//   let maxCount = 0;
//   for (const sound in soundCounts) {
//     if (soundCounts[sound] > maxCount) {
//       maxCount = soundCounts[sound];
//       dominantSound = sound;
//     }
//   }

//   return dominantSound;
// }

// // Function to filter sounds based on repetition
// function filterRepeatedSounds(sounds) {
//   const soundCounts = sounds.reduce((counts, sound) => {
//     counts[sound.dominant_sound] = (counts[sound.dominant_sound] || 0) + 1;
//     return counts;
//   }, {});

//   const repeatedSounds = sounds.filter(sound => soundCounts[sound.dominant_sound] > 1);

//   return repeatedSounds.length > 0 ? repeatedSounds : sounds;
// }

// // Function to merge consecutive entries with the same dominant sound
// function mergeConsecutiveSounds(sounds) {
//   if (sounds.length === 0) return sounds;

//   const mergedSounds = [sounds[0]];
//   for (let i = 1; i < sounds.length; i++) {
//     const lastSound = mergedSounds[mergedSounds.length - 1];
//     const currentSound = sounds[i];
//     if (lastSound.dominant_sound === currentSound.dominant_sound) {
//       lastSound.end_time = currentSound.end_time;
//     } else {
//       mergedSounds.push(currentSound);
//     }
//   }

//   return mergedSounds;
// }

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// const ignoredSounds = [
//   "Silence",
//   "sound effects",
// ];


const alwaysPassThroughSounds = [
  "indistinct / foreign chatter",
  "children speaking",
  "shouts",
  "Music",
  "children shout",
  "screams",
  "whispers",
  "laughs",
  "baby laughs",
  "giggles",
  "snickers",
  "chuckles",
  "cries / sobs",
  "baby / infant cries",
  "whimpers",
  "wails / moans",
  "sighs",
  "sings",
  "chants",
  "child sings",
  "groans",
  "grunts",
  "whistles",
  "breathes heavily / breathes shakily",
  "wheezes",
  "snores",
  "gasps",
  "pants",
  "snorts",
  "coughs",
  "clears throat",
  "sneezes",
  "sniffs",
  "footsteps patter",
  "footsteps shuffle",
  "footsteps tap",
  "gargles",
  "cheers",
  "applause",
  "indistinct chatters",
  "crowd murmurs",
  "children chatter",
  "birds chirp",
  "birds squawk",
  "pigeon cooing",
  "insects chirp",
  "crickets chirp",
  "car honks",
  "honks",
  "car alarm rings",
  "truck honks",
  "sirens wail",
  "traffic bustles",
  "helicopter hovers",
  "door sounds",
  "doorbell rings",
  "slams",
  "knocks",
  "keyboard clicks",
  "typewriter clicks",
  "alarm blares",
  "telephone rings",
  "telephone bell rings",
  "cellphone rings",
  "telephone dials",
  "busy signal blares",
  "alarm clock buzzes",
  "sirens wail",
  "buzzer whirring",
  "smoke detector beeps / smoke alarm beeps",
  "fire alarm beeps",
  "camera shutter clicks",
  "loud explosion",
  "gun fires",
  "machine gun fires",
  "shots fire",
  "fireworks crackle",
  "glass clinks",
  "beeps",
  "public sounds",
  "city bustle",
  "thunder rumbles",
  "thunder bangs",
  "rain falls",
  "fire crackles",
  "pop music",
  "hip hop music",
  "beatboxing",
  "rock music",
  "heavy metal",
  "punk rock music",
  "rock and roll music",
  "rhythm and blues music",
  "soul music",
  "reggae music",
  "country music",
  "swing music",
  "bluegrass music",
  "funk music",
  "folk music",
  "middle eastern music",
  "jazz music",
  "disco music",
  "classic music",
  "opera music",
  "electronic music",
  "house music",
  "techno music",
  "dubstep music",
  "drum and bass music",
  "electronica music",
  "electronic dance music",
  "ambient music",
  "trance music",
  "latin music",
  "salsa music",
  "flamenco music",
  "blues music",
  "child music",
  "new-age music",
  "acapella music",
  "african music",
  "afrobeat music",
  "gospel music",
  "asian music",
  "carnatic music",
  "bollywood music",
  "ska music",
  "traditional music",
  "independent music",
  "music plays",
  "lullaby music",
  "video game music",
  "christmas music",
  "dance music",
  "wedding music",
  "uplifting music",
  "sombre music",
  "tender music",
  "tense music",
  "ominous music"
];

const priorityList = [
  "Hums",
  "Raps",
  "Munches",
  "Crunches",
  "Gargles",
  "Stomach rumbles",
  "Hiccups",
  "Hands claps",
  "Snaps fingers",
  "Heartbeat beats",
  "Dog barks",
  "Dog growls",
  "Cat roars",
  "Cat meows",
  "Caterwauls",
  "Horse nickers",
  "Cowbell tolls",
  "Pig grunts",
  "Pig oinks",
  "Goat bleats",
  "Sheep bleats",
  "Fowl clucks",
  "Chicken clucks",
  "Rooster crows",
  "Turkey gobbles",
  "Duck quacks",
  "Goose honks",
  "Birds chirp",
  "Owl hisses",
  "Owl hoots",
  "Howls",
  "Mouse squeaks",
  "Buzzes",
  "Vehicle noises",
  "Tire skids",
  "Tire squeals",
  "Engine roars",
  "Drill rings",
  "Lawn mower whirs",
  "Slams",
  "Squeaks",
  "Clinks",
  "Microwave beeps",
  "Blender grinds",
  "Keys jingles",
  "Shaver hums",
  "Buzzer whirring",
  "Whistles",
  "Clock ticks",
  "Sewing machine hums",
  "Cash register beeps",
  "Printer whirs",
  "Camera shutter clicks",
  "Tools clangs",
  "Hammer bangs",
  "Buzzes",
  "Rasps",
  "Sands",
  "Power tool grinds",
  "Drills",
  "Bursts",
  "Wood creaks",
  "Shatters",
  "Thuds",
  "Ball bounces",
  "Bangs",
  "Scratches",
  "Scrapes",
  "Rubs",
  "Rattles",
  "Crushes",
  "Beeps",
  "Rattles",
  "Chimes",
  "Clangs",
  "Squeals",
  "Creaks",
  "Rustles",
  "Clatters",
  "Sizzles",
  "Clicks",
  "Rumbles",
  "Hums",
  "Motorized vessel",
  "Motorized vessel",
  "Vehicle noises",
  "Car noises",
  "Vehicle noises",
  "Truck noises",
  "Motorcycle noise",
  "Subway sounds",
  "Food sizzles",
  "Chirping",
  "Waterfall crashes",
  "Ocean rumbles",
  "Echoes",
  "Clamours",
  "Mains hums",
  "Sidetone rings",
  "Throbs",
  "Television sounds",
  "Radio sounds",
  "Natural sounds",
  "Musical instrument",
  "Electrical guitar plays",
  "Bass guitar plays",
  "Acoustic guitar plays",
  "Guitar plays",
  "Mandolin plays",
  "Strings play",
  "Ukulele plays",
  "Keyboard plays",
  "Piano plays",
  "Organ plays",
  "Sampler music instrument plays",
  "Keyboard instrument plays",
  "Percussion sounds",
  "Rimshot instrument plays",
  "Drums roll",
  "Bass drum rolls",
  "Cymbals play",
  "Drum beats",
  "Wood block plays",
  "Tambourine plays",
  "Rattles play",
  "Drum beats",
  "Percussion sounds",
  "Marimba instrument plays",
  "Orchestra bells plays",
  "Percussion instrument plays",
  "Steelpan drum plays",
  "Orchestra music plays",
  "Brass instrument plays",
  "Strings play",
  "Wind instrument plays",
  "Bell rings",
  "Church bell tolls",
  "Bell rings",
  "Chimes ring",
  "Harmonica plays",
  "Accordion plays",
  "Bagpipe plays",
  "Didgeridoo plays",
  "Shofar plays",
  "Electronic instrument plays"
];
function mergeTimelineEntries(entries) {
  if (!entries || entries.length === 0) {
    return [];
  }

  let mergedEntries = [];
  let currentEntry = { ...entries[0] }; // Make a copy to avoid modifying the original object

  for (let i = 1; i < entries.length; i++) {
    let nextEntry = entries[i];

    // Check if the sound content is the same as the current entry
    if (nextEntry.sound.present === currentEntry.sound.present &&
        nextEntry.sound.presentParticle === currentEntry.sound.presentParticle) {
      // Extend the end time of the current entry to cover the next entry
      currentEntry.end_time = nextEntry.end_time;

      // Check if the next entry has a "passthrough" tag and add it to the current entry's tags
      if (nextEntry.tags && nextEntry.tags.passthrough) {
        currentEntry.tags = {
          ...currentEntry.tags,
          passthrough: true
        };
      }
    } else {
      // Push the current entry to the merged list and move to the next entry
      mergedEntries.push(currentEntry);
      currentEntry = { ...nextEntry }; // Make a copy to avoid modifying the original object
    }
  }

  // Push the last remaining entry to the merged list
  mergedEntries.push(currentEntry);

  return mergedEntries;
}

// function mergeTimelineEntries(entries) {
//   if (!entries || entries.length === 0) {
//     return [];
//   }

//   let mergedEntries = [];
//   let currentEntry = entries[0];

//   for (let i = 1; i < entries.length; i++) {
//     let nextEntry = entries[i];

//     // Check if the sound content is the same as the current entry
//     if (nextEntry.sound.present === currentEntry.sound.present &&
//         nextEntry.sound.presentParticle === currentEntry.sound.presentParticle) {
//       // Extend the end time of the current entry to cover the next entry
//       currentEntry.end_time = nextEntry.end_time;
//     } else {
//       // Push the current entry to the merged list and move to the next entry
//       mergedEntries.push(currentEntry);
//       currentEntry = nextEntry;
//     }
//   }

//   // Push the last remaining entry to the merged list
//   mergedEntries.push(currentEntry);

//   return mergedEntries;
// }



// Endpoint to handle file upload and classification
app.post('/classify', upload.single('file'), async (req, res) => {
  const audioFilePath = req.file.path;
  console.log(audioFilePath);
  const form = new FormData();
  form.append('file', fs.createReadStream(audioFilePath));

  try {
    const response = await axios.post('https://tensorflow.closedcaptions.ai/classify', form, {
      headers: {
        ...form.getHeaders()
      }
    });
    const sounds = response.data;
    const passThroughSound = sounds.filter(sound => alwaysPassThroughSounds.includes(sound.sound.presentParticle))
    .map(sound => ({ ...sound, tags: 'passthrough' }));
const prioritized=sounds.filter(sound => priorityList.includes(sound.sound.presentParticle)) .map(sound => ({ ...sound, tags: 'priority' }));
  const allData=[...passThroughSound,...prioritized]
  allData.sort((a, b) => a.start_time - b.start_time);
  const mergeData=await mergeTimelineEntries(allData)
  // console.log('alwaysPassthroughSound:',alwaysPassthroughSound)
    // presentParticle

   res.status(200).json(
    mergeData
   )
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.message });
  } finally {
    // Clean up the uploaded file
    fs.unlink(audioFilePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});