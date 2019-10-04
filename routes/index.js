const express = require('express');
const router = express.Router();
const ctrlAddresses = require('../controllers/addresses');

router.get('/', ctrlAddresses.addressesList);
router.post('/', ctrlAddresses.addressesCreate);
router.get('/:id', ctrlAddresses.cache, ctrlAddresses.addressesReadOne);

module.exports = router;
