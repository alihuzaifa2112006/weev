const CryptoJS = require('crypto-js');

const samples = [
  "MXX0uVXI6TsTbYfJ+XzuBg==",
  "ESKPYQa98nmkIgFP6vbT8A==",
  "/nAUymqWU3pQllAj3tj7Bw==",
  "NZFB6mpv6W+kB8zS06ktfg==",
  "uGSrmf4S3QwmJ29AeI/uOyP5RkQ+hYmY"
];

const keyString = "$@ooMR783_23";

// In .NET (C#), AesCryptoServiceProvider / RijndaelManaged / AesManaged common settings:
// Key: Encoding.UTF8.GetBytes(keyString) padded or hashed.
// IV: Encoding.UTF8.GetBytes(ivString) or zero bytes.

function testAll() {
  const encodings = ['Utf8', 'Latin1', 'Hex', 'Base64'];
  const modes = ['CBC', 'ECB', 'CFB', 'OFB', 'CTR'];
  const paddings = ['Pkcs7', 'ZeroPadding', 'NoPadding', 'Iso10126', 'Iso97971'];

  // Key representations
  const keys = [];
  
  // 1. Raw string (CryptoJS passphrase mode)
  keys.push({ label: 'Passphrase string', key: keyString, isPassphrase: true });
  
  // 2. Parsed UTF8 / Latin1
  ['Utf8', 'Latin1'].forEach(enc => {
    let raw = CryptoJS.enc[enc].parse(keyString);
    keys.push({ label: `Raw ${enc}`, key: raw });

    // Padded to 16, 24, 32 bytes with 0
    [16, 24, 32].forEach(targetLen => {
      let paddedStr = keyString;
      while (paddedStr.length < targetLen) paddedStr += '\0';
      keys.push({ label: `Padded ${enc} 0 (${targetLen})`, key: CryptoJS.enc[enc].parse(paddedStr) });
    });

    // Padded to 16, 24, 32 bytes with spaces
    [16, 24, 32].forEach(targetLen => {
      let paddedStr = keyString;
      while (paddedStr.length < targetLen) paddedStr += ' ';
      keys.push({ label: `Padded ${enc} Space (${targetLen})`, key: CryptoJS.enc[enc].parse(paddedStr) });
    });
  });

  // 3. Hashes of key
  keys.push({ label: 'MD5(key)', key: CryptoJS.MD5(keyString) });
  keys.push({ label: 'SHA1(key)', key: CryptoJS.SHA1(keyString) });
  keys.push({ label: 'SHA256(key)', key: CryptoJS.SHA256(keyString) });
  keys.push({ label: 'SHA512(key)', key: CryptoJS.SHA512(keyString) });

  // IV representations
  const ivs = [
    { label: 'No IV / Null', iv: undefined },
    { label: 'Zero IV 16', iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000') },
    { label: 'Zero IV 8', iv: CryptoJS.enc.Hex.parse('0000000000000000') },
    { label: 'Key as IV (raw)', iv: CryptoJS.enc.Utf8.parse(keyString) },
    { label: 'Key as IV (padded 16 0)', iv: CryptoJS.enc.Utf8.parse(keyString + '\0\0\0\0') },
    { label: 'Space IV 16', iv: CryptoJS.enc.Utf8.parse('                ') }
  ];

  console.log(`Testing ${keys.length} keys x ${modes.length} modes x ${paddings.length} paddings x ${ivs.length} IVs...`);

  let matches = 0;

  for (let sample of samples) {
    for (let kObj of keys) {
      for (let mName of modes) {
        for (let pName of paddings) {
          for (let ivObj of ivs) {
            try {
              let cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(sample)
              });

              let cfg = {};
              if (CryptoJS.mode[mName]) cfg.mode = CryptoJS.mode[mName];
              if (CryptoJS.pad[pName]) cfg.padding = CryptoJS.pad[pName];
              if (ivObj.iv) cfg.iv = ivObj.iv;

              let decrypted;
              if (kObj.isPassphrase) {
                decrypted = CryptoJS.AES.decrypt(sample, kObj.key, cfg);
              } else {
                decrypted = CryptoJS.AES.decrypt(cipherParams, kObj.key, cfg);
              }

              let str = decrypted.toString(CryptoJS.enc.Utf8);
              // Check if valid ASCII string (words, numbers, spaces)
              if (str && str.length > 0 && /^[a-zA-Z0-9\s_@.\-+#$&/()]+$/.test(str)) {
                console.log(`FOUND! Text: "${str}" | Key: ${kObj.label} | Mode: ${mName} | Pad: ${pName} | IV: ${ivObj.label}`);
                matches++;
              }
            } catch (e) {
              // Ignore
            }
          }
        }
      }
    }
  }

  console.log(`Total valid matches found: ${matches}`);
}

testAll();
