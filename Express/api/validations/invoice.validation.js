const Joi = require('joi');

module.exports = {
    createInvoice: {
        body: {
            invoiceNo: Joi.string().required(),
            invoiceDate: Joi.date()
                .iso()
                .required(),
            customerName: Joi.string().min(2).required(),
            salespersonName: Joi.string().min(2).required(),
            paymentType: Joi.string().valid('CASH', 'CREDIT', 'NOTCASHORCREDIT').required(),
            notes: Joi.string().min(5)
        }
    },
    readInvoice: {
        params: {
            invoiceNo: Joi.string().required(),
        }
    },
    updateInvoice: {
        params: {
            invoiceNo: Joi.string().required(),
        },
        body: {
            invoiceDate: Joi.date()
                .iso(),
            customerName: Joi.string().min(2),
            salespersonName: Joi.string().min(2),
            paymentType: Joi.string().valid('CASH', 'CREDIT', 'NOTCASHORCREDIT'),
            notes: Joi.string().min(5)
        }
    },
    removeInvoice: {
        params: {
            invoiceNo: Joi.string().required(),
        }
    },
}