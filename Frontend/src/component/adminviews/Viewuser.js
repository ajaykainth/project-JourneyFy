import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices, { BASE_URL,  styleObj } from "../../Services/ApiServices";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import Moment from "react-moment"
export default function Viewuser(){
  const [data,setData]=useState([])
  const [load,setLoad]=useState(true)
  useEffect(()=>{
      ApiServices.allCustomer().then((res)=>{
          setData(res.data.data)
          setTimeout(()=>{setLoad(false)},1000)
      }).catch((err)=>{
          toast.error("Something went Wrong.Try again later!")
      })
  },[load])
    return(
        <>
       

        <div className="container-fluid bg-primary py-5 mb-5 hero-header">
    <div className="container py-5">
      <div className="row justify-content-center py-5">
        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
          <h1 className="display-3 text-white animated slideInDown">
            View user
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
                Users
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
          <h1><u> User List</u></h1>
          <table className="text-capitalize table table-hover table-striped">
            <thead className="table-primary">
                <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                </tr>
            </thead>
            <tbody>
            {data.map((el,index)=>(
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{el?.name}</td>
                    <td>{el.email}</td>
                    <td>{el.contact}</td>
                   
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