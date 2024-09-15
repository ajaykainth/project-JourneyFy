const destination = require('../destination/destinationModel')
const hotel = require('../hotel/hotelModel')
const package = require('../packages/packageModel')
const User = require('../user/userModel')
const rooms = require('../rooms/roomsModel')
const customer = require('../customer/customerModel')

const adminDashboard = async (req, res) => {
    let totalDestination = await destination.countDocuments()
    let totalPackage = await package.countDocuments()
    let totalCustomers = await customer.countDocuments()
    let totalHotel = await hotel.countDocuments()
    

        res.send({
            success: true,
            status: 200,
            message: "Dashboard",
            totalDestination: totalDestination,
            totalPackage: totalPackage,
            totalCustomer: totalCustomers,
            totalHotel: totalHotel
        })
}
const hotelDashboard = async (req, res) => {
    let totalRooms = await rooms.countDocuments()

    res.send({
        success: true,
        status: 200,
        message: "dashboard",
       totalRooms:totalRooms
    })

}
module.exports = { adminDashboard, hotelDashboard }