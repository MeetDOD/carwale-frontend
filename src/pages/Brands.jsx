import React, { useEffect, useState } from 'react';
import './brands.css';
import axios from 'axios';

const Brands = () => {

    const [brand, setBrand] = useState([])

    const getAllBrand = async () => {
        try {
            const { data } = await axios.get('https://velocity-vehicles-backend-production.up.railway.app/api/brand/getAll-brand')
            if (data.success) {
                setBrand(data.brand)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllBrand()
    })
    return (
        <div>
            <br /><br />
            <br /><br /><br />
            <div className="text-center">
                <h1 className="heading">Popular<span className='text-warning'>Brands</span></h1>
            </div>
            <div className="d-flex flex-wrap justify-content-center mt-4 gap-4">
                <div className='mx-5'>
                    {brand?.map(c => (
                        <div className="cardBrand">
                            <div className="pic">
                                <a target="_blank" href="https://www.raweng.com/">
                                    <img
                                        src='https://e7.pngegg.com/pngimages/523/480/png-clipart-enzo-ferrari-car-laferrari-scuderia-ferrari-ferrari-emblem-logo.png'
                                        style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                                        className='p-1'
                                        alt="Raw Engineering"
                                    />
                                    <h1>{c.name}</h1>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Brands;
