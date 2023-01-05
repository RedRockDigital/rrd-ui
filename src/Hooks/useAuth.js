import { useContext } from "react";
import { DateTime } from "luxon";

import AuthContext from "@/Context/AuthProvider";

const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);

    /**
     * @function setToken
     * @param {string} accessToken
     * @param {datetime} expiresAt
     * @param {string} refreshToken
     * @return {*}
     */
    const setToken = (accessToken, expiresAt, refreshToken) => {
        // Store the refresh token so that we can remember who the user is if they refresh, and request a new
        // access token.
        sessionStorage.setItem("refresh_token", refreshToken);

        // we now have the bearer data from the api for storing, and we"ll send the user to  their intended
        // destination. With our expires in attribute, we"ll give our self a minute buffer to reduce the number of
        // API authorisation failures.
        return setAuth((prev) => ({
            ...prev,
            accessToken,
            expiresAt: DateTime.now().plus({ seconds: expiresAt - 60 }),
            refreshToken,
        }));
    };

    /**
     * @method removeToken
     * @return {*}
     */
    const removeToken = () => {
        sessionStorage.removeItem("refresh_token");

        return setAuth({});
    };

    return {
        auth,
        setAuth,
        setToken,
        removeToken,
    };
};

export default useAuth;
