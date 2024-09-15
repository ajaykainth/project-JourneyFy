import { Fragment, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices, { BASE_URL } from "../../Services/ApiServices";
import AllDestination from "../AllDestination";
import AllHotel from "../AllHotel";
import AllPackages from "../Packages";
import AllCustomer from "../AllCustomer";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [dataShow, setDataShow] = useState(1);

  const [BookingData, setBookingData] = useState([]);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    ApiServices.allBooking()
      .then((res) => {
        console.log(res);
        setBookingData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isChange]);

  const changeStatus = (id, currentStatus) => {
    console.log(id, currentStatus);
    let newStatus = currentStatus === "pending" ? "complete" : "";
    let data = {
      _id: id,
      status: newStatus,
    };
    // console.log(data);

    ApiServices.updateBooking(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setIsChange((prevState) => !prevState);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ApiServices.dashboard()
      .then((dashboardRes) => {
        setDashboardData(dashboardRes.data);
        console.log(dashboardRes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "text-warning fs-5";
      case "Complete":
        return "text-success fs-5";
      case "canceled":
        return "text-danger fs-5";
      default:
        return "";
    }
  };

  return (
    <Fragment>
      <div className="container dashboard bg-light">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li
                className="breadcrumb-item active dashboardhead"
                onClick={() => {
                  setDataShow(1);
                }}
              >
                Dashboard
              </li>
            </ol>
          </nav>
        </div>
        <div className="container">
          <div className="row d-flex justify-center align-item-center">
            <div className=" col-xl-3  col-lg-6 col-sm-12">
              <div className="card l-bg-cherry">
                <div
                  className="card-statistic-3 p-4"
                  onClick={() => {
                    setDataShow(2);
                  }}
                >
                  <div className="card-icon card-icon-large">
                    <i className="fas fa-users" />
                  </div>
                  <div className="cardh5 mb-4">
                    <h5 className="card-title mb-0">Customers</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0 text-white">
                        {dashboardData.totalCustomer}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-lg-6">
              <div className="card l-bg-blue-dark">
                <div
                  className="card-statistic-3 p-4"
                  onClick={() => {
                    setDataShow(3);
                  }}
                >
                  <div className="card-icon card-icon-large">
                    <i className="fa-solid fa-mountain-city fas" />
                  </div>
                  <div className="cardh5 mb-4">
                    <h5 className="card-title mb-0">Destinations</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0 text-white">
                        {dashboardData.totalDestination}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-lg-6">
              {/* <Link to={"/admin/allhotels"}> */}
              <div
                className="card l-bg-green-dark"
                onClick={() => {
                  setDataShow(4);
                }}
              >
                <div className="card-statistic-3 p-4">
                  <div className="card-icon card-icon-large">
                    <i className="fa-solid fa-hotel  fas" />
                  </div>
                  <div className="cardh5 mb-4">
                    <h5 className="card-title mb-0">Hotels</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0 text-white">
                        {dashboardData.totalHotel}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </div>
            <div className="col-xl-3  col-lg-6">
              {/* <Link to={"/admin/allpackages"}> */}
              <div className="card l-bg-orange-dark">
                <div
                  className="card-statistic-3 p-4"
                  onClick={() => {
                    setDataShow(5);
                  }}
                >
                  <div className="card-icon card-icon-small-large">
                    <i className="fa-solid fa-suitcase-rolling package " />
                  </div>
                  <div className="cardh5 mb-4">
                    <h5 className="card-title mb-0">Packages</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0 color-light text-white">
                        {dashboardData.totalPackage}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <hr />
      </div>
      {/* -----Booking */}
      {dataShow == 1 ? (
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
                        <th>Contact</th>
                        <th>Package</th>
                        <th>Guests</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
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
                                  <div className="h6 mb-0 lh-1">
                                    {el.bookingName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{el.emergencyContact}</td>
                            <td>
                              {el.packageId?.name}
                              <br></br>
                              {el.packageId?.duration}
                            </td>

                            <td>
                              {" "}
                              <span className="d-inline-block align-middle">
                                {el.guestCount}
                              </span>
                            </td>

                            <td
                              className={
                                el.status === "pending"
                                  ? "badge bg-warning"
                                  : el.status === "complete"
                                  ? "badge bg-success"
                                  : ""
                              }
                              style={{
                                textTransform: "capitalize",
                                margin: "18px 0px",
                                borderRadius: "10px",
                              }}
                            >
                              {el.status === "pending" ? "pending" : "Complete"}
                            </td>
                            <td className="text-end">
                              <div className="drodown">
                                <Link
                                  data-bs-toggle="dropdown"
                                  to={"#"}
                                  className="btn p-1"
                                  aria-expanded="false"
                                >
                                  <i
                                    className="fa fa-bars"
                                    aria-hidden="true"
                                  />
                                </Link>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  style={{}}
                                >
                                  <Link
                                    to={"#!"}
                                    className="dropdown-item"
                                    onClick={() => {
                                      changeStatus(el._id, el.status);
                                    }}
                                  >
                                    Booking Accept
                                  </Link>
                                  <Link to={"#!"} className="dropdown-item">
                                    Booking Cancel
                                  </Link>
                                </div>
                              </div>
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
      ) : dataShow == 2 ? (
        <AllCustomer />
      ) : dataShow == 3 ? (
        <AllDestination limit="6" />
      ) : dataShow == 4 ? (
        <AllHotel limit="6" />
      ) : dataShow == 5 ? (
        <AllPackages />
      ) : (
        ""
      )}
      {/* -----/Booking */}
    </Fragment>
  );
}
