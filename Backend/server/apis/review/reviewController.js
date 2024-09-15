const review = require('./reviewModel')

const add = async (req, res) => {
    let validation = ""
    if (!req.body.userId) {
        validation += "UserId is Required"
    }
    if (!req.body.packageId) {
        validation += "PackageId is Required"
    }
    if (!req.body.review) {
        validation += "review is required"
    }
    if (!req.body.rating) {
        validation += "rating is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        let total = await review.countDocuments()
        let newReview = new review()
        newReview.autoId = total + 1
        newReview.userId = req.body.userId
        newReview.packageId = req.body.packageId
        newReview.review = req.body.review
        newReview.rating = req.body.rating

        newReview.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New Review Loaded",
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
    review.find(req.body)
        .populate('userId')
        .populate('packageId')
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "Reviews Loaded",
                total: result.length,
                data: result
            })
        })
        .catch(() => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })

}

///////single//
const single = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_Id is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error" + validation
        })
    }
    else {
        review.findOne({ _id: req.body._id })
            .populate('userId')
            .populate('packageId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "Review not found"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Review",
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
module.exports = { add, all, single }