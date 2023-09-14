import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAuth } from '../context/auth'
import axios from 'axios';

const UserProfile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("https://velocity-vehicles-backend-production.up.railway.app/api/user/profileUpdate", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.errro) {
                alert(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                alert("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };
    return (
        <div className='container'>
            <br /><br /><br /><br /><br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3>Update Profile</h3>
                        <div class="card text-black mb-5" >
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <form class="mx-1 mx-md-4">
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example1c">Name</label>
                                                <input value={name} onChange={(e) => setName(e.target.value)} type="email" id="form3Example1c" class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example1c">Email</label>
                                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example1c" class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example4c">Password</label>
                                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4c" class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example1c">Phone</label>
                                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="email" id="form3Example1c" class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example1c">Address</label>
                                                <textarea rows={4} value={address} onChange={(e) => setAddress(e.target.value)} type="email" id="form3Example1c" class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center mx-4">
                                            <button onClick={handleSubmit} type="button" class="btn btn-primary btn-lg">Update</button>
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

export default UserProfile
