import React from "react";
import axios from "axios";

import useConfig from "./useConfig";

const useHttp = () => {
    const { getConfig } = useConfig();

    return axios.create({
        baseURL: getConfig('apiRoute'),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};

export default useHttp;
