import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const ConfigContext = createContext({});

export const ConfigProvider = ({ children, config: initialConfig = {} }) => {
    const [config, setConfig] = useState(initialConfig);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

ConfigProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    config: PropTypes.object,
};

export default ConfigContext;
