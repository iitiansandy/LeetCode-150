const crypto = require("crypto");

// ----------------------
// Replace with your own keys
// ----------------------
const publicKeyPem = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEArUERADds02ZTa9S6nlv8uwYgOiuIUHBvGcBR2M3XJ2o0JkmgJr1Z
u+9cc5KfasmsE5Bhp1K66cW2aM5rWccggRXS7b6ZKyTffrp9ElFTNkFx8C2bab4h
D4nGqNNJePTVSksK1TwBIzs5PNTmejgj4RlXU1SBC8jMcCdrAr58k6M8O44nfvNd
tl9ZgS+Ssh3NUz+Ef3ixqHdwwP5FpQhnHvIwSIbH+PG1d5xi2PPGvL4ZJinIcP6y
scZhWvDRddemkVUZhUAldOprDFWOXTqoykGEkqfE+/lAn+wx0nD3j/YdTUTA3mHq
P+0ay6yTrxxqnpCdzUjy4ymxO6k6NegKiwIDAQAB
-----END RSA PUBLIC KEY-----`;

const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEArUERADds02ZTa9S6nlv8uwYgOiuIUHBvGcBR2M3XJ2o0Jkmg
Jr1Zu+9cc5KfasmsE5Bhp1K66cW2aM5rWccggRXS7b6ZKyTffrp9ElFTNkFx8C2b
ab4hD4nGqNNJePTVSksK1TwBIzs5PNTmejgj4RlXU1SBC8jMcCdrAr58k6M8O44n
fvNdtl9ZgS+Ssh3NUz+Ef3ixqHdwwP5FpQhnHvIwSIbH+PG1d5xi2PPGvL4ZJinI
cP6yscZhWvDRddemkVUZhUAldOprDFWOXTqoykGEkqfE+/lAn+wx0nD3j/YdTUTA
3mHqP+0ay6yTrxxqnpCdzUjy4ymxO6k6NegKiwIDAQABAoIBABiKLCDzuMkDUrLl
9r48w+yu+XGZKOhRL0Cz1OP4g+O5T0RSZAoYrSp0GjbkgGAHy1pvYOWU+j89GeZ5
FmDTq5mdFbtG++WjMLoqf/yljZEUbqcDpA0I48s89ekubtcLFrWR237zI4DHVVwg
a7oeqYurTeB9ClTjpCaz7pxSOXhPsqsxoXonej4hC5TiNgc59qp4eTevvPwAyiej
fHZ6SGwUog1ru+pwlt9irVSxYBhkgUgGjzceVTN5Z3W6IwM64m9GLNMnLs7tZ3+I
HurevzEKoBoiGTHcB9Kwy9cQp5SHcZiJNXoe55m9rn644psGZLFBlm42LXz6Ts8d
LCmn0IECgYEA6kmH8dYAuhJXA0mLh/34H6mJX/ks8JJCmheqabOpl6okosdZcM4G
TkSlaZMRnJTb/DuzwUPXI+Ylql00U2Omkqa8xiqN8gKq9bSvRWbwW9gHMxCYPffZ
S0vM3s5nRDgcaUWCo0OvOqspgBvQzlrMzUyi+pouMk/p/49WQhobltkCgYEAvU+G
VpNyey9gr+wZs8+UH4fn5wn7wjvZCQak3OsUkC6BHtc1d4DEGG+q8r6/sD9v2x4q
X8j7+az/zB8nZvpZOP7gNdPIbhyHWjdgBYPZgPJAUTrPrLUkxARiurbErpEqprhB
ZfOQJawBOduPQBw+j4D4FtA13FxRiKvF5gyvtgMCgYAGvC5oSVqj/rr5oTedpTNo
1ZrZY3RjRhEcFOoVN9D8RyvechSkJYgQ3/BRZKTw92aLjbvRJn4czhTvHNbQPuEe
/iQXHkoOVv1LKvKO8DKgsUkjsqptvZ5Fh9xP22ckkuheLl1fDCcRbLI4uJP8Gqgg
jr9wrNX/JET5z8kPBWkdoQKBgQC2mPcdmLjqoqci6Jtd+ZGI3EDNc663CZzs/NCW
GdVKwOBgS/pRWw1J+KOt4ljoeje85RrAKw8II1rTmxUZWc4nkIfYw37m3nObjB/9
EdEAdCmfcBeSIWLmAsjsCZAqRPEbwEusN8LI42CHWwSQNO4O4rno30mkVBN8vRp0
K7Zr2wKBgQCUHEP89di9IatAScZA4CYNZ1JIjmzFC37VczF51iXTFDk1r1hNv3B2
xSud9LJSHCFoz9FT1xEBgKJ8YCgw4zXTfZjCS8mNtPZWFL8NrrBbycv0VI+8C09N
JyKOznpPAgUEFis3BJ+SjPN5pFnEVQ+Qb4OFYqnJFz0PhL5G7u7BCQ==
-----END RSA PRIVATE KEY-----`;


// -----------------------------------------------------------
// ENCRYPT OBJECT
// -----------------------------------------------------------
function encryptObject(obj) {
  // 1. Convert object → JSON string
  const plainText = JSON.stringify(obj);

  // 2. Generate AES key + IV
  const aesKey = crypto.randomBytes(32); // 256-bit
  const iv = crypto.randomBytes(16);

  // 3. AES Encrypt JSON data
  const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);
  let encryptedData = cipher.update(plainText, "utf8", "base64");
  encryptedData += cipher.final("base64");

  // 4. Encrypt AES key using RSA public key
  const encryptedKey = crypto.publicEncrypt(
    { key: publicKeyPem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
    aesKey
  );

  return {
    encryptedData,
    encryptedKey: encryptedKey.toString("base64"),
    iv: iv.toString("base64"),
  };
}


// -----------------------------------------------------------
// DECRYPT OBJECT
// -----------------------------------------------------------
function decryptObject(encryptedPackage) {
  const { encryptedData, encryptedKey, iv } = encryptedPackage;

  // 1. Decrypt AES key using RSA private key
  const aesKey = crypto.privateDecrypt(
    { key: privateKeyPem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
    Buffer.from(encryptedKey, "base64")
  );

  // 2. AES Decrypt JSON string
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    aesKey,
    Buffer.from(iv, "base64")
  );

  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");

  // 3. Convert JSON → Object
  return JSON.parse(decrypted);
}



// -----------------------------------------------------------
// TEST EXAMPLE
// -----------------------------------------------------------
const sampleObj = {
  name: "John Doe",
  phone: "+91981578956",
  age: 25,
  roles: ["admin", "backend-dev"],
  meta: { a: 1, b: 2 }
};

const encrypted = encryptObject(sampleObj);
console.log("Encrypted Package:", encrypted);

const decrypted = decryptObject(encrypted);
console.log("Decrypted Object:", decrypted);
