const router = require('express').Router();
const multer = require('multer')
const destinationController = require('../apis/destination/destinationController')
const hotelController = require('../apis/hotel/hotelController')
const userController = require("../apis/user/userController")
const customerController = require('../apis/customer/customerController')
const packageController = require('../apis/packages/packageController')
const bookingController = require('../apis/booking/bookingController')
const roomController = require('../apis/rooms/roomsController')
const dashboardController = require('../apis/dashboard/dashboardController')
const reviewController = require('../apis/review/reviewController')




///destination///
router.post('/destination/all', destinationController.all)
router.post('/destination/single', destinationController.single)

//hotel////
router.post('/hotel/all', hotelController.all)
router.post('/hotel/single', hotelController.single)

///package////////
router.post('/package/all', packageController.all)
router.post('/package/single', packageController.single)

///-----------TOKEN CHECKER---------------///
router.use(require('../middleware/tokenChecker'))

//Dashboard----------------------------
router.post('/Dashboard', dashboardController.adminDashboard)
////change password/////
router.post('/changePassword', userController.changePassword)


///changeStatus
router.post('/changeStatus', userController.changeStatus)


// Destination ////
const destinationStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "server/public/destination")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.fieldname + "-" + file.originalname)
    }
})
const destinationUpload = multer({ storage: destinationStorage })
router.post('/destination/add', destinationUpload.single('image'), destinationController.add)
router.post('/destination/update', destinationUpload.single('image'), destinationController.update)
router.post('/destination/delete', destinationController.del)

//////Hotel////////////////
const hotelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "server/public/hotel")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.fieldname + "-" + file.originalname)
    }
})

const hotelUpload = multer({ storage: hotelStorage })
router.post('/hotel/register', hotelUpload.single('image'), hotelController.register)
router.post('/hotel/update', hotelUpload.single('image'), hotelController.update)

//////Package////////////////
router.post('/package/add', packageController.add)
router.post('/package/update', packageController.update)
router.post('/package/delete', packageController.del)

////////ROOMS//////
router.post('/room/all', roomController.all)
router.post('/room/single', roomController.single)

//////Booking////////////////
router.post('/booking/all', bookingController.all)
router.post('/booking/single', bookingController.single)
router.post('/booking/update', bookingController.updateStatus)

/////Customer Routes////////
router.post('/customer/all', customerController.all)
router.post('/customer/single', customerController.single)

////Review Routes////
router.post('/review/all',reviewController.all)
router.post('/review/single',reviewController.single)

////User Routes////
router.post('/user/single',userController.single)

router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router