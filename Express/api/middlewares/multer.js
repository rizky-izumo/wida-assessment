const multer = require('multer');
const path = require('path');
const fs = require('fs');

exports.storageDisk = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

exports.storageMemory = multer.memoryStorage();

exports.uploadDisk = multer({
    storage: this.storageDisk,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.xlsx' && ext !== '.xls') {
            return cb(new Error('Only Excel files are allowed'));
        }
        cb(null, true);
    }
});

exports.uploadMemory = multer({ storage: this.storageMemory });