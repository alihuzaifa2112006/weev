import CryptoJS from 'crypto-js';

const key = '$@ooMR783_23';

// Pad the key to meet TripleDES requirements
const paddedKey = CryptoJS.enc.Utf8.parse(key.padEnd(24, ' '));

const encrypt = (plainText) => {
  if (plainText == null) {
    return null;
  }

  if (Array.isArray(plainText)) {
    plainText = plainText.join(',');
  }

  if (typeof plainText === 'boolean' || typeof plainText === 'number') {
    plainText = plainText.toString();
  }

  const iv = CryptoJS.lib.WordArray.random(8);
  const encrypted = CryptoJS.TripleDES.encrypt(plainText, paddedKey, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const encryptedWithIV = iv.concat(encrypted.ciphertext);
  return encryptedWithIV.toString(CryptoJS.enc.Base64);
};

const decrypt = (encryptedText) => {
  if (encryptedText == null) {
    return null;
  }

  try {
    const encryptedDataWithIV = CryptoJS.enc.Base64.parse(encryptedText);
    const iv = encryptedDataWithIV.clone();
    iv.sigBytes = 8;
    iv.clamp();
    const cipherText = encryptedDataWithIV.clone();
    cipherText.words.splice(0, 2);
    cipherText.sigBytes -= 8;
    const decrypted = CryptoJS.TripleDES.decrypt({ ciphertext: cipherText }, paddedKey, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText;
  }
};

const decryptObjectKeys = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    const decryptedItem = {};
    Object.keys(item ?? {}).forEach((key) => {
      const val = item[key];
      if (typeof val === 'string' && val.trim() !== '') {
        try {
          decryptedItem[key] = decrypt(val);
        } catch {
          decryptedItem[key] = val;
        }
      } else {
        decryptedItem[key] = val;
      }
    });
    return decryptedItem;
  });
};

const decryptRecursiveObjectKeys = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => decryptRecursiveObjectKeys(item));
  }
  if (typeof data === 'object' && data !== null) {
    const decryptedItem = {};
    Object.keys(data).forEach((key) => {
      const val = data[key];
      if (typeof val === 'string' && val.trim() !== '') {
        try {
          decryptedItem[key] = decrypt(val);
        } catch {
          decryptedItem[key] = val;
        }
      } else {
        decryptedItem[key] = decryptRecursiveObjectKeys(val);
      }
    });
    return decryptedItem;
  }
  return typeof data === 'string' && data.trim() !== '' ? decrypt(data) : data;
};

export { encrypt, decrypt, decryptObjectKeys, decryptRecursiveObjectKeys };