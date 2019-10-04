const baseUrl = 'localhost:3002/';

function makeRandSequence(length) {
    let res = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLen = characters.length;
    
    for ( var i = 0; i < length; i++ ) {
       res += characters.charAt(Math.floor(Math.random() * charsLen));
    }
    return res;
 }

 module.exports = () => {
     return `${baseUrl}${makeRandSequence(6)}`;
 };
