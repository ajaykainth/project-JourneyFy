
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../Services/ApiServices";
import FadeLoader from "react-spinners/FadeLoader";

export default function AllDestination(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ApiServices.allDestination()
            .then((response) => {
                console.log(response);
                setData(response.data.data);

                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    
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
                    <section className="destination-before">
                        <h1 className="destination-head">All Destinations</h1>
                    </section>
                    <div className="container pt-5">
                        <div className="row">
                            {!!props.limit
                                ? data.slice(0, props.limit).map((el, index) => (
                                    <Fragment key={index}>
                                        <div className="col-md-4 col-sm-12 mb-4" key={el._id}>
                                            <div className="card _card">
                                                <img
                                                    className={"card-img-top card_img" + index}
                                                    src={"https://project-journeyfy.onrender.com/" + el.image}
                                                    alt="Error"
                                                    style={{ height: "20rem" }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{el.name}</h5>
                                                    <h6 className="card-title">{el.address}</h6>
                                                    <Link
                                                        to={"/admin/singledestination/" + el._id}
                                                        className="btn btn-primary"
                                                    >
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                ))
                                : data.map((el, index) => (
                                    <Fragment key={index}>
                                        <div className="col-md-4 col-sm-12 mb-4" key={el._id}>
                                            <div className="card _card">
                                                <img
                                                    className="card-img-top card_img"
                                                    src={"https://project-journeyfy.onrender.com/" + el.image}
                                                    alt="Error"
                                                    style={{ height: "20rem" }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{el.name}</h5>
                                                    <h6 className="card-title">{el.address}</h6>
                                                    <Link
                                                        to={"/admin/singledestination/" + el._id}
                                                        className="btn btn-primary"
                                                    >
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </Fragment>
    );
}