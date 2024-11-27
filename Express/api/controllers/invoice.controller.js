const { Model } = require('objection');
const { knex } = require('../../config/knex');
const APIError = require('../utils/APIError');
const httpStatus = require("http-status");
const Invoice = require('../models/invoice.model');
const Product = require('../models/product.model');

// Give the knex object to objection.
Model.knex(knex);

exports.createInvoice = async (req, res, next) => {
    try {
        const insertedInvoice = await Invoice.query().insert(req.body);
        res.json(insertedInvoice);
    } catch (e) {
        next(e);
    }
}

exports.readInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.query()
            .withGraphFetched('[products]')
            .where('invoice_no', '=', req.params.invoiceNo)
            .first();
        
        const totalCog = invoice.products.reduce(function (acc, obj) {
            return acc + obj.totalCostOfGoodsSold;
        }, 0);

        const totalPrice = invoice.products.reduce(function (acc, obj) {
            return acc + obj.totalPriceSold;
        }, 0);

        const totalProfit = totalPrice - totalCog;
        delete invoice["products"];

        res.json({...invoice, totalProfit});
    } catch (e) {
        next(e);
    }
}

exports.updateInvoice = async (req, res, next) => {
    try {
        const invoiceUpd = await Invoice.query()
            .update(req.body)
            .where('invoice_no', '=', req.params.invoiceNo)
            .returning('*');
        
        res.json(invoiceUpd);
    } catch (e) {
        next(e)
    }
}

exports.removeInvoice = async (req, res, next) => {
    try {
        const productDel = await Product.query().delete()
            .where('invoice_no', '=', req.params.invoiceNo);
        const invoiceDel = await Invoice.query().delete()
            .where('invoice_no', '=', req.params.invoiceNo);

        res.json({message: `InvoiceNo ${req.params.invoiceNo} with its associated products have been deleted successfully`})
    } catch (e) {
        next(e)
    }
}