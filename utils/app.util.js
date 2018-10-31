
const crypto= require('crypto');
const config=require('../config/config');
const ENCRYPTION_KEY = config.secret; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

    exports.encrypt=function(text){
        let iv = crypto.randomBytes(IV_LENGTH);
        var cipher=crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        var crypted= cipher.update(text);
        crypted=Buffer.concat([crypted, cipher.final()]);
        return iv.toString('hex') + ':' + crypted.toString('hex');;
    }

    exports.decrypt=function(text){
        let textParts = text.split(':');
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
