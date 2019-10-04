const db = require('./db');
const generate = require('./generator');

async function getShort(address) {
    let dbaddress = await db.findAddress(address);

    if (!dbaddress) {
        const shortUrl = await makeShortUrl(address);
        dbaddress = await db.saveAddress({
            long_url: address,
            short_url: shortUrl,
            visits: 0,
        });
    }

    return dbaddress.short_url;
}

async function makeShortUrl(address) {
    const shortUrl = generate();
    const longAddress = await db.findLongAddress(shortUrl);
    if (longAddress) {
        return await makeShortUrl(address);
    } else {
        return shortUrl;
    }
}

module.exports = {
    getShort,
}