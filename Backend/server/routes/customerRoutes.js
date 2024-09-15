const router = require('express').Router();
const multer = require('multer')
const userController = require("../apis/user/userController")
const destinationController = require('../apis/destination/destinationController')
const hotelController = require('../apis/hotel/hotelController')
const roomsController = require('../apis/rooms/roomsController')
const customerController = require('../apis/customer/customerController')
const packageController = require('../apis/packages/packageController')
const bookingController = require('../apis/booking/bookingController')
const reviewController = require('../apis/review/reviewController')

router.post('/register', customerController.register)

///////destination//////
router.post('/destination/all', destinationController.all)
router.post('/destination/single', destinationController.single)
///////Hotel////////
router.post('/hotel/all', hotelController.all)
router.post('/hotel/single', hotelController.single)

///rooms///////
router.post('/room/all', roomsController.all)
router.post('/room/single', roomsController.single)

///packages/////
router.post('/package/all', packageController.all)
router.post('/package/single', packageController.single)

// booking
router.post('/booking/single', bookingController.single)
router.post('/booking/all', bookingController.all)

// review
router.post('/review/all',reviewController.all)
router.post('/review/single',reviewController.single)

// /////middleware
router.use(require('../middleware/tokenChecker'))

//////customer
router.post('/changePassword', userController.changePassword)
router.post('/updateProfile', customerController.updateProfile)


//////Booking/////
const bookingStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "server/public/booking")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.fieldname + "-" + file.originalname)
    }
})
const idProof = multer({ storage: bookingStorage })
router.post('/booking/add', idProof.single('idProof'), bookingController.add)


////Review//////
router.post('/review/add',reviewController.add)


////User Routes////
router.post('/user/single',userController.single)

/////All/////////
router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router