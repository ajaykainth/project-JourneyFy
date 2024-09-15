import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import ApiServices from "../Services/ApiServices";
import FadeLoader from "react-spinners/FadeLoader";

export default function () {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [packageData, setPackageData] = useState([])

  useEffect(() => {
    window.scroll(0, 0)
    ApiServices.alldestination()
      .then((response) => {
        console.log(response);
        setData(response.data.data);
        setFilteredData(response.data.data);

        setTimeout(() => {
          setLoading(false)
        }, 1000)

      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  
  
  useEffect(() => {
   window.scroll(0,0)
    ApiServices.allpackages()
      .then((response) => {
        console.log(response);
        setPackageData(response.data.data)
       
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update search query state
    const filtered = data.filter((destination) =>
      destination.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered); // Update filtered data based on search query
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
                  <h1 className="display-3 text-white animated slideInDown">Destinations</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <Link to={"/"}>Home</Link>
                      </li>

                      <li
                        className="breadcrumb-item text-white active"
                        aria-current="page"
                      >
                        Destinations
                      </li>
                    </ol>
                  </nav>
                  {/* -------Search Input--------- */}

                  <div className="container">
                    <br />
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-10 col-lg-8">
                        <form className="card card-sm">
                          <div className="card-body row no-gutters align-items-center">
                            <div className="col-auto">
                              <i className="fas fa-search h4 text-body" />
                            </div>
                            {/*end of col*/}
                            <div className="col">
                              <input
                                className="form-control form-control-lg form-control-borderless"
                                type="search"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search Your Favourite Destination"
                              />
                            </div>

                          </div>
                        </form>
                      </div>
                      {/*end of col*/}
                    </div>
                  </div>
                  {/* -------/Search Input--------- */}
                </div>
              </div>
            </div>
          </div>
          <div className="container-xxl destination">
            <div className="container my-5">
              <div className="text-center wow fadeInUp " data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3">
                  Destination
                </h6>
                <h1 className="mb-5">Popular Destination</h1>
              </div>
              <div className="row g-3">
                <div className="col-md-12" >
                  <div className="row g-3">
                    {filteredData.map((el, index) => (
                      <Fragment key={index}>
                       
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                          <div className="room-item shadow rounded overflow-hidden">
                            <div className="position-relative">
                              <img className="img-fluid " style={{height:"42vh", width:"100%"}} src={"http://localhost:8000/" + el.image} />
                              <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                              {packageData?.price}/Per Person
                              </small>
                            </div>
                            <div className="p-4 mt-2 "style={{height:"34vh"}}>
                              <div className="d-flex justify-content-between mb-3">
                                <h5 className="mb-0">{el.name}</h5>
                               
                              </div>
                              <div className="d-flex mb-3">
                                <small className="border-end me-3 pe-3">
                                  <i className="fa fa-bed text-primary me-2" />Bed Space
                                </small>
                                <small className="border-end me-3 pe-3">
                                  <i className="fa fa-bath text-primary me-2" />2 Bath
                                </small>
                                <small>
                                  <i className="fa fa-wifi text-primary me-2" />
                                  Wifi
                                </small>
                              </div>
                              <p className="text-body mb-3" style={{height:"3rem"}}>
                                {el.address}
                              </p>
                              <div className="d-flex justify-content-between">
                                <Link to={"/packages/" + el._id} className="btn btn-sm btn-primary rounded py-2 px-4" href="">
                                  View Packages
                                </Link>
                               
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    ))}

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------ */}
          


        </>
      )}
    </Fragment>
  )
}