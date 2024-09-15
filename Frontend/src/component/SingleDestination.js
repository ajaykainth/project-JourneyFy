import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ApiServices, { BASE_URL } from "../Services/ApiServices"

export default function SingleDestination() {
    let params = useParams()
    const id = params.id
    console.log(params);
    const [destination, setDestination] = useState({})

    useEffect(() => {
        let data = {
            _id: id
        }
        ApiServices.SingleDestination(data)
            .then((response) => {
                console.log(response);
                setDestination(response.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <Fragment>
            <div className="container-fluid bg-light d-flex flex-column justify-center align-items-center" >
                <h1 className="rext-center mb-4 mt-3">All Destinations</h1>

                <div className="card" style={{ width: 900 }}>
                    <div className="row no-gutters">
                        <div className="col-sm-5">
                            <img
                                className="card-img "
                                src={BASE_URL + destination.image} style={{ height: "200px", width: "200px" }}
                                alt="Error"
                            />
                        </div>
                        <div className="col-sm-7 ps-5">
                            <div className="card-body">
                                <h5 className="card-title">{destination.name}</h5>
                                <h6 className="card-title">{destination.address}</h6>
                                <p className="card-text mb-5">

                                </p>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}