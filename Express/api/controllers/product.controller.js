const { Model } = require('objection');
const { transaction } = require('objection');
const { knex } = require('../../config/knex');
const xlsx = require('xlsx');
const fs = require('fs'); // for disk upload
const APIError = require('../utils/APIError');
const httpStatus = require("http-status");
const Invoice = require('../models/invoice.model');
const Product = require('../models/product.model');

// Give the knex object to objection.
Model.knex(knex);

const invoiceHeader = (originalHeader) => {
    const headerMap = {
      'invoice no': 'invoiceNo',
      'date': 'invoiceDate',
      'customer': 'customerName',
      'salesperson': 'salespersonName',
      'payment type': 'paymentType',
      'notes': 'notes'
    };
  
    return originalHeader.map((column) => headerMap[column.toLowerCase()] || column);
};

const productHeader = (originalHeader) => {
    const headerMap = {
      'invoice no': 'invoiceNo',
      'item': 'itemName',
      'quantity': 'quantity',
      'total cogs': 'total_cost_of_goods_sold',
      'total price': 'total_price_sold'
    };
  
    return originalHeader.map((column) => headerMap[column.toLowerCase()] || column);
};

exports.importProduct = async(req, res, next) => {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer', cellDates: true, dateNF:"dd/mm/yy" });
        const sheets = workbook.SheetNames;
        const validSheetNames = ["invoice", "product sold"];
        let jsonExcelData = {};

        // Validate sheet names
        if(!validSheetNames.every((val, idx) => val === sheets[idx])) {
            throw new APIError({
                message: 'Validation Error',
                errors: [{
                  field: 'file',
                  location: 'body',
                  messages: ["XLS format error. Sheets must only contain 'invoice' and 'product sold' only"],
                }],
                status: httpStatus.default.BAD_REQUEST,
                isPublic: true,
            });
        }

        // Import xlsx into json variable
        for(const sheet in sheets) {
            const sheetName = sheets[sheet];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
            jsonExcelData[sheetName] = data;
        }

        // Change xlsx column headers to camelcase for DB insertion
        const invoiceHeader = {
            'invoice no': 'invoiceNo',
            'date': 'invoiceDate',
            'customer': 'customerName',
            'salesperson': 'salespersonName',
            'payment type': 'paymentType',
            'notes': 'notes'
        };
        const productHeader = {
            'Invoice no': 'invoiceNo',
            'item': 'itemName',
            'quantity': 'quantity',
            'total cogs': 'total_cost_of_goods_sold',
            'total price': 'total_price_sold'
        };
        jsonExcelData['invoice'].forEach((element, index, array) => {
            array[index] = renameKeys(element, invoiceHeader)
        });
        jsonExcelData['product sold'].forEach((element, index, array) => {
            array[index] = renameKeys(element, productHeader)
        });

        // Insert to DB
        await transaction(knex, async(trx) => {
            await Invoice.query(trx).insert(jsonExcelData['invoice']);
            await Product.query(trx).insert(jsonExcelData['product sold']);
        })
        res.json({message: "Imported xlsx data successfully", ...jsonExcelData});
    } catch (e) {
        next(e);
    }
}

function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}