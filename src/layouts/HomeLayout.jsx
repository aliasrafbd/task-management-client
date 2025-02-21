import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UserInfo from '../components/UserInfo';

const HomeLayout = () => {
    return (
        <div className='bg-lime-50 -mb-6'>
            <Navbar></Navbar>
            <UserInfo></UserInfo>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default HomeLayout;