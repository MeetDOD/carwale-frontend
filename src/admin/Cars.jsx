import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { BsFuelPumpFill } from 'react-icons/bs'
import { PiCurrencyInrFill } from 'react-icons/pi'
import toast from 'react-hot-toast';

const Cars = () => {

    const [cars, setcars] = useState([]);

    const getAllcars = async () => {
        try {
            const data = await fetch("https://velocity-vehicles-backend-production.up.railway.app/api/car/getAll-car", {
                method: "GET",
                headers: { "Content-type": "application/json" }
            })
            const data_ = await data.json()
            setcars(data_.car)
            console.log(data_.car)

        } catch (error) {
            console.log(error);
        } finally {

        }
    };

    const truncateText = (text, maxLength) => {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + '...';
        }
        return text;
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`https://velocity-vehicles-backend-production.up.railway.app/api/car/delete-car/${id}`)
            if (data?.success) {
                toast.success('Car Deleted Successfully')
                getAllcars()
            } else {
                toast.error('Error in Deleting car')
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllcars();
    }, []);

    return (
        <div className='container marginStyle'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center my-3">All Cars List</h1>
                        <div className="row" style={{ marginTop: '0px' }}>
                            {cars.map((p) => (
                                <div className="col-md-12 col-lg-6 mb-lg-0 my-3">
                                    <div className="card">
                                        <div className="d-flex justify-content-between p-3">
                                            <p className="lead mb-0">{p.brand.name}</p>
                                            <div
                                                className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                                style={{ width: '35px', height: '35px' }}>
                                                <p className="text-white mb-0 small">
                                                    <img src={`https://velocity-vehicles-backend-production.up.railway.app/${p.brand.brandPictures}`} alt={p.brand.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                                </p>
                                            </div>
                                        </div>
                                        <Link to={`/dashboard/admin/car/${p.slug}`} className='text-center'>
                                            <img src={`https://velocity-vehicles-backend-production.up.railway.app/${p.productPictures[0]}`} alt={p.name} style={{ maxWidth: '100%', maxHeight: '190px', objectFit: 'contain' }} />
                                        </Link>
                                        <div className="card-body">
                                            <h4 className="text-center mb-4">{p.name}</h4>
                                            <div className="d-flex justify-content-between">
                                                <h6><PiCurrencyInrFill /> : {p.price}</h6>
                                                <h6 ><BsFuelPumpFill /> : {p.fuelType}</h6>
                                            </div>
                                            <div className='text-center my-2'>
                                                <Link to={`/dashboard/admin/car/${p.slug}`} className='btn btn-primary mt-2 mx-2'>Update</Link>
                                                <button onClick={() => handleDelete(p._id)} className='btn btn-danger mt-2'>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cars
