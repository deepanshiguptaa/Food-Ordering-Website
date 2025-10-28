import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/UserModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {

    const frontendUrl = "http://localhost:5173";

    try{
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name: item.name
                },
                unit_amount: item.price*100*80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?sucess=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?sucess=false&orderId=${newOrder._id}`,
        })
        res.json({success: true, message: "Order Placed Successfully", url: session.url});

    }
    catch(error){
        console.log(error);
        res.json({success:false, message: "error"});
    }
}
const verifyOrder= async (req,res)=>{

}
export {placeOrder,verifyOrder};