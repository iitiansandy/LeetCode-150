const CryptoJS = require("crypto-js");

const secretKey = CryptoJS.enc.Utf8.parse("9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d"); 
const staticIV = CryptoJS.enc.Utf8.parse("1234567890abcdef"); // 16-byte IV

// console.log("secretKey:", secretKey);
// console.log("staticIV:", staticIV);


// Function to encrypt an object
function encryptObject(data) {
    const jsonString = JSON.stringify(data); // Convert object to JSON string

    const encrypted = CryptoJS.AES.encrypt(
        jsonString, 
        secretKey, 
        {
            iv: staticIV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return encrypted.toString(); // Return encrypted data
}


// Function to decrypt an object
function decryptObject(encryptedData) {
    const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        secretKey,
        {
            iv: staticIV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );
  
    // console.log("decrypted data:", decrypted);
  
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    // console.log("decryptedText:", decryptedText);
  
    if (!decryptedText) {
        throw new Error("Decryption failed. Check your key, IV, and input data.");
    }
  
    return JSON.parse(decryptedText); // Convert JSON string back to object
}


// Example Usage
const data = {
    "_default": "YES",
    "_title": "Mohan Kumar P",
    "line1": "No 58, 11 the cross maruthi nagar",
    "line2": "perfect coumputer, madiwala, banglore",
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India",
    "PIN": "560068",
    "email": "mohankumar.p98@gmail.com",
    "phone": "+919738356931",
    "entityAction": "edit",
    "entityAttrName": "items",
    "area": "madiwala"
};

// const encryptedData = encryptObject(data);
const encryptedData = 'E0MMKeHLq9mYG7JAjzLj+MGQq0rsP1FASmK+Gv+cOJ41y32bRXQZYEOwNLHfonV8RMnJH0mqg7K8bv4mZ/M79AZRW/rbdbLIDrvIUcB+8eqcdPGNfhb/ppqKi3Z8/Cyd7tiqIax2Xx38aO9Fto2zIFH/3cYQCwN+kZtaoX9ym9hzG9EGyHd4UOD+p/MzzveYCatLaPQfwkGaCNrCm9m3gr0hJso9B0Xp5QI1z9vyfeAKljT0TniK1pMBlGbDXRN0IFUF0PxciW+e2nFXprPsXzsttcat+ybdhL4oCZz2bEkQNiZQDIsDZwsi+DV6wYZh5FjaCN29yDC5wgsVCReE5xounfB3nKHlEelETFSNDgvHCDWeGZJP8a0hrnVvSdJnJSqnJbW+ENyaSEaBqN27Xjl+56s7N9IuB3ZSeAGJb/w='
console.log("🔐 Encrypted Data:", encryptedData);
const decrypData = decryptObject(encryptedData);
console.log("🔓 Decrypted Data:", decrypData);