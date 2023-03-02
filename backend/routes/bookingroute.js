const express = require('express');
const Booking = require('../models/Booking');
const { v4: uuidv4 } = require('uuid');



const stripe = require('stripe')('sk_test_51MWQK4SHRd7AZ6vBlQ7XG4iXVZId6OCOabono2qYKQj77Bwwc2Wa7lBNryzeV6xBLgqzrFTGAkop4KYeOjBJC67300HcvvEt32')
const router = express.Router();

router.post("/bookingRoom", async (req, res) => {
    const { roomid,userid, HotelName, fromdate, todate, totaldays, totalprice,roomimage, email,id} = req.body
    
   
    try {

        const customer = await stripe.customers.create({
            email: email,
            source: id
        })

        const payment = await stripe.paymentIntents.create({
            amount: totalprice*100,
            customer: customer.id,
            currency: 'inr',
            receipt_email: email
        },
        {
            idempotencyKey: uuidv4()
        });
        
        if(payment) {
            const newbooking = new Booking({
                HotelName: HotelName,
                roomid: roomid,
                userid:userid,
                roomimage:roomimage,
                fromdate: fromdate,
                todate: todate,
                totalprice: totalprice,
                totaldays: totaldays,
                transactionId: "1234",
                status: "booked"
            })
            const booking = await newbooking.save();
            
           
        }
        res.send('Payment Successfully , Your room is booked')
    }
    catch (error) {
      
        return res.status(400).json({ error });
    }

})
router.get("/mybookings", async (req, res) => {
    
    const allbookings = await Booking.find()
  
    res.send(allbookings);
  })

  router.post("/cancelbookingsdata", async (req, res) => {
    const {bookingid,bookedroomid} = req.body
    
    const cancelbookings = await Booking.findById(bookingid)
    
    cancelbookings.status = "cancelled"

    await cancelbookings.save()
  
    res.send("booking cancelled");
  })

module.exports = router