import { Fragment } from "react";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
export default function Header() {
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("20");
  const [fuelPriceINR, setFuelPriceINR] = useState("98");
  const [totalCost, setTotalCost] = useState(0);
  const [fuelType, setFuelType] = useState("Petrol");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleFuelTypeChange = (type) => {
    setFuelType(type);
    if (type === "Petrol") {
      setFuelPriceINR(96);
    } else {
      setFuelPriceINR(86);
    }
  };

  const handleCalculate = () => {
    const distanceNum = parseFloat(distance);
    const efficiencyNum = parseFloat(efficiency);
    const fuelPriceINRNum = parseFloat(fuelPriceINR);

    if (
      !isNaN(distanceNum) &&
      !isNaN(efficiencyNum) &&
      !isNaN(fuelPriceINRNum)
    ) {
      const fuelRequired = distanceNum / efficiencyNum;
      const cost = fuelRequired * fuelPriceINRNum;
      setTotalCost(cost.toFixed(2));
      setDistance("");
      // setTotalCost("")
    } else {
      alert("Please enter valid numbers");
    }
  };
  const handleLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      window.location.reload();
      sessionStorage.clear();
      toast.success("Logout successfully");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };
  return (
    <Fragment>
      <div className="container-fluid bg-dark px-5 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: 45 }}
            >
              <small className="me-3 text-light">
                <i className="fa fa-map-marker-alt me-2" />
                Phagwara, Punjab, India
              </small>
              <small className="me-3 text-light">
                <i className="fa fa-phone-alt me-2" />
                <strong>+91</strong> 77106-37003
              </small>
              <small className="text-light">
                <i className="fa fa-envelope-open me-2" />
                ajaykainth2000@gmail.com
              </small>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: 45 }}
            >
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-twitter fw-normal" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-facebook-f fw-normal" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-linkedin-in fw-normal" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-instagram fw-normal" />
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle"
                href=""
              >
                <i className="fab fa-youtube fw-normal" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar & Hero Start */}
      <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0  ">
          <Link href="" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <i className="fa fa-map-marker-alt me-3" />
              JourneyFy
            </h1>
            {/* <img src="img/logo.png" alt="Logo"> */}
          </Link>

          {/* ---------Fuel Consumption Calculator----------------------- */}
          <>
            {/* Button trigger modal */}
            <button
              type="button"
              className="btn btn-primary rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Check Fuel Consumption
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Fuel Consumption Calculator</h3>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div>
                      <div className="mb-3">
                        <button
                          type="button"
                          className={`btn ${
                            fuelType === "Petrol"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          } me-2`}
                          onClick={() => handleFuelTypeChange("Petrol")}
                          style={{ borderRadius: "10px" }}
                        >
                          Petrol
                        </button>
                        <button
                          type="button"
                          className={`btn ${
                            fuelType === "Diesel"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => handleFuelTypeChange("Diesel")}
                          style={{ borderRadius: "10px" }}
                        >
                          Diesel
                        </button>
                      </div>
                      <div className="form-group">
                        <label htmlFor="distanceInput">Distance (in km):</label>
                        <input
                          type="number"
                          className="form-control"
                          id="distanceInput"
                          min={0}
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="efficiencyInput">
                          Fuel Efficiency (km/L):
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="efficiencyInput"
                          min={0}
                          value={efficiency}
                          onChange={(e) => setEfficiency(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fuelPriceInput">
                          Fuel Price (per liter in INR):
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="fuelPriceInput"
                          min={50}
                          value={fuelPriceINR}
                          onChange={(e) => setFuelPriceINR(e.target.value)}
                        />
                      </div>
                      {totalCost > 0 && (
                        <div className="mt-3">
                          <h3>Total Cost (in INR):</h3>
                          <p className="text-dark fs-5">{`₹ ${totalCost}`}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary ms-3"
                      onClick={handleCalculate}
                    >
                      Calculate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
          {/* ---------/Fuel Consumption Calculator----------------------- */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <Link
                to={"/"}
                className={`nav-item nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to={"/destination"}
                className={`nav-item nav-link ${
                  location.pathname === "/destination" ? "active" : ""
                }`}
              >
                Destination
              </Link>
              <Link
                to={"/ShowUserBooking"}
                className={`nav-item nav-link ${
                  location.pathname === "/ShowUserBooking" ? "active" : ""
                }`}
              >
                Booking
              </Link>
              <Link
                to={"/viewReviews"}
                className={`nav-item nav-link ${
                  location.pathname === "/viewReviews" ? "active" : ""
                }`}
              >
                Reviews
              </Link>
            </div>
            {isLoggedIn ? (
              <div className="nav-item dropdown" style={{ width: "15%" }}>
                <Link
                  href="#"
                  className={"nav-link dropdown-toggle "}
                  data-bs-toggle="dropdown"
                >
                  <i
                    className="bi bi-person-circle profile-i "
                    style={{ fontSize: "40px" }}
                  ></i>
                  {/* <i className="bi bi-chevron-down dropdown-indicator" /> */}
                </Link>

                <div className="dropdown-menu m-0 nnnn">
                  <Link to={"/userprofile"} className="dropdown-item">
                    <span className="text-dark">Profile</span>
                  </Link>

                  <Link to={"/changePassword"} className="dropdown-item">
                    <span className="text-dark">Change Password</span>
                  </Link>

                  <Link className="dropdown-item">
                    <span
                      className="nav-item nav-link text-dark px-0"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="btn btn-primary rounded-pill py-2 px-4"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </Fragment>
  );
}
