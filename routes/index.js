const express = require('express');
const router = express.Router();
const ctrlAddresses = require('../controllers/addresses');

/* GET home page. */
/*
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});*/

const sendJSONResponce = (res, status, content) => {
  res.status(status);
  res.json(content);
}

router.get('/', ctrlAddresses.addressesList);
router.post('/', ctrlAddresses.addressesCreate);
router.get('/:id', ctrlAddresses.addressesReadOne);

module.exports = router;
