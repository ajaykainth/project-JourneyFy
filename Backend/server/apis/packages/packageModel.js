const mongoose=require('mongoose')
const packageSchema=mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: String, default: '' },
    destinationId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'destination'},
    hotelId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'hotel'},
    roomId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'rooms'},
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }

})
module.exports = mongoose.model('packages', packageSchema)  