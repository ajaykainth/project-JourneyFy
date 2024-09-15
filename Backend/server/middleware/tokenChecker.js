const jwt = require('jsonwebtoken')
const secret="%@^%$($@(&($*)(*$&*&@%!&*#^^%@827&*E"

const check = (req, res, next) => {
    let token = req.headers["authorization"]

    if (!!token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.send({
                    success: false,
                    status: 403,
                    message: "Unauthorizes Access"
                })
            }
            else {
                next()
            }
        })
    }
    else {
        res.send({
            success: false,
            status: 403,
            message: "No Token Found"
        })
    }
}
module.exports = check