//These repository files will be responsible for the flow of loaders and then sending the data to the connector along with the specific endpoint.
//i.e frontend pages will call the functions from thsese repo and then pass data to this and this function will decide the further actions/
//i.e enabling the loader, which endpoint should be called, after receiving the response what to do, toasting the required messages and at last defusing loaders.

import { toast } from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { setAccount, setAccountAfterRegister, LogOut } from '../../app/AuthSlice';
import { authEndpoints } from "../Api"
const { LOGIN_API, REGISTER, LOGOUT } = authEndpoints;

export function login(email, password, navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Letting you in...");

        try {

            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            if (response.status === 200) {
                toast.success(response.message);
                const temp = {
                    "_id": response.data.user._id,
                    "username": response.data.user.fullName,
                    "email": response.data.user.email,
                    "token": response.data.user.token,
                    "role_id": response.data.user.role_id,
                };
                await dispatch(setAccount(temp));
                if( temp.role_id === 2 ){
                    navigate("/user/market");
                }

            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }

        toast.dismiss(loadingToast);
    };
}

export function register(fullName, email, role_id, password, navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Registering you...");
        try {
            const formData = {
                fullName,
                email,
                role_id,
                password,
            }

            const response = await apiConnector("POST", REGISTER, formData);

            if (response.data) {
                toast.success("Registration Successful..");
                const temp = {
                    "_id": response.data.user._id,
                    "username": response.data.user.fullName,
                    "email": response.data.user.email,
                    "role_id": response.data.user.role_id,
                }
                dispatch(setAccountAfterRegister(temp))
                navigate("/login");
            } else {
                throw new Error(response.data.message);
            }
        }
        catch (error) {
            console.log("Register API Error....", error);
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(loadingToast);
    }
}

export function logout(navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Logging you out...");
        try {
            const response = await apiConnector("POST", LOGOUT, {});

            if (response.status === 200) {
                toast.success("Logout Successful..");
                dispatch(LogOut());
                navigate("/");
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }

        toast.dismiss(loadingToast);
    };
}
