/** Prob-1 Merge Sorted Arrays
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, 
 * representing the number of elements in nums1 and nums2 respectively.
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 */

function mergeSort(arr1, arr2) {
    let i = arr1.length - 1;
    let j = arr2.length - 1;
    let k = i + j + 1;
    while (i >= 0 && j >= 0) {
        if (arr1[i] > arr2[j]) {
            arr1[k] = arr1[i];
            i--;
            k--;
        } else {
            arr1[k] = arr2[j];
            j--;
            k--;
        }
    }

    while (i >= 0) {
        arr1[k--] = arr1[i--];
    }

    while (j >= 0) {
        arr1[k--] = arr2[j--]; 
    }
    return arr1;
};

// console.log(mergeSort([1, 3, 5, 7], [2, 4, 6]));


/**
 * Prob-2 Remove Element
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The relative order 
 * of the elements may be changed.
 * Since it is impossible to change the length of the array in some languages, you must instead have the result be 
 * placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, 
 * then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
 */

function removeElement(arr, val) {
    let i = 0;
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] !== val) {
            arr[i] = arr[j];
            i++;
        }
    } 
    return i;
}
// console.log(removeElement([3, 2, 2, 3], 3));


/**
 * Prob-3 Remove Duplicates from Sorted Array
 */

function removeDuplicates(arr) {
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] !== arr[i]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1; // Return the length of the array without duplicates
}
// console.log(removeDuplicates([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]));


/** * Prob-4 Remove Duplicates from Sorted Array II
 * Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears 
 * at most twice. The relative order of the elements should be kept the same.
 */
function removeDuplicatesII(arr) {
    if (arr.length <= 2) return arr.length; // If the array has 2 or fewer elements, return its length

    let i = 2; // Start from the third element
    for (let j = 2; j < arr.length; j++) {
        if (arr[j] !== arr[i - 2]) { // Check if the current element is different from the element two places back
            arr[i] = arr[j]; // Place it in the next position
            i++;
        }
    }
    return i; // Return the new length of the array without duplicates
}
// console.log(removeDuplicatesII([1, 1, 1, 2, 2, 3]));


/**
 * Prob-5 Majority Element
 * Given an array nums of size n, return the majority element.
 * The majority element is the element that appears more than ⌊n / 2⌋ times. 
 * You may assume that the majority element always exists in the array.
 */

function majorityElement(arr) {
    const hash = {};
    let res = 0;
    let majority = 0;

    for (let n of arr) {
        hash[n] = (hash[n] || 0) + 1;

        if (hash[n] > majority) {
            res = n;
            majority = hash[n];
        }
    }
    return res;
}

// console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));


/**
 * Prob-6 Majority Element II
 * Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.
 */

function majorityElementII(arr) {
    const hash = {};
    let res = [];
    let majority = Math.floor(arr.length / 3);

    for (let n of arr) {
        hash[n] = (hash[n] || 0) + 1;

        if (hash[n] > majority) {
            res.push(n);
        }
    }
    return res;
}

// console.log(majorityElementII([3, 2, 3]));

/**
 * Prob-7 Rotate Array
 * Given an array, rotate the array to the right by k steps, where k is non-negative.
 */

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

function rotateArray(arr, k) {
    k = k % arr.length; // Handle cases where k is greater than the array length
    reverse(arr, 0, arr.length - 1); // Reverse the entire array
    reverse(arr, 0, k - 1); // Reverse the first k elements
    reverse(arr, k, arr.length - 1); // Reverse the remaining elements
    return arr;
}

// console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3));

/**
 * Prob-8 Best time to buy and sell stock
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in 
 * the future to sell that stock.
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 */

function maxProfit(prices) {
    // Initialize maxProfit to 0
    let maxProfit = 0;
    // Initialize minPrice to the first price in the array
    let minPrice = prices[0];

    // Iterate through the array starting from the second day
    for (let i = 1; i < prices.length; i++) {
        // Update maxProfit if the current profit is higher than the previous maxProfit
        maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        // Update minPrice if the current price is lower than the previous minPrice
        minPrice = Math.min(minPrice, prices[i]);
    }

    return maxProfit;
}

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));


/**
 * Prob-9 Best time to buy and sell stock II
 * You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
 * On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. 
 * However, you can buy it then immediately sell it on the same day.
 * Find and return the maximum profit you can achieve.
 */

function maxProfitII(prices) {
    // Initialize maxProfit to 0
    let maxProfit = 0;
    // Iterate through the array starting from the second day
    for (let i = 1; i < prices.length; i++) {
        // If the price on the current day is higher than the price on the previous day,
        // it means we can make a profit by selling on the current day after buying on the previous day.
        // Add the profit to the maxProfit.
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }

    return maxProfit;
}

// console.log(maxProfitII([7, 1, 5, 3, 6, 4]));


/**
 * Prob-10 Best time to buy and sell stock III
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * Find the maximum profit you can achieve. You may complete at most two transactions.
 */

function maxProfitIII(prices) {
    // Initialize maxProfit to 0
    let maxProfit = 0;
    // Initialize minPrice to the first price in the array
    let minPrice = prices[0];
    // Initialize maxPrice to the last price in the array
    let maxPrice = prices[prices.length - 1];
    // Initialize maxProfitFromLeft to store the maximum profit from the left side of the array
    let maxProfitFromLeft = new Array(prices.length).fill(0);
    // Initialize maxProfitFromRight to store the maximum profit from the right side of the array
    let maxProfitFromRight = new Array(prices.length).fill(0);

    // Calculate the maximum profit from the left side of the array
    for (let i = 1; i < prices.length; i++) {
        // Update maxProfitFromLeft[i] with the maximum profit from the left side up to the current day
        maxProfitFromLeft[i] = Math.max(maxProfitFromLeft[i - 1], prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }

    for (let i = prices.length - 2; i >= 0; i--) {
        // Update maxProfitFromRight[i] with the maximum profit from the right side up to the current day
        maxProfitFromRight[i] = Math.max(maxProfitFromRight[i + 1], maxPrice - prices[i]);
        maxPrice = Math.max(maxPrice, prices[i]);
    }

    for (let i = 0; i < prices.length; i++) {
        // Update maxProfit with the maximum profit from the left side and the right side up to the current day
        maxProfit = Math.max(maxProfit, maxProfitFromLeft[i] + maxProfitFromRight[i]);
    }

    return maxProfit;
}

// console.log(maxProfitIII([3, 3, 5, 0, 0, 3, 1, 4]));


/**
 * Prob-11 Best time to buy and sell stock IV
 * You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
 * Find the maximum profit you can achieve. You may complete at most k transactions.
 */

function maxProfitIV(k, prices) {
    // Initialize maxProfit to 0
    let maxProfit = 0;
    // Initialize minPrice to the first price in the array
    let minPrice = prices[0];
    // Initialize maxPrice to the last price in the array
    let maxPrice = prices[prices.length - 1];
    // Initialize maxProfitFromLeft to store the maximum profit from the left side of the array
    let maxProfitFromLeft = new Array(prices.length).fill(0);
    // Initialize maxProfitFromRight to store the maximum profit from the right side of the array
    let maxProfitFromRight = new Array(prices.length).fill(0);

    // Calculate the maximum profit from the left side of the array
    for (let i = 1; i < prices.length; i++) {
        // Update maxProfitFromLeft[i] with the maximum profit from the left side up to the current day
        maxProfitFromLeft[i] = Math.max(maxProfitFromLeft[i - 1], prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }

    // Calculate the maximum profit from the right side of the array
    for (let i = prices.length - 2; i >= 0; i--) {
        // Update maxProfitFromRight[i] with the maximum profit from the right side up to the current day
        maxProfitFromRight[i] = Math.max(maxProfitFromRight[i + 1], maxPrice - prices[i]);
        maxPrice = Math.max(maxPrice, prices[i]);
    }

    // Calculate the maximum profit from the left side and the right side up to the current day
    for (let i = 0; i < prices.length; i++) {
        // Update maxProfit with the maximum profit from the left side and the right side up to the current day
        maxProfit = Math.max(maxProfit, maxProfitFromLeft[i] + maxProfitFromRight[i]);
    }

    return maxProfit;
}

// console.log(maxProfitIV(2, [3, 2, 6, 5, 0, 3]));


/**
 * Prob-12 Best time to buy and sell stock V
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
 * After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
 */

function maxProfitV(prices) {
    // Initialize maxProfit to 0
    let maxProfit = 0;
    // Initialize minPrice to the first price in the array
    let minPrice = prices[0];
    // Initialize maxPrice to the last price in the array
    let maxPrice = prices[prices.length - 1];
    // Initialize maxProfitFromLeft to store the maximum profit from the left side of the array
    let maxProfitFromLeft = new Array(prices.length).fill(0);
    // Initialize maxProfitFromRight to store the maximum profit from the right side of the array
    let maxProfitFromRight = new Array(prices.length).fill(0);

    // Calculate the maximum profit from the left side of the array
    for (let i = 1; i < prices.length; i++) {
        // Update maxProfitFromLeft[i] with the maximum profit from the left side up to the current day
        maxProfitFromLeft[i] = Math.max(maxProfitFromLeft[i - 1], prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }

    // Calculate the maximum profit from the right side of the array
    for (let i = prices.length - 2; i >= 0; i--) {
        // Update maxProfitFromRight[i] with the maximum profit from the right side up to the current day
        maxProfitFromRight[i] = Math.max(maxProfitFromRight[i + 1], maxPrice - prices[i]);
        maxPrice = Math.max(maxPrice, prices[i]);
    }

    // Calculate the maximum profit from the left side and the right side up to the current day
    for (let i = 0; i < prices.length; i++) {
        // Update maxProfit with the maximum profit from the left side and the right side up to the current day
        maxProfit = Math.max(maxProfit, maxProfitFromLeft[i] + maxProfitFromRight[i]);
    }

    return maxProfit;
}

// console.log(maxProfitV([1, 2, 3, 0, 2])); // 3


/**
 * return all the possible substrings of a string
 * @param {string} str
 * @return {string[]}
 * @example
 * substrings('abc') // ['a', 'ab', 'abc', 'b', 'bc', 'c']
 */

function substrings(str) {
  const substrings = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      substrings.push(str.slice(i, j));
    }
  }
  return substrings;
}

// test cases
// console.log(substrings('abc')); // ['a', 'ab', 'abc', 'b', 'bc', 'c']

/**
 * return all the possible subarrays of an array
 * @param {Array} arr
 * @return {Array[]}
 * @example
 * substrings([1, 2, 3]) // [[1], [1, 2], [1, 2, 3], [2], [2, 3], [3]]
 */

function subarrays(arr) {
  const subarrays = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j <= arr.length; j++) {
      subarrays.push(arr.slice(i, j));
    }
  }
  return subarrays;
}

// test cases
// console.log(subarrays([1, 2, 3])); // [[1], [1, 2], [1, 2, 3], [2], [2, 3], [3]]


/**
 * Prob-13 Jump Game
 * You are given an integer array nums. You are initially positioned at the array's first index, and each
 * element in the array represents your maximum jump length at that position.
 * Return true if you can reach the last index, or false otherwise.
 */

function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            return false;
        }
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}

// console.log(canJump([2, 3, 1, 1, 4])); // true
// console.log(canJump([3, 2, 1, 0, 4])); // false