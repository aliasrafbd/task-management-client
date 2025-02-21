import { useContext } from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import { AuthContext } from "../providers/AuthProvider";

const LoginLogout = () => {
    const { user, logOut } = useContext(AuthContext);

    return (
        <div className="text-right">
            {!user ? (
                <button className="text-left btn hover:btn-secondary rounded-lg">
                    <LoginWithGoogle />
                </button>
            ) : (
                <button
                    onClick={() => logOut()}
                    className="block w-full btn btn-error text-left px-4 py-2 hover:bg-gray-100"
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default LoginLogout;
