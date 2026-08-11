const CryptoJS = require('crypto-js');

const ciphertext = "mN1gN+mFNEmP+2FZqzSD8/BiHITcFHzV";
const keyStr = "$@ooMR783_23";

const tryAll = () => {
    const algos = ['AES', 'DES', 'TripleDES', 'Rabbit', 'RC4', 'RC4Drop'];
    const modes = ['CBC', 'ECB', 'CFB', 'CTR', 'OFB'];
    const paddings = ['Pkcs7', 'ZeroPadding', 'NoPadding'];

    let padded16 = keyStr.padEnd(16, '\0');
    let padded24 = keyStr.padEnd(24, '\0');
    let padded32 = keyStr.padEnd(32, '\0');

    const keys = [
        keyStr, 
        CryptoJS.enc.Utf8.parse(keyStr),
        CryptoJS.enc.Utf8.parse(padded16),
        CryptoJS.enc.Utf8.parse(padded24),
        CryptoJS.enc.Utf8.parse(padded32)
    ];

    for (let algo of algos) {
        for (let mode of modes) {
            for (let pad of paddings) {
                for (let key of keys) {
                    try {
                        let opts = {};
                        if (CryptoJS.mode[mode]) opts.mode = CryptoJS.mode[mode];
                        if (CryptoJS.pad[pad]) opts.padding = CryptoJS.pad[pad];

                        const bytes = CryptoJS[algo].decrypt(ciphertext, key, opts);
                        const text = bytes.toString(CryptoJS.enc.Utf8);
                        if (text && text.length > 0 && /^[a-zA-Z0-9\s]+$/.test(text)) {
                            console.log(`Success! Algo:${algo} Mode:${mode} Pad:${pad}`, text);
                        }
                    } catch (e) {}
                }
            }
        }
    }
};

tryAll();
console.log("Done");
