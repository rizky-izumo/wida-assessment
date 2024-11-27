const { Model, snakeCaseMappers } = require('objection');
const Invoice = require('./invoice.model');

class Product extends Model {
    static get tableName() {
        return 'products';
    }

    static get idColumn() {
        return ['invoice_no', 'item_name'];
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    $beforeInsert() {
        const timestamp = new Date().toISOString();
        this.createdAt = timestamp;
        this.updatedAt = timestamp;
    }
    
    $beforeUpdate() {
        const timestamp = new Date().toISOString();
        this.updatedAt = timestamp;
    }

    static get relationMappings() {
        return {
            invoice: {
                relation: Model.BelongsToOneRelation,
                modelClass: Invoice,
                join: {
                    from: 'products.invoice_no',
                    to: 'invoices.invoice_no'
                }
            }
        }
    }
}

module.exports = Product;