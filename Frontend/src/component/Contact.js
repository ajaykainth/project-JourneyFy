import { Fragment } from "react"
export default function Contact() {
    return (
        <Fragment>
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
  <div className="container py-5">
    <div className="row justify-content-center py-5">
      <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
        <h1 className="display-3 text-white animated slideInDown">
          Contact Us
        </h1>
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
              Contact
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">
                            Contact Us
                        </h6>
                        <h1 className="mb-5">Contact For Any Query</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h5>Get In Touch</h5>
                            <p className="mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                diam amet diam et eos
                            </p>
                            <div className="d-flex align-items-center mb-4">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                                    style={{ width: 50, height: 50 }}
                                >
                                    <i className="fa fa-map-marker-alt text-white" />
                                </div>
                                <div className="ms-3">
                                    <h5 className="text-primary">Office</h5>
                                    <p className="mb-0">Location, City, Country</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                                    style={{ width: 50, height: 50 }}
                                >
                                    <i className="fa fa-phone-alt text-white" />
                                </div>
                                <div className="ms-3">
                                    <h5 className="text-primary">Mobile</h5>
                                    <p className="mb-0">+91 7710637000</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                                    style={{ width: 50, height: 50 }}
                                >
                                    <i className="fa fa-envelope-open text-white" />
                                </div>
                                <div className="ms-3">
                                    <h5 className="text-primary">Email</h5>
                                    <p className="mb-0">ajay@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <iframe
                                className="position-relative rounded w-100 h-100"
                                 src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d13647.55569933356!2d75.75560515743877!3d31.223806589614405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d31.229906699999997!2d75.7720324!4m5!1s0x391af51e25b1e181%3A0x62d8b236195b7269!2sRamgarhia%20Institute%20of%20Engineering%20%26%20Technology(%20RIET%20CAMPUS)%2C%20RIET%20Campus%2C%20Satnampura%2C%20Phagwara%2C%20Punjab%20144401!3m2!1d31.220422099999997!2d75.760061!5e0!3m2!1sen!2sin!4v1712811981578!5m2!1sen!2sin"                             frameBorder={0}
                                style={{ minHeight: 300, border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex={0}
                            />
                        </div>
                        <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Your Name"
                                            />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Your Email"
                                            />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="subject"
                                                placeholder="Subject"
                                            />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                placeholder="Leave a message here"
                                                id="message"
                                                style={{ height: 100 }}
                                                defaultValue={""}
                                            />
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
