const booking = require('./bookingModel')

/////add/////
const add = async (req, res) => {
    let validation = ""
    if (!req.body.packageId) {
        validation += "packageId is required"
    }
    if (!req.body.userId) {
        validation += "userId is required"
    }

    if (!req.body.bookingName) {
        validation += "Booking name is required          "
    }
    if (!req.body.emergencyContact) {
        validation += "Emergency contact is required"
    }
    if (!req.file) {
        validation += "Id Proof  is Required "
    }

    if (!req.body.guestCount) {
        validation += "No. Of Guest is required"
    }
    if (!req.body.bookingDate) {
        validation += "Booking Date is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message:validation
        })
    }
    else {
        let total = await booking.countDocuments()
        let newBooking = new booking()
        newBooking.autoId = total + 1
        newBooking.userId = req.body.userId
        newBooking.packageId = req.body.packageId
        newBooking.bookingName = req.body.bookingName
        newBooking.emergencyContact = req.body.emergencyContact
        newBooking.idProof = "booking/" + req.file.filename
        newBooking.guestCount = req.body.guestCount
        newBooking.bookingDate = req.body.bookingDate

        newBooking.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New Booking Added",
                    data: result
                })

            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    essage: err.message
                })
            })


    }
}
const all = (req, res) => {
    booking.find(req.body)
        .populate('packageId')
        .populate('userId')
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "Booking Loaded",
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
const single = (req, res) => {
    validation = ""
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
        booking.findOne({ _id: req.body._id })
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "Booking not Found"
                    })
                }
                else {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Booking",
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
const updateStatus = (req, res) => {
    validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 500,
            message: "Validation Error :" + validation
        })
    }
    else {
        reservation.findOne({ _id: req.body._id })
            .populate('userId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Reservation does not exist"
                    })
                }
                else {
                    if (!!req.body.status)
                        result.status = req.body.status

                    result.save()
                        .then((updatedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Table Reservation Successful",
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
}
module.exports = { add, all, single, updateStatus }
