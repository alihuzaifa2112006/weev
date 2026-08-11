import CryptoJS from 'crypto-js';

const RAW_KEY = import.meta.env.VITE_ENCRYPTION_KEY || '$@ooMR783_23';
const ENCRYPTION_KEY = CryptoJS.enc.Utf8.parse(RAW_KEY);

export const decrypt = (data) => {
  if (!data || typeof data !== 'string') return data;
  try {
    const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      return data;
    }

    return decryptedText;
  } catch (error) {
    console.error('Decryption error:', error);
    return data;
  }
};

export const decryptObjectKeys = (data) => {
  if (!Array.isArray(data)) return data;
  const decryptedData = data.map((item) => {
    const decryptedItem = {};
    Object.keys(item).forEach((key) => {
      decryptedItem[key] = decrypt(item[key]);
    });
    return decryptedItem;
  });
  return decryptedData;
};

export const decryptRecursiveObjectKeys = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => decryptRecursiveObjectKeys(item));
  } else if (typeof data === 'object' && data !== null) {
    const decryptedItem = {};
    Object.keys(data).forEach((key) => {
      decryptedItem[key] = decryptRecursiveObjectKeys(data[key]);
    });
    return decryptedItem;
  } else {
    return decrypt(data);
  }
};
