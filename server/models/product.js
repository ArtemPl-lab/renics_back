'use strict';
const { slugify } = require('transliteration');
module.exports = function(Product) {
    Product.beforeSave = function(next){
        const nameKey = Object.keys(this.name)[0];
        this.url = this.url || slugify(this.name[nameKey]);
        next();
    }
};
