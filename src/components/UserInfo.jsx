import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const UserInfo = () => {

    const { user } = useContext(AuthContext);

    console.log(user);

    return (
        <>
            <div className="flex justify-between max-w-7xl mx-auto">
                <div className="ml-4 text-left">
                    <img className="mx-auto h-24 w-24 rounded-full" src={user?.photoURL} />
                </div>
                <div className="mt-4 w-1/2 text-right mr-8 space-y-2">
                    <p className="text-lg font-bold"><strong></strong> {user?.displayName}</p>
                    <p className="text-md"><strong></strong> {user?.email}</p>
                </div>
            </div>
        </>
    );
};

export default UserInfo;