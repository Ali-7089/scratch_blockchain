const crypto = require('crypto');

const cryptoHash = (...input)=>{
    const hash = crypto.createHash('SHA256')
    hash.update(input.sort().join(''))
    return hash.digest('hex');
}

module.exports = cryptoHash;