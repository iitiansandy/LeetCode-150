const CryptoJS = require("crypto-js");


// Static Key (Must be exactly 32 characters)
const secretKey = "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d"; // 32-byte key (256 bits)

const encryptPassword = async (plainPassword) => {
  // Generate a random 16-byte IV
  const iv = CryptoJS.lib.WordArray.random(16);

  // Encrypt the password
  const encrypted = CryptoJS.AES.encrypt(
    plainPassword,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  // Combine IV and ciphertext (both in hex)
  const encryptedPassword = iv.toString(CryptoJS.enc.Hex) + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  return encryptedPassword;
};


const decryptPassword = async (password) => {
    // Extract IV (first 16 bytes) and ciphertext (remaining part)
    const iv = await CryptoJS.enc.Hex.parse(password.substring(0, 32)); // First 32 hex characters (16 bytes)
    const ciphertext = await CryptoJS.enc.Hex.parse(password.substring(32)); // Remaining ciphertext
  
    // Decrypt the ciphertext
    const decrypted = await CryptoJS.AES.decrypt(
        { ciphertext: ciphertext }, 
        CryptoJS.enc.Utf8.parse(secretKey), 
        {
            iv: iv, 
            mode: CryptoJS.mode.CBC, 
            padding: CryptoJS.pad.Pkcs7
        }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
}

const originalValue = "+917042072054";
(async () => {
    const encrypted = await encryptPassword(originalValue);
    const decrypted = await decryptPassword(encrypted);
  
    console.log("Original:", originalValue);
    console.log("Encrypted:", encrypted);
    console.log("Decrypted:", decrypted);
  })();
