const mongoose = require('mongoose')
const hotelSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    contact: { type: String, default: '' },
    image: { type: String , default: 'hotel/noImage.jpg' },
    description: { type: String, default: '' },
    destinationId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'destination'},
    userId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'user'},
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
})
module.exports = mongoose.model('hotel', hotelSchema)  