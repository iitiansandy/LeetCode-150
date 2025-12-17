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