import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
	owner: {
    type: mongoose.Schema.Types.ObjectId,
	ref: 'User'
},
    products:{
    type: [String] ,
    // ref:'Product'
},
    paid: Boolean
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart
//POPULATE MONGOOSE REF PRODUCTS