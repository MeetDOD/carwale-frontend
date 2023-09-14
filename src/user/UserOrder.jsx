import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import axios from 'axios'
import { useAuth } from '../context/auth'
import moment from 'moment'

const UserOrder = () => {
    const [order, setOrder] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get('https://velocity-vehicles-backend-production.up.railway.app/api/user/orders')
            console.log(data)
            setOrder(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
        <div className='container'>
            <br /><br /><br /><br /><br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3>My Orders</h3>
                        <div className="col-md-12">
                            <h1 className="text-center">My Orders</h1>
                            <div className="table-responsive">
                                <table className="table table-hover text-center">
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
                                            <th scope="col">Car Image</th>
                                        </tr>
                                    </thead>
                                    {order?.map((o, i) => {
                                        return (
                                            <>
                                                <tbody>
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{o?.status}</td>
                                                        <td>{o?.buyer?.name}</td>
                                                        <td>{moment(o?.createAt).fromNow()}</td>
                                                        <td>{o?.payment.success ? "Failed" : "Success"}</td>
                                                        <td>{o?.products?.length}</td>
                                                        {o?.products?.map((p, i) => (
                                                            <>
                                                                <td>{p.name}</td>
                                                                <td>{p.price}</td>
                                                                <img
                                                                    src={`https://velocity-vehicles-backend-production.up.railway.app/${p.productPictures[0]}`}
                                                                    className="img-fluid"
                                                                    alt={p.name}
                                                                // height={"110px"}
                                                                />
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
        </div>
    )
}

export default UserOrder
