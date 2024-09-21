import axios from "axios"
import * as qs from "qs"
export const BASE_URL = "https://journeyfy.onrender.com/"

class ApiServices {
    getToken(){
        let obj={
            Authorization:sessionStorage.getItem('token')
        }
        return obj
    }

    login(data) {
        return axios.post(BASE_URL + "user/login", data)
    }
    changePassword(data) {
        return axios.post(BASE_URL + "user/changePassword", data,{headers:this.getToken()})
    }
    updateProfile(data) {
        return axios.post(BASE_URL + "customer/updateProfile", data,{headers:this.getToken()})
    }
    customerRegister(data) {
        return axios.post(BASE_URL + "customer/register", data)
    }
    dashboard(data) {
        return axios.post(BASE_URL + "admin/dashboard",data,{headers:this.getToken()})
    }
    Dashboard(data) {
        return axios.post(BASE_URL + "hotel/dashboard",data,{headers:this.getToken()})
    }
    adddestination(data) {
        return axios.post(BASE_URL + "admin/destination/add", data,{headers:this.getToken()})
    }
    SingleDestination(data) {
        return axios.post(BASE_URL + "admin/destination/single", qs.stringify(data))
    }
    singleHotel(data) {
        return axios.post(BASE_URL + "admin/hotel/single", qs.stringify(data))
    }
    
    alldestination(allDestinationdata) {
        return axios.post(BASE_URL + "admin/destination/all", allDestinationdata)
    }
    allDestination(allDestinationdata) {
        return axios.post(BASE_URL + "customer/destination/all", allDestinationdata)
    }
    updatedestination(data) {
        return axios.post(BASE_URL + "admin/destination/update", data,{headers:this.getToken()})
    }
    deletedestination(data) {
        return axios.post(BASE_URL + "admin/destination/delete", data,{headers:this.getToken()})
    }
    allhotel(allHotelData) {
        return axios.post(BASE_URL + "admin/hotel/all", allHotelData)
    }
    addhotel(data) {
        return axios.post(BASE_URL + "admin/hotel/register", data,{headers:this.getToken()})
    }
    Updatehotel(data) {
        return axios.post(BASE_URL + "admin/hotel/update", data,{headers:this.getToken()})
    }
    addroom(data) {
        return axios.post(BASE_URL + "hotel/room/add", data,{headers:this.getToken()})
    }
    allpackages(data) {
        return axios.post(BASE_URL + "admin/package/all",data)
    }
    addpackage(data) {
        return axios.post(BASE_URL + "admin/package/add", data,{headers:this.getToken()})
    }
    singlePackage(data) {
        return axios.post(BASE_URL + "admin/package/single", qs.stringify(data))
    }
    SinglePackage(data) {
        return axios.post(BASE_URL + "customer/package/single", data)
    }
    deletepackage(data){
        return axios.post(BASE_URL+"admin/package/delete",data,{headers:this.getToken()})
    }
    updatepackage(data) {
        return axios.post(BASE_URL + "admin/package/update", data,{headers:this.getToken()})
    }
    allrooms(data) {
        return axios.post(BASE_URL + "admin/room/all",data,{headers:this.getToken()})
    }
    allRoom(data) {
        return axios.post(BASE_URL + "hotel/room/all",data)
    }
    
    singleRoom(data) {
        return axios.post(BASE_URL + "hotel/room/single", qs.stringify(data))
    }
    updateroom(data) {
        return axios.post(BASE_URL + "hotel/room/update", data,{headers:this.getToken()})
    }
    deleteroom(data){
        return axios.post(BASE_URL+"hotel/room/delete",data,{headers:this.getToken()})
    }
    allcustomer() {
        return axios.post(BASE_URL + "admin/customer/all",{},{headers:this.getToken()})
    }
    singleCustomer(data) {
        return axios.post(BASE_URL + "admin/customer/single", data,{headers:this.getToken()})
    }
    changeStatus(data) {
        return axios.post(BASE_URL + "admin/changeStatus", qs.stringify(data),{headers:this.getToken()})
    }
    allBooking(data) {
        return axios.post(BASE_URL + "admin/booking/all",data,{headers:this.getToken()})
    }
    AllBooking(data) {
        return axios.post(BASE_URL + "customer/booking/all",data,{headers:this.getToken()})
    }
    allBooking(data) {
        return axios.post(BASE_URL + "admin/booking/all",data,{headers:this.getToken()})
    }
    addbooking(data) {
        return axios.post(BASE_URL + "customer/booking/add", data,{headers:this.getToken()})
    }
    updateBooking(data) {
        return axios.post(BASE_URL + "admin/booking/update", qs.stringify(data),{headers:this.getToken()})
    }
    //registerhotel
    registerHotel(registerHotelData) {
        return (
            axios.post(BASE_URL + "admin/hotel/register", registerHotelData,{headers:this.getToken()})
        )
    }
    singleBooking(data){
        return axios.post(BASE_URL+"admin/booking/single",data,{headers:this.getToken()})
       }
    addRating(data){
        return axios.post(BASE_URL+"customer/review/add",data,{headers:this.getToken()})
       }
    allReview(data){
        return axios.post(BASE_URL+"customer/review/all",data)
       }
    allRating(data){
        return axios.post(BASE_URL+"admin/review/all",data,{headers:this.getToken()})
       }
    allCustomer(data){
        return axios.post(BASE_URL+"admin/customer/all",data,{headers:this.getToken()})
       }
    AllHotel(data){
        return axios.post(BASE_URL+"hotel/all",data,{headers:this.getToken()})
       }
}

export default new ApiServices