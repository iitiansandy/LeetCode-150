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
 * The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
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