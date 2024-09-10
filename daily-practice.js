const { str } = require("16");

console.log('let start with daily practice')

//1. How to find the maximum and minimum element in an array?

// function findMaxAndMin(arr) {
//     if (arr.length === 0) {
//         return { maximum: undefined, minimum: undefined };
//     }

//     let maximum = arr[0];
//     let minimum = arr[0];
//     for(let x of arr){
//         if(x>maximum){
//             maximum=x
//         }
//         else if(x<minimum){
//             minimum=x
//         }
//     }
//   return {maximum,minimum}
// }

// const arr1 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
// console.log(findMaxAndMin(arr1))

// 2. How to reverse an array?

// function reverseArray(arr) {
//   if(arr.length==0){
//     return []
//   }
//   let left =0;
//   let right=arr.length-1
//   while(left<right){
//     [arr[left],arr[right]]=[arr[right],arr[left]]
//     left++;
//     right--
//   }
//   return arr
// }

// // Test the function
// const arr4 = [1, 2, 3, 4, 5];
// console.log(reverseArray(arr4))

// 3.How to find the second largest element in an array?

// function findSecondLargest(arr){
//     if(arr.length<2){
//         return 'invalid data'
//     }
//     let largest=-Infinity;
//     let secondLargest=-Infinity;
//     for(const x of arr){
//         console.log(x)
//         if(x>largest){
//             secondLargest=largest;
//             largest=x
//         }
//         else if(x>secondLargest){
//             secondLargest=x
//         }
//     }
//     return {largest,secondLargest}

// }

// const arr1 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
// console.log(findSecondLargest(arr1)); 

// 4.  How to remove duplicates from an array?


// function removeDuplicate(arr){
//     if(arr.length==0){
//         return []
//     }
//     return [...new Set(arr)]
// }
// const arr1 = [1, 2, 2, 3, 4, 4, 5];
// console.log(removeDuplicate(arr1))


// 5  How to find the majority element in an array (if it exists)?


// function findMajorityElement(nums) {
//     let candidate = null;
//     let count = 0;
//     // Step 1: Find the candidate
//     for (let num of nums) {
//         if (count === 0) {
//             candidate = num;
//             count = 1;
//         } else if (num === candidate) {
//             count++;
//         } else {
//             count--;
//         }


//     }
//     count = 0;
//     for (let num of nums) {
//         if (num === candidate) {
//             count++;
//         }
//     }
//     return count > Math.floor(nums.length / 2) ? candidate : null;
// }


// function findMajorityElement(arr){
//     let count=0;
//     let compare=null;
// for(let a of arr){
//     if(count==0){
//         compare=a;
//         count=1
//     }
//     else if (compare==a){
//         count++
//     }
//     else{
//         count--
//     }
// }

// count=0
// for(let b of arr){
//     if(compare==b){
//         count++
//     }
// }

// return count>Math.floor(arr.length/2)?compare:null
// }


// // // Test the function
// const arr1 = [3, 3, 4, 2, 4, 4, 2, 4, 4];
// console.log(findMajorityElement(arr1)); // Output: 4

// const arr2 = [3, 3, 4, 2, 4, 4, 2, 4];
// console.log(findMajorityElement(arr2)); // Output: null



// rotateArray  const nums = [1, 2, 3, 4, 5, 6, 7];


// const rotateArray=(arr)=>{
// let left=0;
// let right=arr.length-1
// let temp=0;
// while(left<right){
//     temp=arr[left]
//     arr[left]=arr[right]
//     arr[right]=temp
//     left++;
//     right--
// }
// }

// const nums =[3, 3, 4, 2, 4, 4, 2, 4, 4];
// rotateArray(nums)


// function rotateArray(arr,k){
//     let start=0;
//    for(let i=arr.length-1;i>=0;i--){
//       let temp=arr[i];
//       arr[start]=temp
//     console.log(arr[i])
//    }
// }

// const nums = [1, 2, 3, 4, 5, 6, 7];
// const k = 3;
// rotateArray(nums, k);

// function intersection(arr1,arr2){
//  const check=new Set(arr1)
//  const result=new Set()
//  for(let a of arr2){
//     if(check.has(a)){
//     result.add(a)
//     }
//  }
//  return Array.from(result)
// }

// // const nums1 = [4, 9, 5];
// // const nums2 = [9, 4, 9, 8, 4];
// // const nums1 = [1, 2, 3];
// // const nums2 = [4, 5, 6];

// // const nums1 = [7, 7, 8, 8];
// // const nums2 = [8, 8, 9, 9];

// // const nums1 = [10, 20, 30, 40, 50];
// // const nums2 = [40, 50, 60, 70, 80];

// const nums1 = [15, 25, 35, 45, 55];
// const nums2 = [65, 75, 85, 95];

// const result = intersection(nums1, nums2);
// console.log(result);  // Output: [9, 4]


// const nonZeroes=(arr)=>{
// let realPos=0
//    for(let i =0;i<arr.length;i++){
//     if(arr[i]!=0){
//         if(realPos!=i){
//             [arr[realPos],arr[i]]=[arr[i],arr[realPos]]
//         }
//       realPos++
//       console.log(arr)

//     }
//    }
//    return arr
// //   console.log(arr)

// }
// let nums = [0, 1, 0, 3, 12]

// console.log(nonZeroes(nums))

// function sum(num){
//   var result = 0;
//   for(var i = 0; i <= num.length; i++){
//     result += num[i]
//   }
//   return result;
// }

// var numbers = [1,2,3,4,5];
// console.log(sum(numbers));


// const isPalindrome =(name)=>{
//     name=name.toLowerCase().replace(/[^a-z0-9]/g, '');
//     let left=0
//     let right=name.length-1
//     while(left<right){
//         if(name[left]!=name[right]){
//            return false;
//         }
//         left++;
//         right--;
//     }
//    return true;
// }


// // console.log(isPalindrome("raCecar")); // Output: true
// // console.log(isPalindrome("hello"));   // Output: false
// console.log(isPalindrome("A man, a plan, a canal, Panama")); // Output: true

// const countFrequency=(s)=>{
//     const result={}
// for(let a of s){
//   result[a]=(result[a] || 0)+1
// }
// return result
// }

// let name="hello";
// // console.log(countFrequency(name))
// console.log(countFrequency("mississippi")); 


// // How to reverse a string?
// const reverseString = (s) => {
//     // Convert the string to an array
//     let arr = s.split('');

//     // Two-pointer approach
//     let left = 0;
//     let right = arr.length - 1;
    
//     while (left < right) {
//         // Swap the characters
//         let temp = arr[left];
//         arr[left] = arr[right];
//         arr[right] = temp;

//         // Move pointers towards the center
//         left++;
//         right--;
//     }

//     // Join the array back into a string and return it
//     return arr.join('');
// };

// // Example usage
// console.log(reverseString("hello"));   // Output: "olleh"




// let name="hello";
// console.log(reverseString(name))


// const areAnagrams=(str1,str2)=>{
//     const freq={}
//     for(let a of str1){
//         freq[a]=(freq[a] || 0)+1
//     }
//     for(let b of str2){
//         if(!freq[b]){
//             return false
//         }
//         freq[b]--;
//     }
//     return true
// }

// console.log(areAnagrams("listen", "silent"));  // Output: true
// console.log(areAnagrams("hello", "oellh"));    // Output: true
// console.log(areAnagrams("hello", "world")); // false


// const substring =(name)=>{
//     let storage=new Map();
//     let maxLength = 0;
//     for(let left=0, right=0; right<name.length;right++){
//         if(storage.has(name[right])){
//             left=Math.max(storage.get(name[right])+1,left);
//         }
//         storage.set(name[right],right);
//         maxLength=Math.max(maxLength,right-left+1)
//     }
//     return maxLength
// }

// Input: s = "abcabcbb"
// console.log(substring(s))
// Output: 3
// Explanation: The answer is "abc", with the length of 3.



// function getLucky(s, k) {
//     let data;
//     for(let d of s){
//         if(data!=undefined){
//             data+=transformLetterToNumber(d).toString()
//         }
//         else{
//             data=transformLetterToNumber(d).toString()
//         }
//     }
//     let sum=0;
//     while(k!=0){
//         for(let i =0 ; i<data.length;i++){
//             sum+=Number(data[i])
//            }
//            data=sum.toString()
//            sum=0;
//            k--;
//     }


//    return data;
// };

// function transformLetterToNumber(letter) {
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//   return alphabet.indexOf(letter.toLowerCase())+1;  
// }

// const result=getLucky("leetcode",  2)
// console.log(result)


// var twoSum = function(nums, target) {
//     let remaining=0;
//     let foundIndex=[]
//     for(let i =0;i<nums.length;i++){
   
//         if(nums[i]<target){
//            foundIndex.push(i)
//         }
//         remaining=target-nums[i];
//         for(let j =i+1;j<nums.length;j++){
//             if(remaining==nums[j]){
//                 remaining-=nums[j];
//                 foundIndex.push(j)
//                 return foundIndex
//             }
//         }
//      foundIndex=[]
//     }
// };

// const res=twoSum([3,3], 6)
// console.log(res)

// var isPalindrome = function(x) {
//    x= JSON.stringify(x)
//     const d= x.split('')
//     console.log(d)
//     console.log(d.reverse())
//    const da= JSON.stringify(d) === JSON.stringify(d.reverse())
//     if(da==true){
//         return true
//     }
   
//    return false;


// };


// function isPalindrome(x) {
//     // Negative numbers are not palindromes
//     if (x < 0) return false;

//     // Convert the number to a string
//     const str = x.toString();

//     // Compare the original string with the reversed string
//     const reversedStr = str.split('').reverse().join('');
    
//     return str === reversedStr;
// }


// console.log(isPalindrome(-121))


// const roman = {
//     'I': 1,
//     'V': 5,
//     'X': 10,
//     'L': 50,
//     'C': 100,
//     'D': 500,
//     'M': 1000
// };
// var romanToInt = function(s) {
//     let sum=0;
//     for (let i = 0; i < s.length; i++) {
//         // If the current numeral is less than the next numeral, subtract it
//         if (i < s.length - 1 && roman[s[i]] < roman[s[i + 1]]) {
//             sum -= roman[s[i]];
//         } else {
//             // Otherwise, add it
//             sum += roman[s[i]];
//         }
//     }

//     return sum
// };

// console.log(romanToInt("MCMXCIV"))


// var longestCommonPrefix = function(strs) {
//     // If the array is empty, return an empty string
//     if (strs.length === 0) return "";

//     // Start by assuming the first string is the longest common prefix
//     let prefix = strs[0];

//     // Compare the prefix with each string in the array
//     for (let i = 1; i < strs.length; i++) {
//         // Loop until the current string starts with the prefix
//         while (strs[i].indexOf(prefix) !== 0) {
//             // Reduce the prefix by one character from the end
//             console.log(prefix.substring(0, prefix.length - 1))
//             prefix = prefix.substring(0, prefix.length - 1);

//             // If the prefix becomes empty, return ""
//             if (prefix === "") return "";
//         }
//     }

//     return prefix;
// };

// // Example usage:
// console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
// console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // Output: ""

// const bracketMap = {
//     '(' :')',
//     '{': '}',
//     '[': ']'
// };

// var isValid = function(s) {
//     if(s.length%2!=0){
//         return false;
      
//         }
//         let start=0;
//         let end=s.length-1;
//         while(start<end){
//            if( bracketMap[s[start]]!=s[end]){
//             return false
//            }
//             start++;
//             end--
//     }
//     return true
// };

// console.log(isValid( "([])"))

// const bracketMap = {
//     '(': ')',
//     '{': '}',
//     '[': ']'
// };

// var isValid = function(s) {
//     // If the string has an odd length, it cannot be valid
//     if (s.length % 2 !== 0) {
//         return false;
//     }

//     // Stack to keep track of opening brackets
//     const stack = [];

//     for (let i = 0; i < s.length; i++) {
//         let char = s[i];
//         // If it's an opening bracket, push it onto the stack
//         if (bracketMap[char]) {
//             stack.push(char);

//         } else {
//             // If it's a closing bracket, check if it matches the last opened one
//             const lastOpened = stack.pop();
//             console.log(bracketMap[lastOpened],char)
//             if (bracketMap[lastOpened] !== char) {
//                 return false;
//             }
//         }
//     }

//     // If the stack is empty at the end, it means all brackets were properly closed
//     return stack.length === 0;
// };

// var isValid = function(s) {
//     let stack = []; // create an empty stack to store opening brackets
//     for (let c of s) { // loop through each character in the string
//         if (c === '(' || c === '{' || c === '[') { // if the character is an opening bracket
//             stack.push(c); // push it onto the stack
//         } else { // if the character is a closing bracket
//             if (!stack.length || // if the stack is empty or 
//                 (c === ')' && stack[stack.length - 1] !== '(') || // the closing bracket doesn't match the corresponding opening bracket at the top of the stack
//                 (c === '}' && stack[stack.length - 1] !== '{') ||
//                 (c === ']' && stack[stack.length - 1] !== '[')) {
//                 return false; // the string is not valid, so return false
//             }
//             stack.pop(); // otherwise, pop the opening bracket from the stack
//         }
//         console.log(stack)
//     }
//     return !stack.length; // if the stack is empty, all opening brackets have been matched with their corresponding closing brackets,
//                           // so the string is valid, otherwise, there are unmatched opening brackets, so return false
// };

// // Example usage:
// console.log(isValid("([])"));     // Output: true
// console.log(isValid("()[]{}"));   // Output: true
// console.log(isValid("(]"));       // Output: false
// console.log(isValid("([)]"));     // Output: false
// console.log(isValid("{[]}"));     // Output: true


// var mergeTwoLists = function(list1, list2) {
//     if(list1.length==0 && list2.length==0){
//         return []
//     }
//     if(list1.length!=0 && list2.length==0){
//         return list1
//     }
//     if(list2.length!=0 && list1.length==0){
//         return list2
//     }
//     const result=[];
//     let len=list1.length<list2.length?list1.length:list2.length;
//    for(i=0;i<len;i++){
//     if(list1[i]<list2[i]){
//         result.push(list1[i])
//         result.push(list2[i])

//     }
//     else{
//         result.push(list2[i])
//         result.push(list1[i])

 
//     }
//     console.log(result)
//    }
// };

// Definition for singly-linked list.
// function ListNode(val, next = null) {
//     this.val = val;
//     this.next = next;
// }

// var mergeTwoLists = function(list1, list2) {
//     // Create a dummy node to simplify the merging process
//     let dummy = new ListNode();
//     let current = dummy;

//     // While both lists are not empty
//     while (list1 !== null && list2 !== null) {
//         if (list1.val < list2.val) {
//             current.next = list1;
//             list1 = list1.next;
//         } else {
//             current.next = list2;
//             list2 = list2.next;
//         }
//         current = current.next;
//     }

//     // If one of the lists is not empty, append the rest of the elements
//     current.next = list1 !== null ? list1 : list2;

//     // Return the merged list starting from the node after the dummy node
//     return dummy.next;
// };

// // Example usage with linked lists:
// let list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
// let list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

// console.log(mergeTwoLists(list1, list2));


// Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to the target. You may assume that each input would have exactly one solution.


// const twoSum=(arr,target)=>{
//     const map=new Map()
//     for(let i=0;i<arr.length;i++){
//     const complement=target-arr[i];
//     if(map.has(complement)){
//         return [map.get(complement),i]
//     }
//     map.set(arr[i],i)
//     }
//     return []
// }

// console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]






// const twoSum=(arr,target)=>{
//     const map=new Map()
//     for(let i=0;i<arr.length;i++){
//         const complement=target-arr[i]
//      if(map.has(complement)){
//         return [map.get(complement),i]
//      }
//      map.set(arr[i],i)
//     }
//     return []
// }



// console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]




// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

// const maxSubArray=(arr)=>{
//     let currentsum=arr[0];
//     let maxsum=arr[0]
//     if(arr.length){
//         for(let i=0;i<arr.length;i++){
//           currentsum=Math.max(arr[i],currentsum+arr[i]);
//           maxsum=Math.max(maxsum,currentsum);
//         }
//         return maxsum
//     }
//     return '';
// }

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6



// Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".

// const longestCommonPrefix=(arr)=>{
//     let prefix=arr[0]
//     for(let i=0;i<arr.length;i++){
//       while(arr[i].indexOf(prefix) !==0){
//       prefix=prefix.substring(0,prefix.length-1)
//       if(prefix=="") return "";

//       }
//     }
//     return prefix
// }

// console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"





// const longestCommonPrefix=(arr)=>{
//     let prefix=arr[0];
//     if(!arr.length) return ""
//     for(let i=0;i<arr.length;i++){
//         while(arr[i].indexOf(prefix)!=0){
//            prefix=prefix.substring(0,prefix.length-1);

//            if(prefix=="") return "";
//         }
//     }
//     return prefix
// }





// console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"



// This solution simulates the behavior of a queue (FIFO) using two stacks (LIFO). Elements are added to one stack and moved to another stack when dequeuing. The time complexity for both enqueue and dequeue operations is O(1) on average.


// class Queue{

//     constructor(){
//         this.stack1=[];
//         this.stack2=[];
//     }


//     enqueue(x){
//         this.stack1.push(x)
//     }

//     dequeue(){
//         if(this.stack2.length==0){
//             while(this.stack1.length>0){
//                 this.stack2.push(this.stack1.pop())
//             }
//         }
//         return this.stack2.pop()
//     }
// }

// const queue=new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// console.log(queue.dequeue())
// console.log(queue.dequeue())



// const moveZeroes=(arr)=>{
//     let index=0;
//     for(let i=0;i<arr.length;i++){
//         if(arr[i]!=0){
//             arr[index++]=arr[i];
//         }
//     }

//     for(let j=index;j<arr.length;j++){
//       arr[j]=0
//     }
// return arr
// }

// const moveZeroes=(arr)=>{
//  let index=arr.length-1;
//  for(let i=arr.length-1;i>=0;i--){
//     if(arr[i]!=0){
//         arr[index--]=arr[i];
//     }
//  }
//  while(index>=0){
//     arr[index--]=0
//  }
//  return arr
// }




// const nums = [0, 1, 0, 3, 12];
// console.log(moveZeroes(nums));


// function productExceptSelf(nums) {
//     const result = new Array(nums.length).fill(1);
//     let prefix = 1;
//     let suffix = 1;

//     for (let i = 0; i < nums.length; i++) {
//         result[i] *= prefix;
//         prefix *= nums[i];
//         console.log(result[i])
//     }

//     for (let i = nums.length - 1; i >= 0; i--) {
//         result[i] *= suffix;
//         suffix *= nums[i];
//         console.log(result[i])

//     }


//     return result;
// }


// const nums = [1, 2, 3, 4];
// console.log(productExceptSelf(nums)); // Output: [24, 12, 8, 6]


// function findDuplicate(nums) {
//     let slow = nums[0];
//     let fast = nums[0];
//     do {
//         slow = nums[slow];
//         fast = nums[nums[fast]];
//     } 
//     while (slow !== fast);
//     slow = nums[0];
//     while (slow !== fast) {
//         slow = nums[slow];
//         fast = nums[fast];
//     }

//     // return slow;
// }


// const nums = [1, 3, 4, 2, 2];
// console.log(findDuplicate(nums)); // Output: 2


// const lengthOfLongestSubstring=(str)=>{
//     let left=0;
//     let maxLength=0
//     const map=new Map()
//     for(let i=0;i<str.length;i++){
//         if(map.has(str[i])){
//             left=Math.max(map.get(str[i])+1,left)
     
//         }
//         map.set(s[i],i)
//         maxLength=Math.max(maxLength,i-left+1)
//     }
//     return str.slice(0,maxLength)
// }

// const s = "abcdabcdbb";
// console.log(lengthOfLongestSubstring(s)); // Output: 3 ("abc" is the longest substring)


// function isAnagram(s, t) {
//     if(s.length!=t.length) return false;
// let result=new Array(26).fill(0);
// for(let i=0;i<s.length;i++){
//     result[s.charCodeAt(i)-97]++;
//     result[t.charCodeAt(i) -97]--;
// }
// return result.every(num=>num===0)
// }

// const s = "anagram";
// const t = "nagaram";
// console.log(isAnagram(s, t)); // Output: true

// function groupAnagrams(strs) {
//     const map = new Map();

//     for (let str of strs) {
//         const sorted = str.split('').sort().join('');
        
//         if (!map.has(sorted)) {
//             map.set(sorted, []);
//         }
//         map.get(sorted).push(str);
//     }

//     return Array.from(map.values());
// }

// const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
// console.log(groupAnagrams(strs)); 
// // Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

// const findMaxAndMin=(arr)=>{
//     let min=arr[0];
//     let max=arr[0];
//     if(!arr.length) return {max:undefined,min:undefined};
//     for(let a of arr){
//         if(a>max){
//             max=a
//         }
//         else if(a<min){
//             min=a
//         }
//     }
//     return {max,min}
// }



// const arr1 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
// console.log(findMaxAndMin(arr1))


// const reverseArray=(arr)=>{
//     let left =0;
//     let right=arr.length-1;
//     while(left<right){
//        [ arr[left],arr[right]]=[ arr[right],arr[left]]
//        left++;
//        right--
//     }
//     return arr
// }

// const arr4 = [1, 2, 3, 4, 5];
// console.log(reverseArray(arr4))


// const findSecondLargest=(arr)=>{
//     let largest=-Infinity;
//     let secondLargest=-Infinity

//     for(let a of arr)
//         {
//             if(a>largest){
//                 secondLargest=largest;
//                 largest=a
//             }
//             else if (a>secondLargest){
//                 secondLargest=a
//             }
//         }
//         return {largest,secondLargest}
// }

// const arr1 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
// console.log(findSecondLargest(arr1)); 



// const nonZeroes=(arr)=>{
//     let realpos=0;
//     for(let i=0;i<arr.length;i++){
//         if(arr[i]!=0){
//             if(realpos!=i){
//                 [arr[realpos],arr[i]]= [arr[i],arr[realpos]]
//             }
//             realpos++
//         }

//     }
//     return arr
// }


// let nums = [0, 1, 0, 3, 12]

// console.log(nonZeroes(nums))


// const isPalindrome=(name)=>{
//     name=name.toLowerCase().replace('/[^a-z0-9]/g','')
//     let left=0;
//     let right=name.length-1;
//     while(left<right){
//         if(name[left]!=name[right]){
//             return false;
//         }
//         left++;
//         right--;

//     }
//     return true
// }


// console.log(isPalindrome("raCecar")); // Output: true

// const countFrequency=(name)=>{
//     const result={};
//     for(let a of name){
//         result[a]=(result[a] ||0)+1
//     }
//     return result
// }


// console.log(countFrequency("mississippi")); 



// // How to reverse a string?
// const reverseString = (s) => {
//     // Convert the string to an array
//     let arr = s.split('');

//     // Two-pointer approach
//     let left = 0;
//     let right = arr.length - 1;
    
//     while (left < right) {
//         // // Swap the characters
//         // let temp = arr[left];
//         // arr[left] = arr[right];
//         // arr[right] = temp;

//         [arr[left],arr[right]]=  [arr[right],arr[left]]
//         // Move pointers towards the center
//         left++;
//         right--;
//     }

//     // Join the array back into a string and return it
//     return arr.join('');
// };

// console.log(reverseString("hello"));   // Output: "olleh"