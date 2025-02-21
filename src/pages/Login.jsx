import React, { useContext } from 'react';
import LoginWithGoogle from '../components/LoginWithGoogle';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {

    const { user, setUser, loading, googleLogIn } = useContext(AuthContext);

    return (
        <>
            Login Page

           <LoginWithGoogle></LoginWithGoogle> 
        </>
    );
};

export default Login;