<div className="container-fluid containerr">
<section className="get-in-touch">
  <h1 className="title">Get in touch</h1>
  <form className="contact-form row">
    <div className="form-field col-lg-6">
      <input
        id="name"
        className="input-text js-input"
        type="text"
        required=""
      />
      <label className="label" htmlFor="name">
        Name
      </label>
    </div>
    <div className="form-field col-lg-6 ">
      <input
        id="email"
        className="input-text js-input"
        type="email"
        required=""
      />
      <label className="label" htmlFor="email">
        E-mail
      </label>
    </div>
    <div className="form-field col-lg-6 ">
      <input
        id="company"
        className="input-text js-input"
        type="text"
        required=""
      />
      <label className="label" htmlFor="company">
        Company Name
      </label>
    </div>
    <div className="form-field col-lg-6 ">
      <input
        id="phone"
        className="input-text js-input"
        type="text"
        required=""
      />
      <label className="label" htmlFor="phone">
        Contact Number
      </label>
    </div>
    <div className="form-field col-lg-12">
      <input
        id="message"
        className="input-text js-input"
        type="text"
        required=""
      />
      <label className="label" htmlFor="message">
        Message
      </label>
    </div>
    <div className="form-field col-lg-12">
      <input className="submit-btn" type="submit" defaultValue="Submit" />
    </div>
  </form>
</section>

</div>

// ///////////////////////////////////
////////////////////////////////////
{dataShow == 1 ?
  <div className="card booking-card ">
    <ul className="list-unstyled">
      <li className="booking-data">
        <div className="booking-left">
          <img src="assets/img/think.png" alt="" />
        </div>
        <div className="booking-center  ">
          <div className="booking-head">
            <h3>Hotel Name</h3><button type="button" className="btn btn-primary">Pending</button>
          </div>
          <div className="booking-body">
            <div className="guest-count d-flex"><h6>Guest Name :</h6> <p>Name</p></div>
            <div className="booking-date d-flex"><h6>Booking Date :</h6><p>06.03.2020 - 07.03.2020</p></div>
            <div className="emergency-contact d-flex"><h6>Emergency Contact :</h6><p>98765XXXXX</p></div>

          </div>
        </div>
        <div className="booking-right d-flex  align-items-center">
          <Link className="linkk"> <button className="btn btn-light text-grey me-5 button1"><i className="bi bi-pencil-square  me-1 tag1"></i>Manage</button></Link>
          <Link className="linkk"> <button className="btn btn-light button2"><i className="bi bi-trash me-1 tag2"></i>Delete</button></Link>
        </div>
      </li>
    </ul>
  </div>
  : dataShow == 2 ? <AllCustomer /> :
    dataShow == 3 ? <AllDestination limit="6" /> :
      dataShow == 4 ? <AllHotel limit="6" /> :
        dataShow == 5 ? <AllPackages /> : ""
}

import { useState } from "react";

export default function Weather() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState("");

  const Api_key = "8ed62507b4b9f55c0b4be3190f111821";

  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${Api_key}&units=metric`)
      .then(res => res.json())
      .then(json => {
        // Group the data by day
        const dailyData = [];
        const currentDay = new Date().getDate();
        json.list.forEach(item => {
          const itemDate = new Date(item.dt_txt).getDate();
          if (itemDate !== currentDay) {
            dailyData.push(item);
          }
        });

        // Get one weather data per day, for five days
        const fiveDayData = [];
        for (let i = 0; i < 5; i++) {
          fiveDayData.push(dailyData[i * 8]);
        }

        setWeatherData(fiveDayData);
      });
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getWeatherIcon = (description) => {
    switch (description) {
      case 'clear sky':
        return '☀️';
      case 'few clouds':
        return '🌤️';
      case 'scattered clouds':
      case 'broken clouds':
        return '☁️';
      case 'shower rain':
      case 'rain':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      case 'mist':
        return '🌫️';
      default:
        return '☁️';
    }
  };

  return (
    <>
      <input type="text" onChange={(e) => setLocation(e.target.value)} />
      <button onClick={getWeather}>Search Weather</button>

      <h1>{weatherData[0]?.name}</h1>
      <div className="weather-cards">
        {weatherData.map((day, index) => (
          <div key={index} className="weather-card">
            <h3>{formatDate(day.dt_txt)}</h3>
            <p>{day.main.temp}°C</p>
            <p>{day.weather[0].description}</p>
            <span>{getWeatherIcon(day.weather[0].description)}</span>
          </div>
        ))}
      </div>
    </>
  );
}


// weather card
<>



<h1>{weatherData?.city?.name}</h1>
<div className="page-content page-container" id="page-content">

    <div className="row container d-flex justify-content-end">
        <div className="col-lg-10 grid-margin stretch-card">
            {/*weather card*/}
            <div className="card card-weather">
                <div className="card-body">
                    <div className="weather-date-location">
                        <h3 className="text-white">Friday</h3>
                        <p className="text-gray">
                            <span className="weather-date text-white">25 March, 2019</span>
                            <span className="weather-location text-white">Sydney, Australia</span>
                        </p>
                    </div>
                    <div className="weather-data d-flex">
                        <div className="mr-auto">
                            <h4 className="display-3 text-white">  {/* today weather */}

                                32
                                <span className="symbol text-white">°</span>C
                            </h4>
                            <p className="text-white">Cloudy</p>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="d-flex weakly-weather">
                        <div className="weakly-weather-item ">{/* day 2 weather */}
                            <p className="mb-0 ">Sun</p>
                            <i className="mdi mdi-weather-cloudy" />
                            <p className="mb-0">30°</p>
                        </div>
                        <div className="weakly-weather-item">{/* day 3 weather */}
                            <p className="mb-1">Mon</p>
                            <i className="mdi mdi-weather-hail" />
                            <p className="mb-0">31°</p>
                        </div>
                        <div className="weakly-weather-item">{/* day 4 weather */}
                            <p className="mb-1">Tue</p>
                            <i className="mdi mdi-weather-partlycloudy" />
                            <p className="mb-0">28°</p>
                        </div>
                        <div className="weakly-weather-item">{/* day 5 weather */}
                            <p className="mb-1">Wed</p>
                            <i className="mdi mdi-weather-pouring" />
                            <p className="mb-0">30°</p>
                        </div>

                    </div>
                </div>
            </div>
            {/*weather card ends*/}
        </div>
    </div>
</div>

<nav className="hotel-nav bg-dark ">
        <div className="nav-head">
          <h1 className="text-primary m-0">
            <i className="fa fa-map-marker-alt me-3" />
            JourneyFy
          </h1>
        </div>
        <ul className="nav-ul">
          <li className="nav-page"><Link to={"/hotel"} className="nav-link text-light nav-page mt-3">Home</Link></li>


          <div className="nav-item dropdown mt-3">
            <Link
              to="#"
              className="nav-link  dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Rooms
            </Link>
            <div className="dropdown-menu m-0">

              <Link to={"/hotel/addroom"} className="dropdown-item ">
                Add Room
              </Link>

              <Link to={"/hotel/manageroom"} className="dropdown-item">
                Manage Room
              </Link>
            </div>
          </div>
          {/* <a onClick={logout} className="btn btn-primary rounded-pill py-2 px-4">
            Logout
          </a> */}
          <div className="nav-item dropdown">


            <a href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-person-circle" style={{ fontSize: '35px' }}></i>
              {/* <i className="bi bi-chevron-down dropdown-indicator" /> */}
            </a>

            <div className="dropdown-menu m-0">
              <Link to={"/hotel/changePassword"} className="dropdown-item">
                <a href="#">My Profile</a>
              </Link>




              <Link to={"/login"} className="dropdown-item">
                <a href="" className="nav-item nav-link" onClick={logout}>
                  Logout
                </a></Link>
            </div>

          </div>
        </ul>
      </nav>


      <tr className="align-middle">
                          <td>{index + 1}</td>
                         

                          <td>
                            <div className="d-flex align-items-center">

                              <div>
                                <div className="h6 mb-0 lh-1">{el.bookingName}</div>
                              </div>
                            </div>
                          </td>
                          <td>{el.emergencyContact}</td>
                          <td>{el.packageId?.name}<br></br>{el.packageId?.duration}</td>

                          <td>
                            {" "}
                            <span className="d-inline-block align-middle">{el.guestCount}</span>
                          </td>

                          <td className={el.status==="pending"?"badge bg-warning":el.status==="complete"?"badge bg-success":"" } style={{ textTransform: "capitalize", margin:"18px 0px",borderRadius:"10px" }}>{el.status === "pending" ? "pending" : "Complete"}</td>
                          <td className="text-end">
                            <div className="drodown">
                              <Link
                                data-bs-toggle="dropdown"
                                to={"#"}
                                className="btn p-1"
                                aria-expanded="false"
                              >
                                <i className="fa fa-bars" aria-hidden="true" />
                              </Link>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                style={{}}
                              >
                                <Link to={"#!"} className="dropdown-item" onClick={() => { changeStatus(el._id, el.status) }}>

                                  Booking Accept
                                </Link>
                                <Link to={"#!"} className="dropdown-item">
                                  Booking Cancel
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
</>

// /////////////////////
