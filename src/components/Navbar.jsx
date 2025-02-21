import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {


    const { user, logOut } = useContext(AuthContext);

    const Links = (
        <>
            <NavLink to="/"><li className='py-1 px-3 font-semibold'>Home</li></NavLink>
        </>
    )

    return (
        <>
            <div className='max-w-7xl mx-auto py-4 flex justify-center'>
                <div className='font-extrabold text-3xl'>
                    <h1>Task Management Application</h1>
                </div>
            </div>
        </>
    );
};

export default Navbar;