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
		console.log(found);
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

router.delete('/:id', (req, res, next) => {
	Cart.findOneAndDelete({ owner: req.params.id })
		.then((res) => (res.paid = true))
		.then((res) => res.json(res));
});

module.exports = router;
