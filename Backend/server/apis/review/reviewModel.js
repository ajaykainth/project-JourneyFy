const mongoose = require('mongoose')
const reviewSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    packageId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'packages' },
    review: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
})

module.exports = mongoose.model("review", reviewSchema)