import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './carview.css';
import { ReactImageTurntable } from 'react-image-turntable';
import { Tb360View } from 'react-icons/tb'
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

    const imageUrls = car.productPictures.map(picture => `https://velocity-vehicles-backend-production.up.railway.app/${picture}`);

    return (
        <div className='container'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col-md-7 text-center">
                    <ReactImageTurntable images={imageUrls} />
                    {/* <img
                        src={`https://velocity-vehicles-backend-production.up.railway.app/${car.productPictures}`}
                        height='180px' width='255px' alt={car.name}
                    /> */}
                    <Tb360View size={50} />
                </div>

                <div className="col-md-5">
                    <h3 className="my-3">{car.name}</h3>
                    <h4>Description : </h4><span>{car.description}</span>
                </div>

                <div class="text-center mt-5 pt-5">
                    <u><h1 class="heading">{car.brand.name}<span className='text-warning'>Specifications</span></h1></u>
                </div>

                <table class="table my-5 border text-center table-striped">
                    <tbody>
                        <tr>
                            <th>Brand</th>
                            <td>{car.brand.name}</td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td>{car.price}</td>
                        </tr>
                        <tr>
                            <th>Fuel Type</th>
                            <td>{car.fuelType}</td>
                        </tr><tr>
                            <th>Mileage</th>
                            <td>{car.mileage}</td>
                        </tr><tr>
                            <th>Safety Rating</th>
                            <td>{car.safetyrating}</td>
                        </tr><tr>
                            <th>Warranty</th>
                            <td>{car.warranty}</td>
                        </tr><tr>
                            <th>Seater</th>
                            <td>{car.seater}</td>
                        </tr><tr>
                            <th>Size</th>
                            <td>{car.size}</td>
                        </tr><tr>
                            <th>Fuel Tank</th>
                            <td>{car.fuelTank}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarView;
