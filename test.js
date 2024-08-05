console.log('welcome back ')

// var maxVowels = function(s, k) {
//     const vowels=['a','e','i','o','u']
//     let count=k
//     let max=0;
//     let highest=0;
//     for(let i=0;i<s.length;i++){
//         console.log(s[i]);
//         if(vowels.includes(s[i])){
//             max+=1;
//             if(max==count){
//                 return max
//             }
//             console.log(max)
//         }
//         else{
//             if(max>highest){
//                 highest=max;
//             }
//             max=0;
//         }
//     }
//     return highest
//    };

// var maxVowels = function(s, k) {
//     const vowels=['a','e','i','o','u']
//     let count=k
//     let max=0;
//     let highest=0;
//     for(let i=0;i<s.length;i++){
//         console.log(s[i]);
//         if(vowels.includes(s[i])){
//             max+=1;
//             if(max==count){
//                 return max
//             }
//             console.log(max)
//         }
//         else{
//             if(max>highest){
//                 highest=max;
//             }
//             max=0;
//         }
//     }
//     return highest
//    };

// const result=maxVowels('weallloveyou',7)
// console.log(result,'result')
// const data=require('./data')


// console.log(data['White noise'])

// const data=[
//     {
//       id: 1,
//       startTime: '00:00:00,159',
//       endTime: '00:00:03,839',
//       speechLabel: 'spk_0',
//       text: 'Gold Queen',
//       nonSpeech: ''
//     },
//     {
//       id: 2,
//       startTime: '00:00:03,839',
//       endTime: '00:00:18,860',
//       speechLabel: 'spk_1',
//       text: 'hm queen khwini yeyidumbu nokufa Squtha ke',
//       nonSpeech: ''
//     },
//     {
//       id: 7,
//       startTime: '00:00:03,840',
//       endTime: '00:00:06,720',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(natural sounds)'
//     },
//     {
//       id: 8,
//       startTime: '00:00:09,600',
//       endTime: '00:00:15,840',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(natural sounds)'
//     },
//     {
//       id: 11,
//       startTime: '00:00:09,600',
//       endTime: '00:00:14,600',
//       speechLabel: '',
//       text: '# Queen #',
//       nonSpeech: ''
//     },
//     {
//       id: 12,
//       startTime: '00:00:14,600',
//       endTime: '00:00:19,600',
//       speechLabel: '',
//       text: '# play Tom #',
//       nonSpeech: ''
//     },
//     {
//       id: 9,
//       startTime: '00:00:15,840',
//       endTime: '00:00:17,280',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(vessel moving)'
//     },
//     {
//       id: 3,
//       startTime: '00:00:18,860',
//       endTime: '00:00:30,479',
//       speechLabel: 'spk_0',
//       text: 'namhlanje sekuphelile ngawo ngifuna ukutshena vele ubulale it angithi uyazi',
//       nonSpeech: ''
//     },
//     {
//       id: 4,
//       startTime: '00:00:30,479',
//       endTime: '00:01:02,380',
//       speechLabel: 'spk_1',
//       text: 'ngesikhathi ngizwa iphimbo lakho efonini Kigaqagaqa bengifuna ukukunquma yudabulisa amafu ngaleso sikhathi leso kodwake uke wathi sihambe siyothola ubufakazi kuviolet angazi nje simeleni ngoba mina nawe ushaka siyazi ukuthi ulala mfowethu',
//       nonSpeech: ''
//     },
//     {
//       id: 10,
//       startTime: '00:00:51,360',
//       endTime: '00:00:56,640',
//       speechLabel: '',
//       text: '',
//       nonSpeech: '(natural sounds)'
//     },
//     {
//       id: 13,
//       startTime: '00:00:51,360',
//       endTime: '00:01:01,360',
//       speechLabel: '',
//       text: '♪ music ♪',
//       nonSpeech: ''
//     },
//     {
//       id: 14,
//       startTime: '00:00:59,040',
//       endTime: '00:01:09,039',
//       speechLabel: '',
//       text: '♪ music ♪',
//       nonSpeech: ''
//     },
//     {
//       id: 5,
//       startTime: '00:01:02,380',
//       endTime: '00:01:06,980',
//       speechLabel: 'spk_0',
//       text: 'sonke siyakwazi lokho kwam nawe uyakwazi',
//       nonSpeech: ''
//     },
//     {
//       id: 6,
//       startTime: '00:01:06,980',
//       endTime: '00:01:09,559',
//       speechLabel: 'spk_0',
//       text: 'ngakho ke asekunje',
//       nonSpeech: ''
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
    
//         if ((isSameSpeaker && currentEntry.text && entry.text) || (isSameText && !isNonSpeech) || (isSameNonSpeech && isNonSpeech)) {
//           currentEntry.endTime = entry.endTime;
//           currentEntry.text += ` ${text.trim()}`;
//         } else {
//           mergedEntries.push(currentEntry);
//           currentEntry = { ...entry };
//         }
//       } else {
//         currentEntry = { ...entry };
//       }
//     });
  
//     // Add the last entry
//     if (currentEntry) {
//       mergedEntries.push(currentEntry);
//     }
   
//     return mergedEntries.map((entry, index) => {

//       let text = entry.text || entry.nonSpeech || '';
//       const isMusic = text.includes('♪');
//       if (isMusic) {
//           text = '♪ music ♪';
//       }
//       const speaker = entry.speechLabel || '';
//       const labelS = speaker === '' ? '' : `[ ${speaker} ]`;
//       return `${index + 1}\n${entry.startTime} --> ${entry.endTime}\n ${labelS} ${text.trim()}\n`;
//     }).join('\n');
//   };

//   const result =convertToSUbtitle(data)
//   console.log(result)

