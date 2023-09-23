import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart';
import { Link } from 'react-router-dom';
import '../styles/brands.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { MdAirlineSeatReclineExtra } from 'react-icons/md'
import { BsFuelPumpFill } from 'react-icons/bs'
import { TbStars } from 'react-icons/tb'
import { PiCurrencyInrFill } from 'react-icons/pi'
import toast from 'react-hot-toast';

const CarsHome = () => {
    const [cars, setcars] = useState([]);
    const [cart, setcart] = useCart()

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

    const notify = () => toast.success('Added to Cart Successfully')

    useEffect(() => {
        getAllcars();
    }, []);

    return (
        <>
            <div className="brand_wrapper" id='cars'>
                <div className="col-12 text-center">
                    <p className="brand_subtitle">A Wide Range of Cars Awaits!</p>
                    <h2 className="brand_title">Cars showcase</h2>
                </div>
            </div>
            <div className="container">
                <div className="row" style={{ marginBottom: '100px', marginTop: '-40px' }}>
                    {cars.map((p) => (
                        <div className="col-md-12 col-lg-3 mb-3 mb-lg-0 my-3">
                            <div className="card">
                                <div className="d-flex justify-content-between p-3">
                                    <p className="lead mb-0">{p.brand.name}</p>
                                    <div
                                        className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                        style={{ width: '35px', height: '35px' }}>
                                        <Link to={`/brand/${p.brand.slug}`} className="text-white mb-0 small">
                                            <img src={`https://velocity-vehicles-backend-production.up.railway.app/${p.brand.brandPictures}`} alt={p.brand.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                        </Link>
                                    </div>
                                </div>
                                <Link to={`/car/${p.slug}`} className='text-center'>
                                    <img src={`https://velocity-vehicles-backend-production.up.railway.app/${p.productPictures[0]}`} alt={p.name} style={{ maxWidth: '100%', maxHeight: '130px', objectFit: 'contain' }} className='border rounded' />
                                </Link>
                                <div className="card-body">
                                    <h4 className="text-center mb-4">{p.name}</h4>
                                    <div className="d-flex justify-content-between">
                                        <h6><PiCurrencyInrFill /> : {p.price}</h6>
                                        <h6 ><BsFuelPumpFill /> : {p.fuelType}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between my-2">
                                        <h6 ><TbStars /> : {p.safetyrating}</h6>
                                        <h6 ><MdAirlineSeatReclineExtra /> : {p.seater} Seater</h6>
                                    </div>
                                    <div className='text-center'>
                                        <Link className='btn my-2  ' style={{ backgroundColor: 'blueviolet', color: 'white' }} to={`/car/${p.slug}`}><AiOutlineEye size={20} className='pb-1' /> View</Link>
                                        <button className='btn btn-outline-primary my-2 mx-3 ' onClick={() => { setcart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); notify() }} ><AiOutlineShoppingCart size={20} className='pb-1' /> Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default CarsHome
