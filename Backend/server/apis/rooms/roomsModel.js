const mongoose = require('mongoose')
const roomsSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    price: { type:String, default: '' },
    description: { type:String, default: '' },
    hotelId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'hotel' },
    image: { type: String, default: 'hotel/noImage.jpg' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
})
module.exports = mongoose.model('rooms', roomsSchema)  