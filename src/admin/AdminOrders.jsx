import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth'
import moment from 'moment'
import axios from 'axios'
import { Select } from "antd";
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
        <div className='container'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">Manage Orders</h1>
                        <div className="table-responsive">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col"> date</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Car Name</th>
                                        <th scope="col">Car Price</th>
                                    </tr>
                                </thead>
                                {order?.map((o, i) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <Select
                                                        bordered={false}
                                                        onChange={(value) => handleChange(o._id, value)}
                                                        defaultValue={o?.status}
                                                    >
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s}>
                                                                {s}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createAt).fromNow()}</td>
                                                    <td>{o?.payment.success ? "Failed" : "Success"}</td>
                                                    <td>{o?.products?.length}</td>
                                                    {o?.products?.map((p, i) => (
                                                        <>
                                                            <td>{p.name}</td>
                                                            <td>{p.price}</td>
                                                            {/* <img
                                                                // src={`https://velocity-vehicles-backend-production.up.railway.app/${p.productPictures[0]}`}
                                                                // className="img-fluid"
                                                                alt={p.name}
                                                                height={"110px"}
                                                            /> */}
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
