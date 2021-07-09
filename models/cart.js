const mongoose = require('../db/connection');

const CartSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	products: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Product',
		quanity: { default: 0, type: Number },
	},
	purchased: [
		{
			products: [mongoose.Schema.Types.ObjectId],
			time: String,
		},
	],
	paid: Boolean,
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
//POPULATE MONGOOSE REF PRODUCTS
