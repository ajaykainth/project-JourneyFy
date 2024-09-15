import { Fragment, useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import ApiServices, { BASE_URL } from "../Services/ApiServices"
export default function ManagePackage() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)


    useEffect(() => {
        ApiServices.allpackages()
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
        console.log(id,status);
        let data = {
            _id: id,
            status: !status
        }
      

        ApiServices.deletepackage(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    window.confirm("Do You Really Want To Delete")
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
            <div className="container-fluid bg-light d-flex flex-column justify-center align-items-center ps-4 pe-4" >
                <h1 className="rext-center mb-4 mt-3">Packages</h1>
                <div className="row">
                    {data.map((el, index) => (
                        <Fragment key={index}>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">

                                <div className="package-item mb-5">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" style={{ height: "43vh",width:"100%" }} src={BASE_URL + el?.destinationId?.image} />
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
                                    <div className="text-center p-4" style={{ height: "35vh" }}>
                                        <h3 className="mb-3" style={{ height: "10vh" }}>{el.name}</h3>

                                        <p className="mb-3">
                                            {el.destinationId.address}
                                        </p>
                                        <div className="d-flex justify-content-around  mb-2">


                                            <Link to={"/admin/updatepackage/" + el._id} className="btn btn-outline-success px-3"
                                                style={{ borderRadius: "10px", width: "20%" }}><i className="fa-regular fa-pen-to-square ps-3 pe-3"></i></Link>
                                            <Link to={"#!"} className="btn btn-outline-danger px-3"
                                                style={{ borderRadius: "10px", width: "20%" }} onClick={() => { changeStatus(el._id, el.status) }} ><i className="fa-regular fa-trash-can ps-3 pe-3"></i></Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}



