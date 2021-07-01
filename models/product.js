const mongoose = require('../db/connection');

const ProductSchema = new mongoose.Schema({
	title: String,
	categories: [String],
	image: String,
	price: String,
	description: String,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
