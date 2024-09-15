import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom";

import ApiServices, { BASE_URL } from "../Services/ApiServices"
export default function Home() {
    
    const [packageData, setPackageData] = useState([])
    useEffect(() => {
        ApiServices.allpackages()
            .then((response) => {
                console.log(response);
                setPackageData(response.data.data)



            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const [destinationData, setDestinationData] = useState([])
    useEffect(() => {
        ApiServices.alldestination()
            .then((response) => {
                console.log(response);
                setDestinationData(response.data.data)


            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

   
    return (
        <Fragment>

            <div className="container-fluid bg-primary py-5  hero-header">
                <div className="container py-5">
                    <div className="row justify-content-center py-5">
                        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                            <h1 className="display-3 text-white mb-3 animated slideInDown">
                                Enjoy Your Vacation With Us
                            </h1>
                            <p className="fs-4 text-white mb-4 animated slideInDown">
                                A journey of a thousand miles begins with a single step!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* //////////////////////////////////////////////// */}

            {/* //////////////////////////////////////////////// */}
            {/*-----------About Start-------- */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div
                            className="col-lg-6 wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{ minHeight: 400 }}
                        >
                            <div className="position-relative h-100">
                                <img
                                    className="img-fluid position-absolute w-100 h-100"
                                    src="/assets/img/about-home.jpg"
                                    alt=""
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                            <h6 className="section-title bg-white text-start text-primary pe-3">
                                About Us
                            </h6>
                            <h1 className="mb-4">
                                Welcome to <span className="text-primary">JourneyFy</span>
                            </h1>
                            <p className="mb-4">
                                Welcome to Journeyfy, where wanderlust meets convenience. We are dedicated to igniting your passion for exploration by providing curated travel experiences tailored to your preferences.
                            </p>
                            <p className="mb-4">
                                Whether you seek bustling city escapes, serene nature retreats, or culturally enriching adventures, Journeyfy is your gateway to the world's most captivating destinations. Our team of travel enthusiasts meticulously crafts each itinerary, ensuring every moment of your journey is infused with excitement and wonder.
                            </p>
                            <div className="row gy-2 gx-4 mb-4">
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        First Class Services
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Handpicked Hotels
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />5 Star
                                        Accommodations
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Latest Model Vehicles
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Premium City Tours
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        24/7 Service
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* -----------About End---------- */}

            {/* ------Destination Start------ */}


            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">
                        Destination
                    </h6>
                    <h1 className="mb-5">Popular Destination</h1>
                </div>

                <div className="container">
                    <div className="row w-100">

                        {
                            destinationData.slice(0, 6).map((el, index) => (

                                <Fragment key={index}>
                                    <div className="card col-md-6 col-xl-4 col-sm-12 " >
                                        <div className="cta">
                                            <img src={BASE_URL + el.image} alt="..." />

                                            <div className="text">
                                                <h2 className="mb-4">{el.name}</h2>
                                                <br />

                                                <Link to={"/destination"} className="btn btn-primary mt-2 " style={{borderRadius:"10px"}}>
                                                    Explore More
                                                </Link>
                                            </div>
                                        </div>


                                    </div>

                                </Fragment>
                            ))
                        }

                    </div>
                </div>
            </div>

            {/* ------Destination End------ */}

            {/* ------Packages Start------ */}

            <div className="container py-5">

                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">
                        Packages
                    </h6>
                    <h1 className="mb-5">Awesome Packages</h1>
                </div>
                <div className="row g-4 ">
                    {packageData.slice(0, 3).map((el, index) => (
                        <Fragment key={index}>
                            <div className="col-md-6 col-xl-4 col-sm-12 wow fadeInUp packages" data-wow-delay="0.1s">



                                <div className="package-item">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" style={{ height: "43vh", width: "100vw" }} src={BASE_URL + el?.destinationId?.image} />
                                    </div>
                                    <div className="d-flex border-bottom">
                                        <small className="flex-fill text-center border-end py-2">
                                            <i className="fa fa-map-marker-alt text-primary me-2" />
                                            {el.destinationId.name}
                                        </small>
                                        <small className="flex-fill text-center border-end py-2">
                                            <i className="fa fa-calendar-alt text-primary me-2" />{el.duration}
                                        </small>
                                        <small className="flex-fill text-center py-2">
                                            <i className="fa fa-user text-primary me-2" />Per Person
                                        </small>
                                    </div>
                                    <div className="text-center p-4" style={{ height: "45vh" }}>
                                        <h3 className="mb-3" style={{ height: "10vh" }}>{el.name}</h3>
                                        <h2 className="mb-0">&#8377; {el.price}</h2>
                                        <Link to={"/addReview/" + el.packageId?._id} className="mb-3">
                                            <small className="fa fa-star text-primary" />
                                            <small className="fa fa-star text-primary" />
                                            <small className="fa fa-star text-primary" />
                                            <small className="fa fa-star text-primary" />
                                            <small className="fa fa-star text-primary" />
                                        </Link>
                                        <p className="mb-3">
                                            {el.destinationId.address}
                                        </p>
                                        <div className="d-flex justify-content-center mb-2">


                                            <Link to={"/booking/" + el._id} className="btn btn-primary px-3"
                                                style={{ borderRadius: "10px", width: "50%" }}>Book Now</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </Fragment>
                    ))}
                </div>
            </div>


            {/* ------Packages End------ */}

            {/* ------Process Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">
                            Process
                        </h6>
                        <h1 className="mb-5">3 Easy Steps</h1>
                    </div>
                    <div className="row gy-5 gx-4 justify-content-center">
                        <div
                            className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                            data-wow-delay="0.1s"
                        >
                            <div className="position-relative border border-primary pt-5 pb-4 px-4" style={{ height: '40vh' }}>
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <i className="fa fa-globe fa-3x text-white" />
                                </div>
                                <h5 className="mt-4">Discover Your Dream Destination</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0" >
                                    Browse through our extensive list of travel destinations to find the perfect getaway for you.
                                </p>
                            </div>
                        </div>
                        <div
                            className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                            data-wow-delay="0.3s"
                        >
                            <div className="position-relative border border-primary pt-5 pb-4 px-4" style={{ height: '40vh' }}>
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <i className="fa-solid fa-suitcase-rolling fa-3x text-white"></i>
                                </div>
                                <h5 className="mt-4">Pick the Perfect Package</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">
                                    Choose from a variety of travel packages tailored to meet your needs and preferences.
                                </p>
                            </div>
                        </div>
                        <div
                            className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                            data-wow-delay="0.5s"
                        >
                            <div className="position-relative border border-primary pt-5 pb-4 px-4" style={{ height: '40vh' }}>
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <i className="fa-solid fa-handshake fa-3x text-white"></i>
                                </div>
                                <h5 className="mt-4">Secure Your Spot</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">
                                    Easily book your selected package with our streamlined, hassle-free booking process.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------/Process finish */}
            {/* -----testimonial */}
            {/* <!-- Back to Top --> */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="fa-solid fa-arrow-turn-up"></i></a>

            
          


        </Fragment>
    )
}