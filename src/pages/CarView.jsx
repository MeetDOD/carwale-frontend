import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactImageTurntable } from 'react-image-turntable';
import { Tb360View } from 'react-icons/tb'
import '../styles/carview.css'
import { BsFuelPumpFill } from 'react-icons/bs'
import { TbEngine, TbStars } from 'react-icons/tb'
import { AiOutlineNodeIndex, AiOutlineColumnWidth } from 'react-icons/ai'
import { MdCompareArrows, MdOutlinePropaneTank, MdAirlineSeatReclineExtra } from 'react-icons/md'
import { GiBackwardTime } from 'react-icons/gi'

const CarView = () => {
    const params = useParams();
    const [car, setCar] = useState({ name: '', description: '', productPictures: [], price: '', brand: '', fuelTank: '', fuelType: '', mileage: '', safetyrating: '', warranty: '', seater: '', size: '', });

    const getCar = async () => {
        try {
            const { data } = await axios.get(`https://velocity-vehicles-backend-production.up.railway.app/api/car/getCarById-car/${params.slug}`);
            setCar(data.car);
            console.log(car)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (params?.slug) {
            getCar();
        } else {
            console.log('error')
        }
    }, [params?.slug]);

    const updatedAt = new Date(car.updatedAt).toLocaleString();

    const imageUrls = car.productPictures.map(picture => `https://velocity-vehicles-backend-production.up.railway.app/${picture}`);

    return (
        <div className='container marginStyle'>
            <div className="row">
                <div className="col-md-6 text-center">
                    <ReactImageTurntable images={imageUrls} className='border border-4 rounded' style={{ cursor: '-webkit-grab' }} />
                    <Tb360View size={50} className='my-3' /><br />
                    {car.productPictures.map((image, index) => (
                        <img className='border m-1 rounded'
                            key={index}
                            src={`https://velocity-vehicles-backend-production.up.railway.app/${image}`}
                            style={{ maxWidth: '150px', height: '100px', objectFit: 'contain', cursor: 'pointer' }}
                            alt={car.name}
                        />
                    ))}
                </div>

                <div className="col-md-6">
                    <div className='centerMob'>
                        <img
                            decoding="async"
                            src={`https://velocity-vehicles-backend-production.up.railway.app/${car.brand.brandPictures}`}
                            className="img-fluid"
                            style={{ maxWidth: '100%', maxHeight: '40px', objectFit: 'contain' }}
                        />
                        <span className='badge bg-dark mb-3 m-2'>{car.brand.name}</span>
                        <h3 className="mb-3 mt-2">{car.name}</h3>
                    </div>
                    <h4>{car.name} Description : </h4><h6 className='lh-base'>{car.description}</h6>
                    <h4>Rs. {car.price}</h4>
                    <h4>Released At : {updatedAt}</h4>
                    <table className="table table-bordered my-4">
                        <thead>
                            <tr>
                                <td scope="row" className='p-3'>
                                    <p className='text-secondary '><BsFuelPumpFill size={25} /> FuelType</p>
                                    <h5>{car.fuelType}</h5>
                                </td>
                                <td scope="row" className='p-3'>
                                    <p className='text-secondary '><TbEngine size={25} /> Mileage</p>
                                    <h5>{car.mileage}</h5>
                                </td><td scope="row" className='p-3'>
                                    <p className='text-secondary '><TbStars size={25} /> Safety Rating</p>
                                    <h5>{car.safetyrating}</h5>
                                </td>
                            </tr>

                            <tr>
                                <td scope="row" className='p-3'>
                                    <p className='text-secondary '><GiBackwardTime size={25} /> Warranty</p>
                                    <h5>{car.warranty}</h5>
                                </td>
                                <td scope="row" className='p-3'>
                                    <p className='text-secondary '><MdAirlineSeatReclineExtra size={25} /> Seater</p>
                                    <h5>{car.seater}</h5>
                                </td><td scope="row" className='p-3'>
                                    <p className='text-secondary '><MdCompareArrows size={25} /> Size</p>
                                    <h5>{car.size}</h5>
                                </td>
                            </tr>

                            <tr>
                                <td scope="row" className='p-3'>
                                    <p className='text-secondary '><MdOutlinePropaneTank size={25} /> Fuel Tank</p>
                                    <h5>{car.fuelTank}</h5>
                                </td>
                                <td scope="row" className='p-3'>
                                    <p className='text-secondary '><AiOutlineColumnWidth size={25} /> Engine Size</p>
                                    <h5>{car.engineSize}</h5>
                                </td>
                                <td scope="row" className='p-3'>
                                    <p className='text-secondary '><AiOutlineNodeIndex size={25} /> Transmission</p>
                                    <h5>{car.transmission}</h5>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CarView;
