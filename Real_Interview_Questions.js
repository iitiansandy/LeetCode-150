/**
 * FinacPlus Software Interview Question
 * Write a special cipher that is a combination of Caesar’s cipher followed by a simple
 * RLE. The function should receive a string and the rotation number as parameters.
 * Input: special Cipher(“AABCCC”, 3) Output: D2EF3
 */

function specialCipher(str, rotation) {
  // Step 1: Caesar Cipher
  let shifted = "";
  for (let ch of str) {
    let code = ch.charCodeAt(0) - 65;
    let newChar = String.fromCharCode(((code + rotation) % 26) + 65);
    shifted += newChar;
  }

  // Step 2: RLE
  let result = "";
  let count = 1;

  for (let i = 1; i <= shifted.length; i++) {
    if (shifted[i] === shifted[i - 1]) {
      count++;
    } else {
      result += shifted[i - 1];
      if (count > 1) result += count;
      count = 1;
    }
  }

  return result;
}

// Example
// console.log(specialCipher("AABCCC", 3)); // D2EF3

/**
 * Prob-8 Shop with 6 units
 * Write a program that finds the most optimized set of 6 units to shop with for values
 * fewer than 100. Example: Units used are 1, 2, 5, 10, 20, 50 1: 1 (1 unit used) 2: 2 (1
 * unit used) 3: 1+2 (2 units used) 4: 2+2 (2 units used) … 98: 1+2+5+20+20+50 (6 units
 * used) 99: 2+2+5+20+20+50 (6 units used) AVG of units = 3.4
 */

function shopWith6Units(amount) {
  const units = [1, 2, 5, 10, 20, 50];
  const dp = Array.from({ length: amount + 1 }, () => ({
    units: [],
    count: Infinity,
  }));
  dp[0].count = 0;

  for (let i = 1; i <= amount; i++) {
    for (let unit of units) {
      if (i >= unit) {
        const newCount = dp[i - unit].count + 1;
        if (newCount < dp[i].count) {
          dp[i].count = newCount;
          dp[i].units = [...dp[i - unit].units, unit];
        }
      }
    }
  }

  return dp[amount].units;
}

// Example
// console.log(shopWith6Units(99)); // [ 50, 20, 20, 5, 2, 2 ]


// Function Currying
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    }
  };
}

// Example
// console.log(sum(2)(3)(4)); // 9


// Generator Function to yield Fibonacci numbers
function* fibonacciGenerator() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Example
// const fibGen = fibonacciGenerator();
// console.log(fibGen.next().value); // 0
// console.log(fibGen.next().value); // 1
// console.log(fibGen.next().value); // 1
// console.log(fibGen.next().value); // 2
// console.log(fibGen.next().value); // 3
// console.log(fibGen.next().value); // 5


// First Repeating Character

function firstRepeatingChar(str) {
  const set = new Set();

  for (let ch of str) {
    if (set.has(ch)) {
      return ch;
    }
    set.add(ch);
  }
  return null; // No repeating character
}

// let str = "abca";
// Example
// console.log(firstRepeatingChar(str)); // a

// Find Duplicate Elements in Array
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (let num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }
  // return Array.from(duplicates);
  return [...duplicates];
}

// let arr = [1, 2, 3, 4, 2, 5, 1];
// // Example
// console.log(findDuplicates(arr)); // [ 1, 2 ]


// Remove Duplicates

function removeDuplicates(arr) {
  let seenMap = {};
  let uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!seenMap[arr[i]]) {
      seenMap[arr[i]] = true;
      uniqueArr.push(arr[i]);
    }
  }
  return uniqueArr;
}
// Example
// let arr = [1, 2, 3, 4, 2, 5, 1];
// console.log(removeDuplicates(arr)); // [ 1, 2, 3, 4, 5 ]


// Anagram

function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const charCount = {};
  for (let ch of str1) {
    charCount[ch] = (charCount[ch] || 0) + 1;
  }

  for (let ch of str2) {
    if (!charCount[ch]) return false;
    charCount[ch]--;
  }

  return true;
}

// Example
// console.log(areAnagrams("listen", "silent")); // true
// console.log(areAnagrams("hello", "world")); // false

// Frequency Count
// Method 1: Using Object
function frequencyCount(arr) {
  const freqMap = {};
  for (let num of arr) {
    freqMap[num] = (freqMap[num] || 0) + 1;
  }
  return freqMap;
}

// Example
// let arr = [1, 2, 3, 4, 2, 5, 1];
// console.log(frequencyCount(arr)); // { '1': 2, '2': 2, '3': 1, '4': 1, '5': 1 }


// Method 2: Using Map
function frequencyCountMap(arr) {
  const freqMap = new Map();
  for (let num of arr) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  return freqMap;
}

// Example
// let arr = [1, 2, 3, 4, 2, 5, 1];
// console.log(frequencyCountMap(arr)); // Map(5) { 1 => 2, 2 => 2, 3 => 1, 4 => 1, 5 => 1 }

// Method 3 : Using Reduce
function frequencyCountReduce(arr) {
  return arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
}

// Example
// let arr = [1, 2, 3, 4, 2, 5, 1];
// console.log(frequencyCountReduce(arr)); // { '1': 2, '2': 2, '3': 1, '4': 1, '5': 1 }


// Maximum Occurring Character
function maxOccurringChar(str) {
  const freqMap = {};
  for (let ch of str) {
    freqMap[ch] = (freqMap[ch] || 0) + 1;
  }

  let maxChar = '';
  let maxCount = 0;
  for (let [char, count] of Object.entries(freqMap)) {
    if (count > maxCount) {
      maxCount = count;
      maxChar = char;
    }
  }

  return maxChar;
}

// Example
// let str = "abca";
// console.log(maxOccurringChar(str)); // a

// Maximum Occurring Character - Optimized
function maxChar(str) {

    const map = {};

    let max = 0;
    let ans = "";

    for (const ch of str) {
        map[ch] = (map[ch] || 0) + 1;

        if (map[ch] > max) {
            max = map[ch];
            ans = ch;
        }
    }

    return ans;
}
// Example
// let str = "abca";
// console.log(maxChar(str)); // a


// Group Objects by Property
function groupByProperty(arr, property) {
  return arr.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

// Example
// const people = [
//   { name: "Alice", age: 30 },
//   { name: "Bob", age: 30 },
//   { name: "Charlie", age: 25 }
// ];
// console.log(groupByProperty(people, "age")); // { '25': [ { name: 'Charlie', age: 25 } ], '30': [ { name: 'Alice', age: 30 }, { name: 'Bob', age: 30 } ] }


// Find Missing Number in Array
function findMissingNumber(arr, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((acc, num) => acc + num, 0);
  return expectedSum - actualSum;
}
// Example
// let arr = [1, 2, 3, 5];
// let n = 5;
// console.log(findMissingNumber(arr, n)); // 4


// Find Missing Number in Array - Optimized
function findMissingNumberOptimized(arr, n) {
  let xorAll = 0;
  let xorArr = 0;

  for (let i = 1; i <= n; i++) {
    xorAll ^= i;
  }

  for (let num of arr) {
    xorArr ^= num;
  }

  return xorAll ^ xorArr;
}
// Example
// let arr = [1, 2, 3, 5];
// let n = 5;
// console.log(findMissingNumberOptimized(arr, n)); // 4


// Move Zeroes to End
function moveZeroesToEnd(arr) {
  let nonZeroIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[nonZeroIndex++] = arr[i];
    }
  }
  for (let i = nonZeroIndex; i < arr.length; i++) {
    arr[i] = 0;
  }
  return arr;
}
// Example
// let arr = [0, 1, 0, 3, 12];
// console.log(moveZeroesToEnd(arr)); // [1, 3, 12, 0, 0]


// Move Zeroes to End - Optimized
function moveZeroesToEndOptimized(arr) {
  let lastNonZeroFoundAt = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[lastNonZeroFoundAt], arr[i]] = [arr[i], arr[lastNonZeroFoundAt]];
      lastNonZeroFoundAt++;
    }
  }
  return arr;
}
// Example
// let arr = [0, 1, 0, 3, 12];
// console.log(moveZeroesToEndOptimized(arr)); // [1, 3, 12, 0, 0]


// Longest Word
function longestWord(str) {
  const words = str.split(' ');
  let longest = '';
  for (let word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}
// Example
// let str = "The quick brown fox jumps over the lazy dog";
// console.log(longestWord(str)); // "jumps"

// Find Intersection of Arrays
function intersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const result = [];
  for (let item of set1) {
    if (set2.has(item)) {
      result.push(item);
    }
  }
  return result;
}
// Example
let arr1 = [1, 2, 3, 4];
let arr2 = [3, 4, 5, 6];
console.log(intersection(arr1, arr2)); // [3, 4]