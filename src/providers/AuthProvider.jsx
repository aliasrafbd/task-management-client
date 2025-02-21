import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const axiosPublic = useAxiosPublic();

    const queryClient = useQueryClient();

    const { data: tasks = [], isLoading, refetch:tasksRefetch, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            console.log("API hit with search:");
            const response = await axiosPublic.get(`/tasks`);
            return response.data;
        },
    });

    console.log(tasks);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createANewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("Current User", currentUser?.email);

            // if (currentUser?.email) {
            //     const user = { email: currentUser.email }

            //     axios.post('https://hostel-management-server-orcin.vercel.app/jwt', user, { withCredentials: true, })
            //         .then(res => {
            //             console.log("login", res.data)
            //             setLoading(false);
            //         })
            // }
            // else {
            //     axios.post('https://hostel-management-server-orcin.vercel.app/logout', {}, { withCredentials: true, })
            //         .then(res => {
            //             console.log("logout", res.data);
            //             setLoading(false);
            //         })
            // }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user, 
        loading,  
        logOut,
        createANewUser,
        setUser,
        setLoading,
        googleLogIn,
        tasks,
        tasksRefetch,
    }
    


    return (

        <AuthContext.Provider value={authInfo}>
            <div>
                {children}
            </div>
        </AuthContext.Provider>

    );
};

export default AuthProvider;