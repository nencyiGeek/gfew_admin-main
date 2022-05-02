import React from 'react';
// import CustomNavbar from '../components/CustomNavbar';
import Navbar from './Navbar';
import DesignBanner from '../components/Banner/DesignBanner';
// import Service from '../components/Service/Service';
import Todo from './Todo';
import Pricing from './Pricing';
import VirtualAssistant from './VirtualAssistant';
import ReviewBanner from './ReviewBanner';
import Footer from './Footer';


export const Home = () => (
    <div className="body_wrapper wrapper_css">
        <Navbar/>
        {/* <Service/> */}
        <DesignBanner/>
        <Todo/>
        <Pricing/>
        <VirtualAssistant/>
        <ReviewBanner/>
        <Footer/> 
    </div>
)