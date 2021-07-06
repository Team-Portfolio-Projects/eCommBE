const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

router.get('/', (req, res, next) => {
	return Cart.findOne({ owner: req.session.userId })
		.populate('Product')
		.exec((err, cart) => res.json(cart));
	//.then((cart) => res.json(cart));
});

router.post('/', async (req, res, next) => {
	try {
		const found = await Cart.findOne({ owner: req.session.userId });

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

router.delete('/', (req, res, next) => {
	Cart.findOneAndDelete({ owner: req.session.userid });
});

module.exports = router;
