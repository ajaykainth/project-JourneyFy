const mongoose = require('mongoose')
const destinationSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    image: { type: String , default: 'destination/noImage.jpg' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
})
module.exports = mongoose.model('destination', destinationSchema)  