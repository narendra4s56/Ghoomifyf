const crypto = require('crypto');

const generateSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex string
};

console.log(generateSecret());
