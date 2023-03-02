const mongoose = require('mongoose')

const bookingSchema =mongoose.Schema({
    roomid:{
        type  : String,
        required : true
       },
       userid:{
         type : String,
         required:true
       },
       HotelName:{
        type  : String,
        required : true
       },
       roomimage:{
          type : String,
       },
       fromdate:{
        type  : String,
        required : true,
        unique : true
       },
       todate:{
        type  : String,
        required : true
       },
       totaldays:{
        type  : String,
        required : true
       },
       totalprice:{
        type  : Number,
        required: true
       },
       transactionId : {
        type : String,
        required : true
       },
       status : {
        type : String,
       }
},
{
    timestamps: true,
})

const Booking = mongoose.model('Booking',bookingSchema)
module.exports = Booking