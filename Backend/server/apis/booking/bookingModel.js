const mongoose = require('mongoose')
const bookingSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'packages', default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    bookingName: { type: String, default: '' },
    emergencyContact: { type: Number, default: null },
    idProof: { type: String, default: 'booking/noImage.jpg' },
    guestCount: { type: Number, default: 0 },
    bookingDate: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
})
module.exports = mongoose.model('booking', bookingSchema)