/** Prob-1 Merge Sorted Arrays
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
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
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The relative order of the elements may be changed.
 * Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
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