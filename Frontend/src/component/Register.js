import { Fragment, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import ApiServices from "../Services/ApiServices"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [contact, setContact] = useState("")
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate()

    const handleForm = (e) => {
        e.preventDefault()

        let data = {
            name: name,
            email: email,
            password: password,
            contact: contact,
            gender: gender,
            address: address
        }
        ApiServices.customerRegister(data)
            .then((response) => {
                if (response.data.success == true) {
                    toast.success(response.data.message)
                    let data1 = {
                        email: email,
                        password: password
                    }
                    // console.log(data1);
                    ApiServices.login(data1).then((res) => {
                        if (res.data.success == true) {
                            sessionStorage.setItem("userData", JSON.stringify(res.data.data))
                            sessionStorage.setItem("userId", res.data.data._id)
                            sessionStorage.setItem("token", res.data.token)
                            localStorage.setItem("token", res.data.token)

                          
                             if (res.data.data.userType == 3) {
                                navigate("/")
                            }
                        }
                    })
                } else {
                    toast.error(response.data.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <Fragment>
            <ToastContainer />
            <div className=" register-form-container">
                <div className="register-form-left-box">
                    <div className="register-left-box-heading">
                        <h1>Journeyfy</h1>
                        <h4>Welcomee Back</h4>
                        <p>Adventure is out there, waiting for you to find it</p>
                    </div>
                    <div className="register-left-box-img">
                        <img src="assets/img/mobile-login.png" alt="" />
                    </div>

                </div>
                {/* ////////////////////////////////////////////////////////////////////// */}
                <div className="register-form-right-box">
                    <form className="register-form" action="" onSubmit={handleForm}>
                        <h2>Register your account</h2>

                        <div className="input1"> <label htmlFor="register">Name</label>
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /></div>

                        <div className="input1"> <label htmlFor="register">Email</label>
                            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} /></div>

                        <div className="input1"> <label htmlFor="register">Password</label>
                            <input type="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} /></div>

                        <div className="input2"> <label htmlFor="register">Contact</label>
                            <input type="number" min={0} value={contact} onChange={(e) => { setContact(e.target.value) }} /></div>


                        <div className="input2"> <label htmlFor="login">Address</label>
                            <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} /></div>

                        <div className="gender-input">
                            <label htmlFor="" className="gender">Gender</label>
                            <label>
                                <input
                                    type="radio"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={(e) => { setGender(e.target.value) }}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={(e) => { setGender(e.target.value) }}
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="other"
                                    checked={gender === 'other'}
                                    onChange={(e) => { setGender(e.target.value) }}
                                />
                                Other
                            </label>
                        </div>

                        {/* <div className="checkbox"><input type="checkbox" className="check" /> <label htmlFor="login">Remember my preference</label>
                        </div> */}
                        <button>Sign up</button>

                        <div className="register-form-signup-link ">
                            <p>Don't have an account? <Link to={"/login"} ><span>Sign in</span></Link> </p>

                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}