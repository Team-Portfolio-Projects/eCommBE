const express = require('express');
const { isConstructorDeclaration } = require('typescript');
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

		let index = found?.products.findIndex(
			(product) => product.id === req.body.products
		);
		if (!found) {
			const newCart = await Cart.create(req.body);
			return res.json(newCart);
		} else if (index >= 0) {
			console.log(found.products[index]);
			found[index].quanity += 1;

			found.save();
			return res.json(found);
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
		cart.save();
		let newCart = await Cart.findOne({ _id: req.params.id })
			.populate('products')
			.exec();
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

module.exports = router;
