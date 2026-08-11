const CryptoJS = require('crypto-js');

const samples = [
  "MXX0uVXI6TsTbYfJ+XzuBg==",
  "ESKPYQa98nmkIgFP6vbT8A==",
  "/nAUymqWU3pQllAj3tj7Bw==",
  "NZFB6mpv6W+kB8zS06ktfg==",
  "uGSrmf4S3QwmJ29AeI/uOyP5RkQ+hYmY"
];

const keyString = "$@ooMR783_23";

// Common salts used in .NET / C# examples on StackOverflow
const salts = [
  CryptoJS.enc.Utf8.parse(""),
  CryptoJS.enc.Utf8.parse(keyString),
  CryptoJS.enc.Hex.parse("0000000000000000"),
  CryptoJS.enc.Hex.parse("00000000000000000000000000000000"),
  CryptoJS.enc.Utf8.parse("12345678"),
  CryptoJS.enc.Utf8.parse("salt"),
  CryptoJS.enc.Hex.parse("4976616e204d65647665646576") // "Ivan Medvedev" - notorious default salt in Microsoft documentation!
];

const iterationsList = [1, 100, 1000, 10000];

console.log("Testing PBKDF2 / Rfc2898DeriveBytes combinations...");

for (let salt of salts) {
  for (let iterations of iterationsList) {
    for (let keySize of [128/32, 256/32]) {
      for (let ivSize of [0, 128/32]) {
        try {
          const derived = CryptoJS.PBKDF2(keyString, salt, {
            keySize: keySize + ivSize,
            iterations: iterations
          });

          const key = CryptoJS.lib.WordArray.create(derived.words.slice(0, keySize));
          const iv = ivSize > 0 ? CryptoJS.lib.WordArray.create(derived.words.slice(keySize, keySize + ivSize)) : undefined;

          for (let sample of samples) {
            const cipherParams = CryptoJS.lib.CipherParams.create({
              ciphertext: CryptoJS.enc.Base64.parse(sample)
            });

            const dec = CryptoJS.AES.decrypt(cipherParams, key, {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
            });

            const text = dec.toString(CryptoJS.enc.Utf8);
            if (text && text.length > 1 && /^[a-zA-Z0-9\s_@.\-+#$&/()]+$/.test(text)) {
              console.log(`FOUND PBKDF2! Text: "${text}" | Iterations: ${iterations} | KeySize: ${keySize*32}`);
            }
          }
        } catch (e) {}
      }
    }
  }
}

console.log("PBKDF2 test done.");
