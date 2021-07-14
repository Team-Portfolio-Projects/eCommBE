const { SchemaTypeOptions } = require('mongoose');
const mongoose = require('../db/connection');

const ProductSchema = new mongoose.Schema({
	title: String,
	category: String,
	image: String,
	price: String,
	description: String,
	quanity: { default: 0, type: Number },
	cart: mongoose.Schema.Types.ObjectId,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
