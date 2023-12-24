import { NextApiRequest, NextApiResponse } from "next"
import { buffer } from "micro"
import Stripe from "stripe"
import prisma from "@/libs/prismadb"

// create a local endpoint with stripe and webhook

export const config={
    api:{
        bodyParser:false
    }
}
// configure stripe
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:'2023-10-16'
})
// create the endpoint (and event)
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    // able to read the raw data
const buf=await buffer(req)
// will be available in headers
const sig=req.headers['stripe-signature']
if(!sig){
    return res.status(400).send("Missing stripe signature")
}
let event:Stripe.Event;
try{
    event=stripe.webhooks.constructEvent(buf,sig,process.env.STRIPE_WEBHOOK_SECRET!);
}
catch(err){
    res.status(400).send('Webhook Error: ' + err)
    return;
}
// switch to check the different events
switch(event.type){
case 'charge.succeeded':
    const charge:any=event.data.object as Stripe.Charge;
    if(typeof charge.payment_intent==='string'){
        await prisma?.order.update({
            where:{paymentIntentId: charge.payment_intent},
            data:{status:'complete',address: charge.shipping?.address},
        })
    }
    break
    default:
        console.log("Unhandled event type:" + event.type)
}
res.json({received:true})
    

}
