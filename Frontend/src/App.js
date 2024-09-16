
import './App.css';

import { useState, useEffect, Fragment } from 'react'
import FadeLoader from "react-spinners/FadeLoader";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'aos/dist/aos.css'
import Master from './component/layout/Master';
import Home from './component/Home';
import About from './component/About';
import Packages from './component/Packages';
import Destination from './component/Destination';
import Contact from './component/Contact';
import Error from './component/layout/Error';
import AdminMaster from './component/layout/AdminMaster';
import Dashboard from './component/layout/Dashboard';
import HotelDashboard from "./component/layout/HotelDashboardd"
import Login from './component/Login';
import Register from './component/Register';
import AllDestination from './component/AllDestination';
import AddDestination from './component/AddDestination';
import ManageDestination from './component/ManageDestination';
import "react-toastify/dist/ReactToastify.css"
import AddPackage from './component/AddPackage';
import ManagePackage from './component/ManagePackage';
import SinglePackage from './component/SinglePackage';
import UpdatePackage from './component/UpdatePackage';
import HotelMaster from './component/layout/HotelMaster';
import AllRooms from './component/AllRooms';
import AddRoom from './component/AddRoom';
import ManageRoom from './component/ManageRoom';
import SingleDestination from './component/SingleDestination';
import UpdateDestination from './component/UpdateDestination';
import UpdateHotel from './component/UpdateHotel';
import UpdateRoom from './component/UpdateRoom';
import AllHotel from './component/AllHotel';
import ManageHotel from './component/ManageHotel';
import Calculator from './component/Calculator';
import AllCustomer from './component/AllCustomer';
import Faq from './component/Faq';
import SingleBooking from './component/SingleBooking';
import AddHotel from './component/AddHotel';
import SingleHotel from './component/SingleHotel';
import ChangePassword from './component/ChangePassword';
import ShowUserBooking from './component/ShowUserBooking';
import AddReview from './component/AddReview';
import ViewReviews from './component/ViewReviews';
import ViewRatinsAdmin from './component/ViewRatingsAdmin';
import Viewuser from './component/adminviews/Viewuser';
import Vieworder from './component/adminviews/Vieworder';
import Weather from './component/Weather';
import UserProfile from './component/UserProfile';
import EditProfile from './component/EditProfile';
import ReactSelect from './component/ReactSelect';



function App() {

  const [loading, setLoading] = useState(true)
  useEffect(() => {

    setTimeout(() => {
      setLoading(false)
    }, 1000)

  })
  return (
    <Fragment>

      {loading ?
        <div className='preloader '
        >
          <FadeLoader
            color={"#1f9c2e"}
            loading={loading}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div> :
        <BrowserRouter>
          <Routes>
            {/*-------Customer Routes--------- */}

            <Route path="/" element={<Master />}>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/packages/:id' element={<Packages />} />
              <Route path='/booking/:id' element={<SingleBooking />} />
              <Route path='/destination' element={<Destination />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/showuserbooking' element={<ShowUserBooking />}></Route>
              <Route path='/changePassword' element={<ChangePassword />}> </Route>
              <Route path='/addReview/:id' element={<AddReview />}> </Route>
              <Route path='/addReview/:id' element={<AddReview />}> </Route>
              <Route path='/edit' element={<EditProfile />} />
              <Route path='/userprofile/' element={<UserProfile />}>


              </Route>
              <Route path='/viewReviews' element={<ViewReviews />}> </Route>

            </Route>

            {/*-------Admin Routes--------- */}

            <Route path='/admin' element={<AdminMaster />}>
              <Route path='/admin' element={<Dashboard />}> </Route>
              <Route path='/admin/adddestination' element={<AddDestination />} />
              <Route path='/admin/alldestination' element={<AllDestination />} />
              <Route path='/admin/singledestination/:id' element={<SingleDestination />}> </Route>
              <Route path='/admin/updatedestination/:id' element={<UpdateDestination />}> </Route>
              <Route path='/admin/managedestination' element={<ManageDestination />}> </Route>
              <Route path='/admin/addhotel' element={<AddHotel />}> </Route>
              <Route path='/admin/allhotels' element={<AllHotel />}> </Route>
              <Route path='/admin/singlehotel/:id' element={<SingleHotel />}> </Route>
              <Route path='/admin/updatehotel/:id' element={<UpdateHotel />}> </Route>
              <Route path='/admin/managehotel' element={<ManageHotel />}> </Route>
              <Route path='/admin/rooms' element={<AllRooms />}> </Route>
              <Route path='/admin/addpackage' element={<AddPackage />}> </Route>
              <Route path='/admin/allpackages' element={<Packages />}> </Route>
              <Route path="/admin/managepackage" element={<ManagePackage />}></Route>
              <Route path="/admin/singlepackage/:id" element={<SinglePackage />}></Route>
              <Route path="/admin/updatepackage/:id" element={<UpdatePackage />}></Route>
              <Route path='/admin/allcustomer' element={<AllCustomer />}> </Route>
              <Route path="/admin/Viewuser" element={<Viewuser />} />
              <Route path="/admin/Vieworder" element={<Vieworder />} />
              {/* <Route path="/Admin/Viewenquiry" element={<Viewenquiry/>}/> */}
              <Route path='/admin/view-rating' element={<ViewRatinsAdmin />} />

            </Route>
            {/* <Route path='/hotelregister' element={<HotelRegister />}> </Route> */}

            {/*-------Hotel Routes--------- */}

            <Route path="/hotel" element={<HotelMaster />}>
              <Route path="/hotel" element={<HotelDashboard />} />
              <Route path="/hotel/addroom" element={<AddRoom />} />
              <Route path="/hotel/rooms" element={<AllRooms />} />
              <Route path="/hotel/manageroom" element={<ManageRoom />} />

              <Route path="/hotel/updateroom/:id" element={<UpdateRoom />} />
              <Route path='/hotel/changePassword' element={<ChangePassword />}> </Route>
            </Route>


            <Route path='/Reactselect' element={<ReactSelect />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error />}> </Route>
            <Route path='/calculator' element={<Calculator />} />
            <Route path='/weather' element={<Weather />} />

          </Routes>
        </BrowserRouter>
      }
      <ToastContainer />

    </Fragment>
  );
}

export default App;
