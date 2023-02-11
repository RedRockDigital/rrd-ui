import React from "react";
import PropTypes from "prop-types";
import { Link as LinkRRD } from "react-router-dom";

import { useConfig } from "@/Hooks";

const Link = ({ to, children }) => {
    const { getConfig } = useConfig();

    return (
        <LinkRRD
            className={getConfig("theme.link.default", "transition duration text-indigo-600 hover:text-indigo-500")}
            to={to}
        >
            {children}
        </LinkRRD>
    );
};

Link.propTypes = {
    to: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Link;
