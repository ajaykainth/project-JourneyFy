import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import ApiServices from "../Services/ApiServices"

export default function AllRooms() {
    const [data, setData] = useState([])
    //    const [getHotelId , setGetHotelId] = useState("")
    //useEffect for all hotel
    //    useEffect(()=>{
    //     let allhotel = {

    //     }
    //    })

    useEffect(() => {
        let data = {
            hotelId: sessionStorage.getItem("hotelId")
        }
        ApiServices.allrooms(data)
            .then((response) => {
                console.log(response);
                setData(response.data.data)


            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <Fragment>
            <section className="room-before">
                <h1 className="destination-head" >All Rooms</h1>
            </section>
            <div className="container pt-5" >

                <div className="row">
                    {data.map((el, index) => (
                        <Fragment key={index}>
                            <div className="col-md-4 col-sm-12 mb-4">
                                <div className="card _card">
                                    <img className="card-img-top card_img" src={"http://localhost:8000/" + el.image} alt="Error" style={{ height: "20rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{el.name}</h5>
                                        <h6 className="card-title">{el.address}</h6>


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