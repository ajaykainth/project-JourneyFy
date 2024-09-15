import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices, { BASE_URL,  styleObj } from "../../Services/ApiServices";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import Moment from "react-moment"
export default function Vieworder(){
  const [data,setData]=useState([])
  const [load,setLoad]=useState(true)
  useEffect(()=>{
      ApiServices.allBooking().then((res)=>{
          setData(res.data.data)
          setTimeout(()=>{setLoad(false)},1000)
      }).catch((err)=>{
          toast.error("Something went Wrong.Try again later!")
      })
  },[load])
  const changeStatusBooking=(id,status)=>{
      setLoad(true)
      let data={
          _id:id,
          status:status
      }
      ApiServices.updateBooking(data).then((res)=>{
          if(res.data.success){
              toast.success(res.data.message)
          }
          else{
              toast.error(res.data.message)
          }
          setTimeout(()=>{setLoad(false)},1000)
      }).catch((err)=>{
          toast.error("Something went Wrong.Try again later!")
          setTimeout(()=>{setLoad(false)},1000)
      })
  }
    return(
        <>
     

        <div className="container-fluid bg-primary py-5 mb-5 hero-header">
    <div className="container py-5">
      <div className="row justify-content-center py-5">
        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
          <h1 className="display-3 text-white animated slideInDown">
          Bookings
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
           
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Booking
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>

      <div className="container">
  <div className="row">
    <div className="col-1"></div>
    <div className="col-10 table-responsive">
          <h1><u> View Booking</u></h1>
          <table className="text-capitalize table table-hover table-striped">
            <thead className="table-primary">
                <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">User Details</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Package</th>
                    <th scope="col">Guest No.</th>
                    <th scope="col">ID Proof</th>
                    <th scope="col">Booked On</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Action</th> */}
                </tr>
            </thead>
            <tbody>
            {data.map((el,index)=>(
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{el?.bookingName},<br/>{el?.emergencyContact}</td>
                    <td><Moment format="Do-MMMM-YYYY">{el.bookingDate}</Moment></td>
                    <td>{el.packageId.name}</td>
                    <td>{el.guestCount}</td>
                    <td><Link to={BASE_URL+el.idProof}>View</Link></td>
                    <td><Moment format="Do-MMMM-YYYY">{el.createdAt}</Moment></td>
                    <td>{el.status === "pending" ? "pending" : "Complete"}</td>
                    {/* <td>
                        {el.status=="pending"?
                        <>
                    <button className="btn btn-success" onClick={()=>{changeStatusBooking(el._id,"Approved")}}>Approve</button>   
                    <button className="btn btn-danger ms-2" onClick={()=>{changeStatusBooking(el._id,"Declined")}}>Decline</button>   
                    </> 
                    :el.status=="Approved"?
                    <button className="btn btn-success ms-2" onClick={()=>{changeStatusBooking(el._id,"Completed")}}>Completed</button>   
                    :el.status
                    }
                    </td> */}
                </tr>
            ))}
            </tbody>
          </table>
          </div>
          </div>
      </div>
    
        </>
    )
}