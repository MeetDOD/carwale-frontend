import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import axios from 'axios'
import { useAuth } from '../context/auth'
import moment from 'moment'
import { Link } from 'react-router-dom'

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
        <div className='container marginStyle'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 my-3'>
                        <div className="col-md-12">
                            <h1 className="text-center">My Orders</h1>
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
                                            <th scope="col">Image</th>
                                        </tr>
                                    </thead>
                                    {order?.map((o, i) => {
                                        return (
                                            <>
                                                <tbody>
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <span className="badge text-bg-primary">{o?.status}</span>
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
        </div>
    )
}

export default UserOrder
