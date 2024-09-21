
import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ApiServices from "../Services/ApiServices";

export default function AllRooms() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)


    useEffect(() => {
        let data = {
            hotelId: sessionStorage.getItem("hotelId")
        }
        ApiServices.allRoom(data)
            .then((response) => {
                console.log(response);
                setData(response.data.data)


            })
            .catch((err) => {
                console.log(err);
            })
    }, [load])

    const changeStatus = (id, status) => {
        console.log(id, status);
        let data = {
            _id: id,
            status: !status
        }


        ApiServices.deleteroom(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    setLoad(true)
                    window.confirm("Do you want to Delete ?")

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
            <div className="container-xxxl bg-light ps-5 pe-5" >
                <h1 className="text-center pt-5 pb-5" >All Rooms</h1>

                <div className="row">
                    {data?.map((el, index) => (
                        <Fragment key={index}>
                    
                        <div className="col-md-4 col-sm-12 mb-4">
                            <div className="card _card">
                                <img className="card-img-top card_img" src={"https://journeyfy.onrender.com/" + el.image} alt="Error" style={{ height: "20rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{el.name}</h5>

                                </div>
                                <div className="card-footer text-muted">
                                    <Link to={"/hotel/updateroom/" + el._id} className="btn btn-outline-success me-3"><i className="fa-regular fa-pen-to-square"></i></Link>
                                    <Link to={""} className="btn btn-outline-danger" onClick={() => { changeStatus(el._id, el.status) }}><i className="fa-regular fa-trash-can"></i></Link>
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