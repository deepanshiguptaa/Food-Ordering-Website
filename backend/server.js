import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoute.js'
import CartRouter from './routes/CartRoute.js'
import orderRouter from './routes/OrderRoute.js'
import contactRoute from './routes/contactRoute.js'
import Stripe from "stripe";

const app = express()

app.use(cors({
  origin: ['http://localhost:5175'],
  credentials: true
}));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json())

app.post('/api/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;

    // 🛑 VALIDATE INPUT (Amount must be a number > 50 cents)
    if (!amount || typeof amount !== 'number' || amount < 50) {
        return res.status(400).json({ 
            error: "Invalid payment amount. Amount must be specified in cents and be at least 50." 
        });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // in cents
            currency: currency || 'usd', // Default to USD if client doesn't specify
            automatic_payment_methods: { enabled: true },
        });

        // Use 200 explicitly for clarity
        res.status(200).send({ clientSecret: paymentIntent.client_secret }); 
        
    } catch (err) {
        console.error("Stripe Error:", err);
        // Return 500 for server-side errors
        res.status(500).json({ error: "Failed to create Payment Intent: " + err.message }); 
    }
});

app.use('/api/food',foodRouter)
app.use('/uploads', express.static('uploads')); 
app.use('/api/user',userRouter)
app.use('/api/cart', CartRouter)
app.use('/api/order',orderRouter)
app.use('/api/contact',contactRoute)

const port = process.env.PORT || 5000


connectDB() 


app.get('/',(req, res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log(`server is running on port: ${port}`))

