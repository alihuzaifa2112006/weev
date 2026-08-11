const CryptoJS = require('crypto-js');

const samples = [
  "wlSJ0qFKFPMtQ79lC7IZftiUrV5tzTN3wwMQbc1Dd0g=", // VenderName
  "KE6YtF0mbmeM38izbNj8/A7XoSF34gpC9VI55nnJ/4aW1DhRQYYgJw==", // Address1
  "F5ugHXY+llxO/fxS8M7YGKWwedeY1GTp", // CountryName
  "fUgbhByvogW8Nc+X4jHYUmpLpzobkoL9", // City
  "11URyq3PAWropajrAhAgPvrUHbRNgdjg", // PhoneNumber
  "bPfh3oZe1Aj73MeVTpGIvA==", // ShortName
  "Yn6iSS38Cdxz+D4q7lW2jg==", // SupplierCode
  "A7CWWmI6qsiWgByXUV+HWQ==" // Website
];

const keyStr = "$@ooMR783_23";

function testDecryption() {
  const encs = ['Utf8', 'Latin1'];
  const modes = ['ECB', 'CBC', 'CFB', 'OFB', 'CTR'];
  const paddings = ['Pkcs7', 'ZeroPadding', 'NoPadding', 'Iso10126'];

  const keys = [
    { name: "Raw Passphrase string", key: keyStr, isString: true },
    { name: "CryptoJS.enc.Utf8.parse(keyStr)", key: CryptoJS.enc.Utf8.parse(keyStr) },
    { name: "CryptoJS.enc.Latin1.parse(keyStr)", key: CryptoJS.enc.Latin1.parse(keyStr) },
    { name: "MD5(keyStr)", key: CryptoJS.MD5(keyStr) },
    { name: "SHA1(keyStr)", key: CryptoJS.SHA1(keyStr) },
    { name: "SHA256(keyStr)", key: CryptoJS.SHA256(keyStr) },
  ];

  // Also try zero padding to 16/24/32
  [16, 24, 32].forEach(len => {
    let p = keyStr; while(p.length < len) p += '\0';
    keys.push({ name: `Utf8 zero pad ${len}`, key: CryptoJS.enc.Utf8.parse(p) });
  });

  const ivs = [
    { name: "No IV", iv: undefined },
    { name: "Zero 16 IV", iv: CryptoJS.enc.Hex.parse("00000000000000000000000000000000") }
  ];

  console.log("Testing new sample ciphertexts...");

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

              let dec;
              if (kObj.isString) {
                dec = CryptoJS.AES.decrypt(sample, kObj.key, cfg);
              } else {
                dec = CryptoJS.AES.decrypt(cipherParams, kObj.key, cfg);
              }

              let text = dec.toString(CryptoJS.enc.Utf8);
              if (text && text.length > 0 && /^[\x20-\x7E]+$/.test(text)) {
                console.log(`MATCH FOUND! "${sample.substring(0, 10)}..." => "${text}" | Key: ${kObj.name} | Mode: ${mName} | Pad: ${pName}`);
              }
            } catch (e) {}
          }
        }
      }
    }
  }
}

testDecryption();
