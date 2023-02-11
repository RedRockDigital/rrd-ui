import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

const Container = ({ children, sizeClassName, className }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.container.default", "mx-auto w-full px-3 md:px-0")} ${sizeClassName ?? "max-w-7xl"} ${className}`}>
            {children}
        </div>
    );
};

Container.propTypes = {
    sizeClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Container;
