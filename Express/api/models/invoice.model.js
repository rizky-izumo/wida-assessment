const { Model, snakeCaseMappers } = require('objection');
const Product = require('./product.model');

class Invoice extends Model {
    static get tableName() {
        return 'invoices';
    }

    static get idColumn() {
        return 'invoice_no';
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
            products: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: 'invoices.invoice_no',
                    to: 'products.invoice_no'
                }
            }
        }
    }
}

module.exports = Invoice;