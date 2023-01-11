import { useEffect } from "react";
import { DateTime } from "luxon";

import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import useHttp from "./useHttp";

const useAxiosApi = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const httpApi = useHttp();

    useEffect(() => {
        const requestIntercept = httpApi.interceptors.request.use(
            async (config) => {
                if (!config.headers.Authorization) {
                    if (auth?.expiresAt && DateTime.now() > auth?.expiresAt) {
                        const newAccessToken = await refresh();

                        config.headers.Authorization = `Bearer ${newAccessToken}`;
                    } else if (auth?.accessToken) {
                        config.headers.Authorization = `Bearer ${auth?.accessToken}`;
                    }
                }

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = httpApi.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;

                    const newAccessToken = await refresh();

                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return httpApi(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            httpApi.interceptors.request.eject(requestIntercept);
            httpApi.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return httpApi;
};

export default useAxiosApi;
