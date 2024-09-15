const User = require('../user/userModel');
const hotel = require('./hotelModel');
const bcrypt = require('bcrypt')
////////Add Hotel///////////////
const register = async (req, res) => {

    validation = ""

    if (!req.body.name) {
        validation += '-Name is required    '
    }
    if (!req.body.email) {
        validation += '- Email is required    '
    }
    if (!req.body.password) {
        validation += '- Password is required    '
    }
    if (!req.body.address) {
        validation += '- address is required    '
    }
    if (!req.body.contact) {
        validation += '-contact is required    '
    }
    if (!req.body.description) {
        validation += '-Description is required    '
    }
    if (!req.body.destinationId) {
        validation += '- destinationId is required    '
    }
    if (!req.file) {
        validation += " Image is Required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message:validation
        })
    }
    else {
        let prevHotel = await hotel.findOne({ email: req.body.email })
        if (prevHotel == null) {
            let totalUsers = await User.countDocuments()
            let newUser = new User()
            newUser.autoId = totalUsers + 1
            newUser.name = req.body.name
            newUser.email = req.body.email
            newUser.password = bcrypt.hashSync(req.body.password, 10)
            newUser.userType = 2

            newUser.save()
                .then(async (savedUser) => {
                    let totalHotels = await hotel.countDocuments()
                    let newHotel = new hotel()
                    newHotel.autoId = totalHotels + 1
                    newHotel.name = req.body.name
                    newHotel.email = req.body.email
                    newHotel.address = req.body.address
                    newHotel.contact = req.body.contact
                    newHotel.description = req.body.description
                    newHotel.destinationId = req.body.destinationId
                    newHotel.image = "hotel/" + req.file.filename
                    newHotel.userId = savedUser._id

                    newHotel.save()
                        .then((savedHotel) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "New Account Created",
                                data: savedUser
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        status: 500,
                        message: err.message
                    })
                })
        }
        else {
            res.send({
                success: false,
                status: 400,
                message: "Email already exists"
            })
        }

    }
}
//////////All Hotel////////////////
const all = (req, res) => {
    let start = 0
    if (!!req.body.startpoint) {
        start = req.body.startpoint
        delete req.body.startpoint
    }
    req.body.status = true
    hotel.find(req.body)
        .populate('destinationId')
        .sort({ createdAt: -1 })
        // .skip(start)
        // .limit(10)
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "Hotel Loaded",
                total: result.length,
                data: result
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
}
/////////single hotel ///////////////
const single = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error " + validation
        })
    }
    else {
        hotel.findOne({ _id: req.body._id })
            .populate('destinationId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "Hotel not found"

                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single hotel",
                        data: result
                    })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

////////////////////////
const update = async (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        let prevHotel = await hotel.findOne({
            $and: [
                // { name: req.body.name },
                // { address: req.body.address },
                { email: req.body.email },
                { _id: { $ne: req.body._id } }
            ]
        })
        if (prevHotel == null) {
            hotel.findOne({ _id: req.body._id }).exec()
                .then((result) => {
                    if (result == null) {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Hotel does not exist"
                        })
                    }
                    else {
                        if (!!req.body.name) result.name = req.body.name
                        if (!!req.body.address) result.address = req.body.address
                        if (!!req.body.contact) result.contact = req.body.contact
                        if (!!req.body.description) result.description = req.body.description
                        if (!!req.file) result.image = "hotel/" + req.file.filename

                        result.save()
                            .then((updatedData) => {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: "Hotel Updated",
                                    data: updatedData
                                })
                            })
                            .catch((err) => {
                                res.send({
                                    success: false,
                                    status: 500,
                                    message: err.message
                                })
                            })
                    }
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        status: 500,
                        message: err.message
                    })
                })
        }
        else {
            res.send({
                success: false,
                status: 400,
                message: "Hotel Name already exists"
            })
        }
    }
}
module.exports = { register, all, single, update }