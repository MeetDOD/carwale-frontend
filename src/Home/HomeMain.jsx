import React from 'react'
import About from './About';
import Brands from './Brands';
import Faq from './Faq';
import Features from './Features';
import CarsHome from './CarsHome';
import Hero from './Hero';

const HomeMain = () => {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <Brands />
            <CarsHome />
            <Faq />
        </>
    )
}

export default HomeMain
