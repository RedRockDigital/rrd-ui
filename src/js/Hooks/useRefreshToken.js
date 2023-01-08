import Http from "@/Services/Http";

import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setToken } = useAuth();

    return async () => {
        const refreshToken = sessionStorage.getItem("refresh_token");

        // abort, the user isn"t authed
        if (!refreshToken) {
            return;
        }

        // make a call to the API to request a new access token
        const response = await Http.post("/../oauth/token", {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
        });

        await setToken(response.data.access_token, response.data.expires_in, response.data.refresh_token);

        return response.data.access_token;
    };
};

export default useRefreshToken;
