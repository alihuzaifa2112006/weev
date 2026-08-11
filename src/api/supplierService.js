import { decryptObjectKeys } from './encryption';

let inMemoryCache = null;
let activeFetchPromise = null;

/**
 * Fetch and decrypt suppliers with dual-layer caching (In-Memory + SessionStorage).
 * Prevents duplicate parallel API calls and avoids redundant TripleDES decryption.
 */
export async function getSuppliersData() {
  // Layer 1: In-Memory Cache (0ms instant response)
  if (inMemoryCache && inMemoryCache.length > 0) {
    return inMemoryCache;
  }

  // Layer 2: SessionStorage Cache (0ms instant response across route navigations)
  try {
    const saved = sessionStorage.getItem('weev_suppliers_decrypted_cache');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryCache = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.error('SessionStorage cache read error:', e);
  }

  // Layer 3: Deduplicate concurrent pending requests
  if (activeFetchPromise) {
    return activeFetchPromise;
  }

  // Layer 4: Fetch once from API & decrypt
  activeFetchPromise = (async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://svitchapi.swtcloud.net/mapi/';
      const response = await fetch(`${apiUrl}GetSupplierData?UserID=265`);
      const data = await response.json();

      if ((data.ResponseCode === '100' || data.ResponseCode === '200') && Array.isArray(data.ServiceRes)) {
        const decryptedList = decryptObjectKeys(data.ServiceRes);
        inMemoryCache = decryptedList;
        try {
          sessionStorage.setItem('weev_suppliers_decrypted_cache', JSON.stringify(decryptedList));
        } catch (e) {
          console.error('SessionStorage cache write error:', e);
        }
        return decryptedList;
      } else {
        throw new Error(data.ResponseMessage || 'Failed to fetch suppliers');
      }
    } finally {
      activeFetchPromise = null;
    }
  })();

  return activeFetchPromise;
}

export function clearSupplierCache() {
  inMemoryCache = null;
  activeFetchPromise = null;
  try {
    sessionStorage.removeItem('weev_suppliers_decrypted_cache');
  } catch (e) {
    console.error('SessionStorage clear error:', e);
  }
}
