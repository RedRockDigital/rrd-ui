import useAuth from "./useAuth";
import useConfig from "./useConfig";

import Http from "@/Services/Http";

const useRefreshToken = () => {
    const { setToken } = useAuth();
    const { getConfig } = useConfig();

    return async () => {
        const refreshToken = sessionStorage.getItem("refresh_token");

        // abort, the user isn't authed
        if (!refreshToken) {
            return;
        }

        // make a call to the API to request a new access token
        const response = await Http.post(`${getConfig('apiRoute')}/oauth/token`, {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: getConfig("oauthClientId"),
            client_secret: getConfig("oauthClientSecret"),
        });

        await setToken(response.data.access_token, response.data.expires_in, response.data.refresh_token);

        return response.data.access_token;
    };
};

export default useRefreshToken;
