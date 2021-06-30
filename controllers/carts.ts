import express, {Request,Response,NextFunction } from 'express'
import Cart from '../models/Cart'
const router = express.Router()
interface CartFace {
    owner: number,
    products: string[],
    paid: boolean
}

router.get('/', (req:any, res:Response, next:NextFunction)=>{
    Cart.findOne({owner: req.session.userId}).then((cart:any)=>res.json(cart))
})
router.post('/', async (req:any, res:Response, next:NextFunction)=>{
    try{
        const found = await Cart.findOne({owner: req.session.userId})
        
        if(!found){
            const newCart = await Cart.create(req.body)
            return res.json(newCart)
        }else{
            found.products = req.body.products
            found.paid = req.body.paid
            await found.save()
            res.json(found)
            }
        } catch{

        }
    })
    
router.delete('/', (req:any, res:Response, next:NextFunction)=>{
    Cart.findOneAndDelete({owner: req.session.userid})
})

module.exports = router