
import { Fragment, useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices, { BASE_URL } from "../Services/ApiServices";
import FadeLoader from "react-spinners/FadeLoader";


export default function ShowUserBooking() {
  const [BookingData, setBookingData] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)

    
    let data = {
      userId: sessionStorage.getItem("userId"),
    }
    console.log(data);
    ApiServices.AllBooking(data)
      .then((res) => {
        
        console.log(res);
        if(data){

          setBookingData(res.data.data)
        }

        setTimeout(() => {
          setLoading(false)
        }, 1000)

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, [isChange])

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "text-warning ";
      case "Complete":
        return "text-success ";
      case "canceled":
        return "text-danger";
      default:
        return "";
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div className="preloader">
          <FadeLoader
            color={"#1f9c2e"}

            loading={loading}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="container-fluid bg-primary py-5 mb-5 hero-header">
            <div className="container py-5">
              <div className="row justify-content-center py-5">
                <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                  <h1 className="display-3 text-white animated slideInDown">Booking</h1>
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

          {/* ///////////// */}

          <div className="container" style={{ height: "50vh", overflow: "auto" }}>
            <div className="row">
              <div className="col-12 mb-3 mb-lg-5 ">
                <div className="overflow-hidden card table-nowrap table-card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">All Bookings</h5>

                  </div>
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead className="small text-uppercase bg-body text-muted">
                        <tr>
                          <th>Sno.</th>
                          {/* <th>IdProof</th> */}
                          <th>Name</th>
                          <th>Duration</th>
                          <th>Guests</th>
                          <th>Status</th>
                          <th>Review</th>

                        </tr>
                      </thead>
                      <tbody>
                        {BookingData?.map((el, index) => (
                          <Fragment key={index}>
                            <tr className="align-middle">
                              <td>{index + 1}</td> 
                              <td>
                                <div className="d-flex align-items-center">

                                  <div>
                                    <div className="h6 mb-0 lh-1">{el.packageId?.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{el.packageId?.duration}</td>
                              <td>
                                {" "}
                                <span className="d-inline-block align-middle">{el.guestCount}</span>
                              </td>

                              <td className={getStatusClass(el.status)} style={{ textTransform: "capitalize" }}>{el.status === "pending" ? "pending" : "Complete"}</td>
                              <td className="text-center">
                                {el.status === 'complete' &&
                                  <Link to={"/addReview/" + el.packageId?._id} className="edit" title="Edit" data-toggle="tooltip" style={{ fontSize: "25px", color: '#ffc107' }}> <i className="bi bi-star-fill"></i></Link>
                                }
                              </td>

                            </tr>
                          </Fragment>
                        ))}



                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
    </Fragment>
  )
}