import { Fragment, useEffect, useState } from "react"
import ApiServices from "../Services/ApiServices"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AllCustomer() {
    const [data, setData] = useState([])
    const [isChange, setIsChange] = useState(false)
    useEffect(() => {
        ApiServices.allcustomer()
            .then((res) => {
                console.log(res);
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [isChange])

    const changeStatus = (id, status) => {
        console.log(id, status);
        let data = {
            _id: id,
            status: !status
        }
        // console.log(data);

        ApiServices.changeStatus(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    setIsChange(true)
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
        setIsChange(false)
    }

    return (
        <Fragment>
            <>
                <link
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    rel="stylesheet"
                />
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3 mb-lg-5">
                            <div className="overflow-hidden card table-nowrap table-card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">New customers</h5>

                                </div>
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead className="small text-uppercase bg-body text-muted">
                                            <tr>
                                                <th>Sno.</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Gender</th>
                                                <th>Status</th>
                                                <th className="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.map((el, index) => (
                                                <Fragment key={index}>
                                                    <tr className="align-middle">
                                                        <td>{index + 1}</td>

                                                        <td>
                                                            <div className="d-flex align-items-center">

                                                                <div>
                                                                    <div className="h6 mb-0 lh-1">{el.name}</div>


                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{el.email}</td>
                                                        <td>
                                                            {" "}
                                                            <span className="d-inline-block align-middle">{el.contact}</span>
                                                        </td>
                                                        <td>
                                                            <span>{el.gender}</span>
                                                        </td>
                                                        <td style={{ textTransform: "capitalize" }}>
                                                            <span className={el.userId.status === true ? "text-success" : "text-danger"} style={{ fontWeight: "700" }}>  {el.userId.status === true ? "Active" : "In-active"}</span>
                                                        </td>
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
                                                                    <Link to={"#!"} className="dropdown-item" onClick={() => { changeStatus(el.userId._id, el.userId.status) }}>

                                                                        Change Status
                                                                    </Link>
                                                                    <Link to={"#!"} className="dropdown-item">
                                                                        Delete user
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </Fragment>
                                            ))}



                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </Fragment>
    )
}