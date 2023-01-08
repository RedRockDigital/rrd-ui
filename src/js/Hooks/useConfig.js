import { useContext } from "react";
import get from "lodash/get";

import ConfigContext from "@/Context/ConfigProvider";

const useConfig = () => {
    const { config, setConfig } = useContext(ConfigContext);

    const getConfig = (key, defaultValue = null) => get(config, key) ?? defaultValue;

    return {
        config,
        getConfig,
        setConfig,
    };
};

export default useConfig;
