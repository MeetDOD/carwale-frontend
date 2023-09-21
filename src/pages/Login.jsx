import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../images/logo.png'
import login from '../images/login.png'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation();

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid Email Format');
            return false;
        }
        try {
            const res = await axios.post('https://velocity-vehicles-backend-production.up.railway.app/api/user/login', {
                email, password
            });
            if (res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
            } else {
                toast.error(res.data.message)
            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className='my-5'>
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center ">
                    <div class="col col-xl-10">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-6 d-none d-md-block mt-5">
                                <img src={login}
                                    alt="login form" class="img-fluid" />
                            </div>
                            <div class="col-md-6 col-lg-6 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5 text-black">
                                    <form>
                                        <div class="text-center mb-3 d-flex">
                                            <h1 class="text-center">Login </h1>
                                            <img src={logo} style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain' }} />
                                        </div>
                                        <label class="form-label"><MdEmail size={25} /> Email address</label>
                                        <div class="mb-4 row mx-1">
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control form-control-lg" required />
                                        </div>

                                        <label class="form-label"><RiLockPasswordFill size={25} /> Password</label>
                                        <div class=" mb-4 row mx-1">
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control form-control-lg" required />
                                        </div>

                                        <div class="mt-4 row mx-1">
                                            <button class="btn btn-lg btn-block text-white" onClick={handleSubmit} type="button" style={{ backgroundColor: 'blueviolet' }}>Login</button>
                                        </div>
                                        <div class="mt-4 row mx-1">
                                            <Link to='/register' class="btn btn-outline-dark btn-lg btn-block" type="button">Register</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
