const CryptoJS = require('crypto-js');

const ciphertext = "mN1gN+mFNEmP+2FZqzSD8/BiHITcFHzV";
const keyStr = "$@ooMR783_23";

const tryDecrypt = () => {
    // Try 1: Passphrase
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, keyStr);
        const text = bytes.toString(CryptoJS.enc.Utf8);
        if (text) console.log("Success (Passphrase):", text);
    } catch (e) {}

    // Try 2: UTF8 key, ECB mode
    try {
        const key = CryptoJS.enc.Utf8.parse(keyStr);
        const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        const text = bytes.toString(CryptoJS.enc.Utf8);
        if (text) console.log("Success (ECB UTF8):", text);
    } catch (e) {}

    // Try 3: UTF8 key padded to 16 bytes (very common)
    try {
        let paddedKeyStr = keyStr;
        while (paddedKeyStr.length < 16) paddedKeyStr += "\0"; // or space
        const key = CryptoJS.enc.Utf8.parse(paddedKeyStr);
        const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        const text = bytes.toString(CryptoJS.enc.Utf8);
        if (text) console.log("Success (ECB Padded):", text);
    } catch (e) {}
    
    // Try 4: Hash key with MD5
    try {
        const key = CryptoJS.MD5(keyStr);
        const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        const text = bytes.toString(CryptoJS.enc.Utf8);
        if (text) console.log("Success (MD5 Key):", text);
    } catch (e) {}

    // Try 5: Hash key with SHA256
    try {
        const key = CryptoJS.SHA256(keyStr);
        const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        const text = bytes.toString(CryptoJS.enc.Utf8);
        if (text) console.log("Success (SHA256 Key):", text);
    } catch (e) {}
    
    // Try 6: CBC mode with all-zero IV
    try {
        let paddedKeyStr = keyStr;
        while (paddedKeyStr.length < 16) paddedKeyStr += "\0";
        const key = CryptoJS.enc.Utf8.parse(paddedKeyStr);
        const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
        const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const text = bytes.toString(CryptoJS.enc.Utf8);
        if (text) console.log("Success (CBC Zero IV):", text);
    } catch (e) {}
};

tryDecrypt();
console.log("Done testing");
