const db = require('../utils/db');
const validUrl = require('valid-url');
const getShort = require('../utils/getShort');
//const redis = require('redis');
//const client = redis.createClient(6379);
/*
const cache = (req, res, next) => {
    const short = req.params.id;
    clent.get(short, (err, data) => {
        if (err) {
            throw (err);
        }
        if (data !== null) {
            setResponse();
        } else {
            next();
        }
    })
}*/

const sendJSONResponce = (res, status, content) => {
    res.status(status);
    res.json(content);
}

const addressesList = async (req, res) => {
    const links = await db.showAllAddresses();
    sendJSONResponce(res, 200, links);
}

const addressesCreate = async (req, res, next) => {
    const longUrl = req.body.long_url;
    if (!longUrl || !validUrl.isUri(longUrl)) {
        return res.send({
            success: false,
            error: 'Provide a valid url',
        });
    }
    try {
        const resultUrl = await getShort.getShort(longUrl);
        res.send({
            success: true,
            result: resultUrl,
        });
    } catch (err) {
        next(err);
    }
};

const addressesReadOne = async (req, res, next) => {
    const short = req.params.id;
    try {
        const fullUrl = `localhost:3002/${short}`;
        const long = await db.findLongAddress(fullUrl);
        if (!long) {
            sendJSONResponce(res, 404, { "message": "Link is not found" });
        }
        res.writeHead(301, { 'location': long.long_url });
        res.end();
    } catch (err) {
        next(err);
    }

}

module.exports = {
    addressesList,
    addressesCreate,
    addressesReadOne,
}