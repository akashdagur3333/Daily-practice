
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


// function findMajorityElement(arr) {
// }

// // Test the function
// const arr1 = [3, 3, 4, 2, 4, 4, 2, 4, 4];
// console.log(findMajorityElement(arr1)); // Output: 4

// const arr2 = [3, 3, 4, 2, 4, 4, 2, 4];
// console.log(findMajorityElement(arr2)); // Output: null
