const express = require('express');

const Cart = require('../models/Cart');
const router = express.Router();
const Product = require('../models/product');
router.get('/:id', (req, res, next) => {
	Cart.findOne({ owner: req.params.id })
		.populate('products')
		.exec()
		.then((cart) => res.json(cart));
});

router.post('/', async (req, res, next) => {
	try {
		const found = await Cart.findOne({ owner: req.body.owner })
			.populate('products')
			.exec();
		if (!found) {
			const newCart = await Cart.create(req.body);
			return res.json(newCart);
		} else {
			found.products.push(req.body.products);
			found.paid = req.body.paid;
			found.save();
			res.json(found);
		}
	} catch {}
});
router.patch('/:id', async (req, res, next) => {
	try {
		let cart = await Cart.findOne({
			_id: req.params.id,
		})
			.populate('products')
			.exec();
		if (!cart) throw new Error('No user logged in!');
		const index = cart.products.map((prod) => prod.id).indexOf(req.body.index);
		cart.products.splice(index, 1);
		cart.save();
		res.json(cart);
	} catch (error) {
		res.json(error);
	}
});
router.put('/:id', async (req, res, next) => {
	try {
		let cart = await Cart.findOne({ _id: req.params.id });
		if (!cart) throw new Error('Cart not found');
		cart.products.push(req.body.prod_id);
		let newCart = await Cart.findOne({ _id: req.params.id })
			.populate('products')
			.exec();
		cart.save();
		res.json(newCart);
	} catch (error) {
		res.json(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		cart = await Cart.findOneAndDelete({ owner: req.params.id });
		if (!cart) throw new Error('Cart not found');
	} catch (error) {
		res.json(error);
	}
});
router.post('/checkout/:id', async (req, res, next) => {
	try {
		cart = await Cart.findOne({ owner: req.params.id })
			.populate('products')
			.exec();
		length = 0;
		if (cart.purchased.length) {
		}
		let purchased = {
			products: [],
			date: cart.updatedAt,
		};
		console.log(purchased);
		cart.products.forEach((prod) => {
			purchased.products.push(prod);
		});

		cart.purchased.push(purchased);

		console.log(cart);
		cart.save();
		res.json(cart);
	} catch (error) {}
});
module.exports = router;
