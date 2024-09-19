import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import ApiServices from "../Services/ApiServices"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function AllDestination() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        axios.post("https://project-journeyfy.onrender.com/admin/destination/all")
            .then((response) => {
                // console.log(response);
                setData(response.data.data)

                setTimeout(() => {
                    setLoad(true)
                }, 1000)
            })
            .catch((err) => {
                console.log(err);
            })
        setLoad(false)
    }, [load])

    const changeStatus = (id, status) => {
        console.log(id, status);
        let data = {    
            _id: id,
            status: !status
        }


        ApiServices.deletedestination(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    alert("Do You Really Want To Delete")
                    setLoad(true)
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
        setLoad(false)
    }
    return (
        <Fragment>
            <div className="container-fluid bg-light d-flex flex-column justify-center align-items-center" >
                <h1 className="rext-center mb-4 mt-3">All Destinations</h1>
                {data.map((el, index) => (
                    <Fragment key={index}>
                        <div className="card" style={{ width: 900 }}>
                            <div className="row no-gutters">
                                <div className="col-sm-5">
                                    <img
                                        className="card-img "
                                        src={"https://project-journeyfy.onrender.com/" + el.image}
                                        alt="Error"
                                        style={{ height: "15rem", width: "100%" }}
                                    />
                                </div>
                                <div className="col-sm-7 ps-5">
                                    <div className="card-body">
                                        <h5 className="card-title">{el.name}</h5>
                                        <p className="card-text mb-5">
                                            {el.address}
                                        </p>
                                        <Link to={"/admin/updatedestination/" + el._id} className="btn btn-outline-success me-3"><i className="fa-regular fa-pen-to-square ps-3 pe-3"></i></Link>
                                        <Link to={"#!"} className="btn btn-outline-danger " onClick={() => { changeStatus(el._id, el.status) }}><i className="fa-regular fa-trash-can ps-3 pe-3"></i></Link>
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



