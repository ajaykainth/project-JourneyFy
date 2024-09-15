import { toast } from "react-toastify";
import React, { Fragment, useEffect, useState, } from 'react';
import ApiServices from '../Services/ApiServices';

export default function AddHotel() {
    const [name, setName] = useState("")
    const [alldestinations, setAllDestinations] = useState([])
    const [destinationId, setDestinationId] = useState("")
    const [allhotels, setAllHotels] = useState([])
    const [hotelId, setHotelId] = useState("")
    const [allrooms, setAllRooms] = useState([])
    const [roomId, setRoomId] = useState("")
    const [duration, setDuration] = useState("( 4 Days / 3 Nights )");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        window.scroll(0,0)
        ApiServices.alldestination()
            .then((res) => {
                if (res.data.success) {
                    setAllDestinations(res.data.data)
                    // console.log(res.data.data);
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        if (destinationId) {
            setHotelId("")
            ApiServices.allhotel({ destinationId:destinationId})
                .then((res) => {
                    if (res.data.success) {
                        setAllHotels(res.data.data);
                         console.log(res.data.data);
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            setAllHotels([]);
            setHotelId("");
            setAllRooms([]);
            setRoomId("");
        }
    }, [destinationId]);


    useEffect(() => {
        if (hotelId) {
            
            setRoomId("")
            ApiServices.allrooms({hotelId: hotelId })
                .then((res) => {
                    if (res.data.success) {
                        setAllRooms(res.data.data);
                        // console.log(res);
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setAllRooms([]);
            setRoomId("");
        }
    }, [hotelId]);


    const handleForm = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            destinationId: destinationId,
            hotelId: hotelId,
            roomId: roomId,
            duration: duration,
            price: price,
            description: description
        }
        ApiServices.addpackage(data)
            .then((resp) => {
                if (resp.data.success == true) {

                    toast.success(resp.data.message)
                    setDuration("( 4 Days / 3 Nights )")
                    setName("")
                    setDestinationId("")
                    setHotelId("")
                    setPrice("")
                    setRoomId("")
                    setDescription("")

                } else {
                    toast.error(resp.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something went Wrong! Try again later")
                console.log(err);
            })
    }

    return (
        <Fragment>
            <section className='form-section-package'>
                <form className='destination-form' action="" onSubmit={handleForm}>
                    <h2>Add Package</h2>

                    <div className="row inputs">
                        <div className="col-md-12">
                            <label className='destination-label' htmlFor="">Name <span className="text-danger">*</span></label><br />
                            <input className='input-data w-100' type="text" value={name} onChange={(e) => { setName(e.target.value) }} /></div>

                        <br />

                        <div className="col-md-6 mb-3">
                            <select value={destinationId} className="form-select add-room-select w-100" aria-label="Default select example" onChange={(e) => { setDestinationId(e.target.value) }}>
                                <option selected disabled value={""}>Choose Destination</option>
                                {alldestinations?.map((el, index) => (
                                    <Fragment key={index}>
                                        <option value={el?._id}>{el.name} - {el.address}</option>
                                    </Fragment>
                                ))}
                            </select>
                        </div>
                        <br />
                        <div className="col-md-6 mb-3">
                            <select value={hotelId} className="form-select add-room-select w-100" aria-label="Default select example" onChange={(e) => { setHotelId(e.target.value) }}>
                                <option selected disabled value={""}>Choose Hotel</option>
                                {allhotels?.map((el, index) => (
                                    <Fragment key={index}>

                                        <option value={el?._id}>{el.name} </option>
                                    </Fragment>
                                ))}
                            </select>
                        </div>
                        <br />
                        <div className="col-md-12 mb-3">
                            <select value={roomId} className="form-select add-room-select w-100" aria-label="Default select example" onChange={(e) => { setRoomId(e.target.value) }}>
                                <option selected disabled value={""}>Choose Room</option>
                                {allrooms?.map((el, index) => (
                                    <Fragment key={index}>
                                        <option value={el?._id}>{el.name}</option>
                                    </Fragment>
                                ))}
                            </select>
                        </div>
                        <br />
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Duration <span className="text-danger">*</span></label><br />
                            <input className='input-data w-100' type="text" value={duration} onChange={(e) => { setDuration(e.target.value) }} />
                        </div>
                        <br />
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Price <span className="text-danger">*</span></label><br />
                            <input className='input-data w-100' type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        </div>
                        <br />
                        <div className="col-md-12">
                            <label className='destination-label' htmlFor="">Description <span className="text-danger">*</span></label><br />
                            <textarea className='input-data w-100' type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        <br />
                    </div>
                    <br />
                    <div className="col-md-12">
                        <button>Add Package</button>
                    </div>
                </form>
            </section>
        </Fragment >
    )
}