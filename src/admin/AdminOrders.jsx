import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth'
import moment from 'moment'
import axios from 'axios'
import { Select } from "antd";
import { Link } from 'react-router-dom'
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel",]);
    const [order, setOrder] = useState([])
    const [auth, setAuth] = useAuth()
    const [changeStatus, setCHangeStatus] = useState("");

    const getOrders = async () => {
        try {
            const { data } = await axios.get('https://velocity-vehicles-backend-production.up.railway.app/api/user/allOrders')
            setOrder(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`https://velocity-vehicles-backend-production.up.railway.app/api/user/orderStatus/${orderId}`, { status: value, });
            getOrders();
            alert("State Updated")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container marginStyle'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 my-3">
                        <h1 className="text-center">Manage Orders</h1>
                        <div className="table-responsive">
                            <table className="table table-bordered text-center">
                                <thead className='table-dark'>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col"> date</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Images</th>
                                    </tr>
                                </thead>
                                {order?.map((o, i) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <Select
                                                            bordered={false}
                                                            onChange={(value) => handleChange(o._id, value)}
                                                            defaultValue={o?.status}
                                                            className=''
                                                        >
                                                            {status.map((s, i) => (
                                                                <Option key={i} value={s}>
                                                                    {s}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                                    <td>
                                                        <span className="badge text-bg-success">{o?.payment.success ? "Failed" : "Success"}</span>
                                                    </td>
                                                    {o?.products?.map((p, i) => (
                                                        <>
                                                            <td>{p.name}</td>
                                                            <td>₹ {p.price}</td>
                                                            <td>
                                                                <Link to={`/car/${p.slug}`} className='text-center'>
                                                                    <img
                                                                        src={`https://velocity-vehicles-backend-production.up.railway.app/${p.productPictures[0]}`}
                                                                        style={{ maxWidth: '100%', maxHeight: '60px', objectFit: 'contain' }}
                                                                        alt={p.name}
                                                                    />
                                                                </Link>
                                                            </td>
                                                        </>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </>
                                    );
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOrders
