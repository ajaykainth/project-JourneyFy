const packages = require('./packageModel')

const add = async (req, res) => {
    let validation = '';
    if (!req.body.name) {
        validation += 'Name is Required ';

    }
    
    if (!req.body.duration) {
        validation += 'duration is Required ';

    }
    if (!req.body.description) {
        validation += 'description is Required ';

    }
    if (!req.body.price) {
        validation += 'Price is Required ';

    }
    if (!req.body.price) {
        validation += 'Package Price is Required ';

    }
    if (!req.body.destinationId) {
        validation += 'destination is Required ';

    }
    if (!req.body.hotelId) {
        validation += 'hotel is Required ';

    }
    if (!req.body.roomId) {
        validation += 'room is Required ';

    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message:validation
        })
        
    }
    else {
        let total = await packages.countDocuments()
        let newPackage = new packages()
        newPackage.autoId = total + 1
        newPackage.name = req.body.name
        newPackage.duration = req.body.duration
        newPackage.description = req.body.description
        newPackage.price = req.body.price
        newPackage.destinationId = req.body.destinationId
        newPackage.hotelId = req.body.hotelId
        newPackage.roomId = req.body.roomId

        newPackage.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New package added",
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
    req.body.status = true
    packages.find(req.body)
        .populate('destinationId')
        .populate('hotelId')
        .populate('roomId')
        .sort({ createdAt: -1 })
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "Package Loaded",
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
        packages.findOne({ _id: req.body._id })
        .populate('destinationId')
        .populate('hotelId')
        .populate('roomId')
        .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "package not found"

                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single package",
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
            message:validation
        })
    }
    else {
        packages.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "package does not exist"
                    })
                }
                else {
                    if (!!req.body.name) result.name = req.body.name
                    if (!!req.body.duration) result.duration = req.body.duration
                    if (!!req.body.description) result.description = req.body.description
                    if (!!req.body.price) result.price = req.body.price


                    result.save()
                        .then((updatedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "package Updated",
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
            message:validation
        })
    }
    else {
        packages.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "package does not exist"
                    })
                }
                else {
                    result.status = false

                    result.save()
                        .then((updatedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Package Deleted",
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