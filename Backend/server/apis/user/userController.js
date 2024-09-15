const userModel = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = "%@^%$($@(&($*)(*$&*&@%!&*#^^%@827&*E"

const login = (req, res) => {
    let validation = ''
    if (!req.body.email) {
        validation += "Email is required  "
    }
    if (!req.body.password) {
        validation += "Password is required  "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message:validation
        })
    }
    else {
        userModel.findOne({ email: req.body.email }).exec()
            .then((userData) => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Account Does not exist"
                    })
                }
                else {
                    if (bcrypt.compareSync(req.body.password, userData.password)) {
                        if (userData.status) {
                            let payload = {
                                _id: userData._id,
                                name: userData.name,
                                email: userData.email,
                                userType: userData.userType
                            }
                            let token = jwt.sign(payload, secret, { expiresIn: "5h" })
                            res.send({
                                success: true,
                                status: 200,
                                message: "Login Successfull",
                                data: userData,
                                token: token
                            })
                        }
                        else {
                            res.send({
                                success: false,
                                status: 403,
                                message: "Account Inactive, Contact Admin"
                            })
                        }
                    }
                    else {
                        res.send({
                            success: false,
                            status: 403,
                            message: "Invalid Credentials"
                        })
                    }
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

const changePassword = (req, res) => {
    validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }
    if (!req.body.currentPassword) {
        validation = "currentPassword is required"
    }
    if (!req.body.newPassword) {
        validation = "newPassword is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: 'Validation Error' + validation
        })
    }
    else {
        userModel.findOne({ _id: req.body._id })
            .exec()
            .then((userData) => {
                if (userData == null) {  
                    res.send({
                        success: false,
                        status: 500,
                        message: "user not found"

                    })
                }
                else {
                    if (bcrypt.compareSync( req.body.currentPassword, userData.password)) {

                        if (bcrypt.compareSync( req.body.newPassword, userData.password)) {
                            res.send({
                                success: false,
                                status: 400,
                                message: "new password can't be same as old password"
                            })
                        }
                        else {
                            userData.password = bcrypt.hashSync(req.body.newPassword, 10)

                            userData.save()
                                .then((data) => {
                                    res.send({
                                        success: true,
                                        status: 200,
                                        message: "password updated",

                                    })
                                })
                                .catch((err) => {
                                    res.send({
                                        success: false,
                                        status: 400,
                                        message: err.message
                                    })
                                })
                        }
                    }
                    else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Invalid Password"
                        })
                    }
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
const changeStatus = (req, res) => {
    validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!req.body.status) {
        validation += "status is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: 'Validation Error' + validation
        })
    }
    else {
        userModel.findOne({ _id: req.body._id })
        .exec()
        .then((userData) => {
            if (userData == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "User Does not exist"
                })
            }
            else {
                if (req.body.status) {
                    userData.status = req.body.status

                }
                userData.save()
                    .then((updatedStatus) => {
                        res.send({
                            success: true,
                            status: 200,
                            message: "Status updated",
                            data: updatedStatus
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
                    status: 400,
                    message: err.message
                })
            })
    }
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
        userModel.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "User not found"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single User",
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
module.exports = { login, changePassword, changeStatus,single }