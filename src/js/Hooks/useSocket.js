import Echo from "laravel-echo";
import Pusher from "pusher-js";

import useAuth from "@/Hooks/useAuth";
import useConfig from "@/Hooks/useConfig";

const useSocket = () => {
    const { auth } = useAuth();
    const { getConfig } = useConfig();

    const pusherConfig = getConfig('pusher');

    if (!pusherConfig) {
        return false;
    }

    try {
        return new Echo({
            Pusher,
            broadcaster: "pusher",
            key: pusherConfig?.app_key,
            wsHost: pusherConfig?.host ?? window.location.hostname,
            wsPort: pusherConfig?.port ?? 6001,
            forceTLS: pusherConfig?.scheme === "https",
            disableStats: true,
            authEndpoint: pusherConfig?.auth_endpoint ?? "/broadcasting/auth",
            auth: {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`,
                },
            },
            cluster: pusherConfig?.cluster,
        });
    } catch (Err) {
        return false;
    }
};

export default useSocket;
