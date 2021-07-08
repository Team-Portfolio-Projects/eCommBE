const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

router.get('/:id', (req, res, next) => {
	Cart.findOne({ owner: req.params.id })
		.populate('products')
		.exec()
		.then((cart) => res.json(cart));
});

router.post('/', async (req, res, next) => {
	try {
		const found = await Cart.findOne({ owner: req.body.owner });

		if (!found) {
			const newCart = await Cart.create(req.body);
			return res.json(newCart);
		} else {
			found.products.push(req.body.products);
			found.paid = req.body.paid;
			await found.save();
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
		if (!cart) throw new Error('Product not found in the cart found');
		cart.products.splice(req.body.index, 1);
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
		console.log(cart);
		cart.save();
		let newCart = await Cart.findOne({ _id: req.params.id })
			.populate('products')
			.exec();
		res.json(newCart);
	} catch (error) {
		res.json(error);
	}
});

router.delete('/:id', (req, res, next) => {
	Cart.findOneAndDelete({ owner: req.params.id })
		.then((cart) => (cart.paid = true))
		.then((cart) => res.json(cart));
});

module.exports = router;
