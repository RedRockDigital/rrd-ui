import Echo from "laravel-echo";
import Pusher from "pusher-js";

import useAuth from "@/Hooks/useAuth";

const useSocket = () => {
    const { auth } = useAuth();

    return new Echo({
        Pusher,
        broadcaster: "pusher",
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        wsHost: import.meta.env.VITE_PUSHER_HOST ?? window.location.hostname,
        wsPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
        forceTLS: import.meta.env.MIX_PUSHER_SCHEME === "https",
        disableStats: true,
        authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
        auth: {
            headers: {
                Authorization: `Bearer ${auth?.accessToken}`,
            },
        },
    });
};

export default useSocket;
