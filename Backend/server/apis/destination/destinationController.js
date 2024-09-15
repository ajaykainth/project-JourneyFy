
const destination = require('./destinationModel')

const add = async (req, res) => {
    let validation = '';

    if (!req.body.name) {
        validation += 'Name is required '
    }
    if (!req.body.address) {
        validation += 'Address is Required';

    }
    if (!req.file) {
        validation += "Image is Required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message:validation
        })
    }
    else {
        let total = await destination.countDocuments()
        let location = new destination()
        location.autoId = total + 1
        location.name = req.body.name
        location.address = req.body.address
        location.image = "destination/" + req.file.filename


        location.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New location added",
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
const all = (req, res) => {
    let start = 0
    if (!!req.body.startpoint) {
        start = req.body.startpoint
        delete req.body.startpoint
    }
    req.body.status = true

    destination.find(req.body)
        // .sort({ createdAt: -1 })
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "destinations Loaded",
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
        destination.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "destination not found"

                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single destination",
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
        destination.findOne({ _id: req.body._id })
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Destination does not exist"
                    })
                }
                else {
                    if (!!req.body.name) result.name = req.body.name
                    if (!!req.body.address) result.address = req.body.address
                    if (!!req.file) result.image = "destination/" + req.file.filename

                    result.save()
                        .then((updatedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Destination Updated",
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
        destination.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "destination does not exist"
                    })
                }
                else {
                    result.status = false
                    result.save()
                        .then((updatedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Destination Deleted",
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