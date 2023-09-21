import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill, RiAccountCircleFill } from 'react-icons/ri'
import logo from '../images/logo.png'
import register from '../images/register.png'
import { AiFillMobile } from 'react-icons/ai'
import { FaAddressCard } from 'react-icons/fa6'
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://velocity-vehicles-backend-production.up.railway.app/api/user/register', {
                name, email, password, phone, address
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
            if (!name.trim()) {
                toast.error('Name is required');
                return false;
            }
            if (!email.trim()) {
                toast.error('Email is required');
                return false;
            }
            if (!password.trim()) {
                toast.error('Password is required');
                return false;
            }
            if (!phone.trim()) {
                toast.error('Phone Number is required');
                return false;
            }
            if (!address.trim()) {
                toast.error('Address is required');
                return false;
            }
            if (!validateEmail(email)) {
                toast.error('Invalid Email Format');
                return false;
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
                            <div class="col-md-6 col-lg-6 mt-5 d-none d-md-block">
                                <img src={register}
                                    alt="login form" class="img-fluid" />
                            </div>
                            <div class="col-md-6 col-lg-6 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5 text-black">
                                    <form>
                                        <div class="text-center mb-3 d-flex">
                                            <h1 class="text-center">Register</h1>
                                            <img src={logo} style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain' }} />
                                        </div>

                                        <label class="form-label"><RiAccountCircleFill size={25} /> Name</label>
                                        <div class="mb-4 row mx-1">
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" class="form-control form-control-lg" required />
                                        </div>

                                        <label class="form-label"><MdEmail size={25} /> Email address</label>
                                        <div class="mb-4 row mx-1">
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control form-control-lg" required />
                                        </div>

                                        <label class="form-label"><RiLockPasswordFill size={25} /> Password</label>
                                        <div class=" mb-4 row mx-1">
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control form-control-lg" required />
                                        </div>

                                        <label class="form-label"><AiFillMobile size={25} /> Phone Number</label>
                                        <div class="mb-4 row mx-1">
                                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" class="form-control form-control-lg" required />
                                        </div>

                                        <label class="form-label"><FaAddressCard size={25} /> Address</label>
                                        <div class="mb-4 row mx-1">
                                            <textarea rows={4} value={address} onChange={(e) => setAddress(e.target.value)} type="text" class="form-control form-control-lg" required />
                                        </div>
                                        <div class="mt-4 row mx-1">
                                            <button class="btn btn-lg btn-block text-white" onClick={handleSubmit} type="button" style={{ backgroundColor: 'blueviolet' }}>Register</button>
                                        </div>
                                        <div class="mt-4 row mx-1">
                                            <Link to='/login' class="btn btn-outline-dark btn-lg btn-block" type="button">Login</Link>
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

export default Register
