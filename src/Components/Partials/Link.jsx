import React from "react";
import PropTypes from "prop-types";
import { Link as LinkRRD } from "react-router-dom";

const Link = ({ to, children }) => {
    return (
        <LinkRRD
            className="transition duration text-indigo-600 hover:text-indigo-500"
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
