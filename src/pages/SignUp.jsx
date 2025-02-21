import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [error, setError] = useState({});

    const { createANewUser } = useContext(AuthContext)

    const handleSignUp = (e) => {
        e.preventDefault();
        setError("");

        const form = new FormData(e.target);

        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");
        // console.log(name, photo, email, password);

        const regexL = /[a-z]/;
        const regexU = /[A-Z]/;

        if (!regexL.test(password)) {
            setError({ ...error, name: "Password should have at least one lowercase letter" });
            return;
        }

        if (!regexU.test(password)) {
            setError({ ...error, name: "Password should have at least one uppercase letter" });
            return;
        }

        if (password.length <= 6) {
            setError({ ...error, name: "Password must be 6  character long" });
            return;
        }

        createANewUser(email, password)
            .then((result) => {
                // setUser(result.user);

                alert("Successfully Registered")
                // updateUserProfile({ displayName: name, photoURL: photo })
                //     .then(() => {
                //         // navigate("/");
                //     })
                //     .catch((error) => {
                //     })
            })
            .catch((error) => {
            });

    }


    return (
        <div>
            <div className="bg-updateProfile object-contain w-screen bg-no-repeat bg-cover bg-center min-h-screen flex justify-center -mt-8 items-center">
                <div className="card bg-transparent my-8 md:w-full w-[88%] px-6 py-12 max-w-lg shrink-0">
                    <h2 className="font-semibold text-center text-2xl">Sign Up</h2>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="photo-url" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        
                        <div>
                            {
                                error?.name && (
                                    <p className="text-red-600">{error.name}</p>
                                )
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up Now</button>
                        </div>
                        <p>Already have an account? Please <Link className='text-blue-600' to="/login">Login</Link> </p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignUp;