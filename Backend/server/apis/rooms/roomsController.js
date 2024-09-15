const rooms = require('./roomsModel')

////////add rooms/////
const add = async (req, res) => {
    let validation = '';
    if (!req.body.name) {
        validation += '  -Name is Required';

    }
    if (!req.body.price) {
        validation += '  -Price is Required';

    }
    if (!req.body.description) {
        validation += '  -Description is Required';

    }
    if (!req.body.hotelId) {
        validation += '  -HotelId is Required';

    }

    if (!req.file) {
        validation += "  -Image is Required "
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        let total = await rooms.countDocuments()
        let newRooms = new rooms()
        newRooms.autoId = total + 1
        newRooms.name = req.body.name
        newRooms.price = req.body.price
        newRooms.description = req.body.description
        newRooms.hotelId = req.body.hotelId
        newRooms.image = "room/" + req.file.filename


        newRooms.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New Room added",
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

}
////////all rooms
const all = (req, res) => {
    req.body.status = true
    rooms.find(req.body)
        .populate('hotelId')
        .sort({ createdAt: -1 })
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "Room Loaded",
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
////////single room////
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
        rooms.findOne({ _id: req.body._id })
            .populate('hotelId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "Room not found"

                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Room",
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
/////update room////
const update = (req, res) => {
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
        rooms.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "room does not exist"
                    })
                }
                else {
                    if (!!req.body.name) result.name = req.body.name
                    if (!!req.body.price) result.price = req.body.price
                    if (!!req.body.description) result.description = req.body.description
                    if (!!req.file) result.image = "room/" + req.file.filename

                    result.save()
                        .then((updatedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "room Updated",
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
///////////delete room ////////////

const del = (req, res) => {
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
        rooms.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "room does not exist"
                    })
                }
                else {
                    result.status = false

                    result.save()
                        .then((updatedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Room Deleted",
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
module.exports = { add, all, single, update, del }