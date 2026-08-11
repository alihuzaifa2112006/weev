import { decrypt } from '../../../api/encryption';

/**
 * Guards against empty strings, nulls and non-strings.
 * The list endpoints return "" for unset columns (Address2, PFICode, ShortName…)
 * and passing those into decrypt() throws, which kills the whole map().
 */
const safeDecrypt = (value) => {
  if (typeof value !== 'string' || value.trim() === '') return '';
  try {
    return decrypt(value);
  } catch (error) {
    console.warn('decrypt failed for value:', value, error);
    return '';
  }
};

export const decryptObjectKeys = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    const decryptedItem = {};
    Object.keys(item ?? {}).forEach((key) => {
      decryptedItem[key] = safeDecrypt(item[key]);
    });
    return decryptedItem;
  });
};

export const decryptRecursiveObjectKeys = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => decryptRecursiveObjectKeys(item));
  }
  if (typeof data === 'object' && data !== null) {
    const decryptedItem = {};
    Object.keys(data).forEach((key) => {
      decryptedItem[key] = decryptRecursiveObjectKeys(data[key]);
    });
    return decryptedItem;
  }
  return safeDecrypt(data);
};
