import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

/**
 * @function CardFooter
 * @param {JSX.Element} children
 * @param {string} className
 * @return {JSX.Element}
 * @constructor
 */
const CardFooter = ({ children, className }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.cardFooter.default", "px-4 py-5 border-t border-gray-200 bg-gray-100 bg-opacity-50")} ${className}`}>
            {children}
        </div>
    );
};

CardFooter.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
};

export default CardFooter;
