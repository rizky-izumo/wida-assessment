const express = require('express');
const controller = require('../controllers/invoice.controller');
const { validate } = require("../middlewares/validation");
const { createInvoice, readInvoice, updateInvoice, removeInvoice } = require('../validations/invoice.validation');

const router = express.Router();

router.route('/read/:invoiceNo')
  .get(validate(readInvoice), controller.readInvoice);

router.route('/create')
  .post(validate(createInvoice), controller.createInvoice);

router.route('/update/:invoiceNo')
  .patch(validate(updateInvoice), controller.updateInvoice);

router.route('/remove/:invoiceNo')
  .delete(validate(removeInvoice), controller.removeInvoice);

module.exports = router;