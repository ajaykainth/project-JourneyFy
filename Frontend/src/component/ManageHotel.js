import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ApiServices from "../Services/ApiServices";
export default function AllHotel() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        ApiServices.allhotel()
            .then((response) => {
                console.log(response);
                setData(response.data.data)

                setTimeout(() => {
                    setLoad(true)
                }, 1000)
            })
            .catch((err) => {
                console.log(err);
            })
        setLoad(false)
    }, [])

    return (
        <Fragment>
            <div className="container-fluid bg-light d-flex flex-column justify-center align-items-center" >
                <h1 className="rext-center mb-4 mt-3">All Hotels</h1>
                {data.map((el, index) => (
                    <Fragment key={index}>
                        <div className="card" style={{ width: 900 }}>
                            <div className="row no-gutters">
                                <div className="col-sm-5">
                                    <img
                                        className="card-img "
                                        src={"https://journeyfy.onrender.com/" + el?.image}
                                        alt="Error"
                                        style={{ height: "15rem", width: "100%" }}
                                    />
                                </div>
                                <div className="col-sm-7 ps-5">
                                    <div className="card-body">
                                        <h5 className="card-title">{el?.name}</h5>
                                        <p className="card-text mb-5">
                                            {el.address}
                                        </p>
                                        <Link to={"/admin/updatehotel/" + el._id} className="btn btn-outline-success me-3"><i className="fa-regular fa-pen-to-square ps-3 pe-3"></i></Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </Fragment>
    )
}



