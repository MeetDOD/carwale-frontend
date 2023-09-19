import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'

const CreateBrands = () => {
    const [name, setName] = useState('');
    const [brandPictures, setbrandPictures] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setbrandPictures(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const carData = new FormData();
            carData.append('name', name);

            brandPictures.forEach((image, index) => {
                carData.append(`brandPictures`, image);
            });
            console.log(brandPictures)

            const { data } = await axios.post('https://velocity-vehicles-backend-production.up.railway.app/api/brand/create-brand', carData);

            if (data.success) {
                alert('Car Created Successfully');
                navigate('/dashboard/admin/brands');
            } else {
                alert('Error in Car creation');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='container'>
            <br />
            <br />
            <br />
            <br />
            <br />
            {!loading ? (
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-9 mt-2'>
                            <form method='post' enctype="multipart/form-data">
                                <h1>Create Brand</h1>
                                <div className='m-1'>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={name}
                                            placeholder='write the brand name'
                                            className='form-control'
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        {brandPictures.map((image, index) => (
                                            <div key={index} className='text-center'>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`car_image_${index}`}
                                                    className='img img-fluid'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mb-3'>
                                        <label className='btn btn-outline-primary col-md-12'>
                                            Upload Images
                                            <input
                                                type='file'
                                                name='productPictures'
                                                accept='image/*'
                                                multiple
                                                onChange={handleImageChange}
                                                hidden
                                            />
                                        </label>
                                    </div>
                                    <div className='mb-3'>
                                        <button className='btn btn-success' onClick={handleSubmit}>
                                            Create Brand
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : <Loading />}
        </div>
    );
};

export default CreateBrands;
