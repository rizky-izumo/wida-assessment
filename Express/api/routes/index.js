const express = require('express');
const router = express.Router({ strict: false });
const invoiceRoutes = require('./invoice.route');
const productRoutes = require('./product.route');

router.use('/invoice', invoiceRoutes);
router.use('/product', productRoutes);

router.use((req, res, next) => {
    next({
        status: 404,
        message: 'API Not Found',
    });
});

module.exports = router;