const express = require('express');
const controller = require('../controllers/product.controller');
const { validate } = require("../middlewares/validation");
const { uploadMemory } = require('../middlewares/multer');

const router = express.Router();

router.route('/import')
  .post(uploadMemory.single('file'), controller.importProduct);

module.exports = router;