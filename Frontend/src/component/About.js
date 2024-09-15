import { Fragment } from "react";

export default function () {
    return (
        <Fragment>
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-center py-5">
                        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                            <h1 className="display-3 text-white animated slideInDown">About Us</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="#">Pages</a>
                                    </li>
                                    <li
                                        className="breadcrumb-item text-white active"
                                        aria-current="page"
                                    >
                                        About
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

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
                                        150 Premium City Tours
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


        </Fragment>
    )
}