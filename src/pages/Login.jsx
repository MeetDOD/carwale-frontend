import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../context/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://velocity-vehicles-backend-production.up.railway.app/api/user/login', {
                email, password
            });
            if (res.data.success) {
                alert(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
            } else {
                alert(res.data.message)
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className='marginStyle'>
                <section className="my-5" >
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black" >
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                                                <form className="mx-1 mx-md-4">
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="form3Example1c">Email</label>
                                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example1c" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="form3Example4c">Password</label>
                                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4c" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg">Login</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Login
