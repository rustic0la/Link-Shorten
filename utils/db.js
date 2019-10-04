const Address = require('../models/address');

function findAddress(address) {
    return Address.findOne({ long_url: address});
}

function showAllAddresses() {
    return Address.find();
}

function findLongAddress(short) {
    return Address.findOneAndUpdate({ short_url: short}, { $inc: { visits: 1 } });
}

function saveAddress(address) {
    const newAddr = new Address(address);
    return newAddr.save();
}

module.exports = {
    findAddress, 
    findLongAddress, 
    saveAddress,
    showAllAddresses,
}