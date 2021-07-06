const mongoose = require('../db/connection');

const CartSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	products: {
		type: [String],
		// ref:'Product'
	},
	paid: Boolean,
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
//POPULATE MONGOOSE REF PRODUCTS
