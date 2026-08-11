const CryptoJS = require('crypto-js');

const samples = [
  "pL6l2m43SF/G2cIT43zcqg==",
  "A1WMnqmay2xjwe7iEyZs/8GuwU6Lnzet",
  "TKEiljvgqz7n8a/AU7mELRUysmkiSaiY",
  "cBmwuPRz23mDZx1u3ouoiA==",
  "ySeqImpsm+CDwqCcY+bqwg==",
  "wB9hhUS+F3g2N/NlgRx4AQ==",
  "ldDoTeaqA/jkNCkGMgIkyQ==",
  "a+cdr1J/UwTfikkrG/q7B27zr0HYkTGV"
];

const keyStr = "$@ooMR783_23";

// In C# .NET: AesManaged / RijndaelManaged / AesCryptoServiceProvider
// Key: UTF8 bytes of keyStr, padded with 0 to 16/24/32 bytes, or hashed.
// IV: UTF8 bytes of keyStr, padded to 16 bytes with 0, OR zero IV.

function runTests() {
  const encs = ['Utf8', 'Latin1'];
  const modes = ['CBC', 'ECB', 'CFB', 'OFB', 'CTR'];
  const paddings = ['Pkcs7', 'ZeroPadding', 'NoPadding', 'Iso10126', 'Iso97971'];

  // Keys
  const keyList = [];
  
  // 1. Passphrase
  keyList.push({ name: "Passphrase", key: keyStr, isPass: true });

  // 2. Parsed UTF8 / Latin1
  encs.forEach(enc => {
    let parsed = CryptoJS.enc[enc].parse(keyStr);
    keyList.push({ name: `Raw ${enc}`, key: parsed });

    [16, 24, 32].forEach(len => {
      let p0 = keyStr; while(p0.length < len) p0 += '\0';
      keyList.push({ name: `Padded ${enc} zero ${len}`, key: CryptoJS.enc[enc].parse(p0) });

      let pSpace = keyStr; while(pSpace.length < len) pSpace += ' ';
      keyList.push({ name: `Padded ${enc} space ${len}`, key: CryptoJS.enc[enc].parse(pSpace) });
    });
  });

  // 3. Hashes
  keyList.push({ name: "MD5", key: CryptoJS.MD5(keyStr) });
  keyList.push({ name: "SHA1", key: CryptoJS.SHA1(keyStr) });
  keyList.push({ name: "SHA256", key: CryptoJS.SHA256(keyStr) });

  // IVs
  const ivList = [
    { name: "Undefined/Null", iv: undefined },
    { name: "Zero IV 16", iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000') },
    { name: "Key UTF8 16 padded 0", iv: CryptoJS.enc.Utf8.parse(keyStr + '\0\0\0\0') },
    { name: "Key UTF8 16 padded space", iv: CryptoJS.enc.Utf8.parse(keyStr + '    ') }
  ];

  let totalSuccess = 0;

  for (let sample of samples) {
    for (let kObj of keyList) {
      for (let mName of modes) {
        for (let pName of paddings) {
          for (let ivObj of ivList) {
            try {
              let cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(sample)
              });

              let cfg = {};
              if (CryptoJS.mode[mName]) cfg.mode = CryptoJS.mode[mName];
              if (CryptoJS.pad[pName]) cfg.padding = CryptoJS.pad[pName];
              if (ivObj.iv) cfg.iv = ivObj.iv;

              let dec;
              if (kObj.isPass) {
                dec = CryptoJS.AES.decrypt(sample, kObj.key, cfg);
              } else {
                dec = CryptoJS.AES.decrypt(cipherParams, kObj.key, cfg);
              }

              let res = dec.toString(CryptoJS.enc.Utf8);
              // Valid text check (human readable words)
              if (res && res.length > 0 && /^[\w\s@.,+\-/()]+$/i.test(res) && res.trim().length > 0) {
                console.log(`SUCCESS! Sample: "${sample}" -> Result: "${res}" | Key: ${kObj.name} | Mode: ${mName} | Pad: ${pName} | IV: ${ivObj.name}`);
                totalSuccess++;
              }
            } catch (e) {}
          }
        }
      }
    }
  }

  console.log(`Finished test. Total matches: ${totalSuccess}`);
}

runTests();
