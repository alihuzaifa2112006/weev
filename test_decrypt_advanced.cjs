const CryptoJS = require('crypto-js');

const ciphertexts = [
  "/sb/lEsS8QF3jYi9j+8FKw==", // VenderLibraryID
  "ZaRB27GPoJReYzfjTWgzjQ==", // Address1
  "m3YxvlsM+4s4c4xX+PlzBQ==", // CountryName
  "eiG7B+2Nsu57xEjbXZIm88I9mrbniz4Y" // VenderName
];

const keyStr = "$@ooMR783_23";

const tryAll = () => {
    // 1. Generate keys
    const rawUtf8 = CryptoJS.enc.Utf8.parse(keyStr);
    
    // Hash keys
    const md5Key = CryptoJS.MD5(keyStr);
    const sha1Key = CryptoJS.SHA1(keyStr);
    const sha256Key = CryptoJS.SHA256(keyStr);
    
    // Pad keys to 16, 24, 32 bytes manually with zero bytes
    let pad16 = keyStr; while(pad16.length < 16) pad16 += '\0';
    let pad24 = keyStr; while(pad24.length < 24) pad24 += '\0';
    let pad32 = keyStr; while(pad32.length < 32) pad32 += '\0';
    
    // Some systems pad with spaces instead of zeros
    let pad16Space = keyStr; while(pad16Space.length < 16) pad16Space += ' ';
    
    const keys = [
        { name: "Passphrase string", val: keyStr, isString: true },
        { name: "Raw UTF8", val: rawUtf8 },
        { name: "MD5", val: md5Key },
        { name: "SHA1", val: sha1Key },
        { name: "SHA256", val: sha256Key },
        { name: "Padded 16 Zeros", val: CryptoJS.enc.Utf8.parse(pad16) },
        { name: "Padded 24 Zeros", val: CryptoJS.enc.Utf8.parse(pad24) },
        { name: "Padded 32 Zeros", val: CryptoJS.enc.Utf8.parse(pad32) },
        { name: "Padded 16 Spaces", val: CryptoJS.enc.Utf8.parse(pad16Space) }
    ];

    const ivs = [
        { name: "Null IV", val: null }, // ECB doesn't use IV
        { name: "Zero IV 16", val: CryptoJS.enc.Hex.parse('00000000000000000000000000000000') },
        { name: "Zero IV 8", val: CryptoJS.enc.Hex.parse('0000000000000000') },
        { name: "Key as IV", val: "key" } // Will set IV to the key if possible
    ];

    const algos = ['AES', 'DES', 'TripleDES'];
    const modes = ['ECB', 'CBC', 'CFB', 'OFB', 'CTR'];
    const paddings = ['Pkcs7', 'ZeroPadding', 'NoPadding', 'Iso10126'];

    console.log("Starting tests...");
    let found = false;

    for (let ct of ciphertexts) {
        for (let algo of algos) {
            for (let keyObj of keys) {
                for (let mode of modes) {
                    for (let pad of paddings) {
                        for (let ivObj of ivs) {
                            try {
                                let opts = {};
                                if (CryptoJS.mode[mode]) opts.mode = CryptoJS.mode[mode];
                                if (CryptoJS.pad[pad]) opts.padding = CryptoJS.pad[pad];
                                
                                if (ivObj.val) {
                                    if (ivObj.val === "key" && !keyObj.isString) {
                                        opts.iv = keyObj.val;
                                    } else {
                                        opts.iv = ivObj.val;
                                    }
                                }

                                const bytes = keyObj.isString ? 
                                    CryptoJS[algo].decrypt(ct, keyObj.val, opts) : 
                                    CryptoJS[algo].decrypt(
                                        { ciphertext: CryptoJS.enc.Base64.parse(ct) }, 
                                        keyObj.val, 
                                        opts
                                    );
                                
                                const text = bytes.toString(CryptoJS.enc.Utf8);
                                // Check if it contains valid characters
                                if (text && text.length > 0 && /^[a-zA-Z0-9\s,.-]+$/.test(text)) {
                                    console.log(`Success! Text: ${text} | Algo: ${algo} | Key: ${keyObj.name} | Mode: ${mode} | Pad: ${pad} | IV: ${ivObj.name}`);
                                    found = true;
                                }
                            } catch (e) {
                                // Ignore errors like padding mismatch
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("Tests finished. Found:", found);
};

tryAll();
