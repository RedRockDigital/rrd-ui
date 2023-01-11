import axios from "axios";

import useConfig from "@/Hooks/useConfig";

const Http = () => {
    const { getConfig } = useConfig();

    const apiRoute = getConfig('apiRoute');

    return axios.create({
        baseURL: apiRoute,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};

export default Http;
