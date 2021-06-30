import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: String,
    categories: [String],
    image: String,
    price: String,
    description: String
});


const Product = mongoose.model('Product', ProductSchema);

export default Product