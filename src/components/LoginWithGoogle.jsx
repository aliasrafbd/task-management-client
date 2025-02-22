import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const LoginWithGoogle = () => {
    const { googleLogIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleLoginGoogle = () => {
        googleLogIn()
            .then(res => {
                const userInfo = {
                    uid: res.user.uid, // Firebase User ID
                    name: res.user.displayName,
                    email: res.user.email,
                };

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Login successful!',
                                icon: 'success',
                                timer: 1000,
                                showConfirmButton: false,
                                timerProgressBar: true,
                            });
                        } else {
                            Swal.fire({
                                title: 'Welcome Back!',
                                text: '',
                                icon: 'info',
                                timer: 1000,
                                showConfirmButton: false,
                                timerProgressBar: true,
                            });
                        }
                        navigate('/');
                    });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                });
            });
    };

    return (
        <div>
            <button onClick={handleLoginGoogle} className='text-center block w-full my-4'>Login</button>
        </div>
    );
};

export default LoginWithGoogle;