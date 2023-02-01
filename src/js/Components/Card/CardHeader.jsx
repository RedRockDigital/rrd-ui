import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

/**
 * @function CardHeader
 * @param {JSX.Element} children
 * @param {string} className
 * @param {string} headerClassName
 * @return {JSX.Element}
 * @constructor
 */
const CardHeader = ({ children, className }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.cardHeader.default") ?? "bg-white px-4 py-5 border-b border-gray-200 text-lg leading-6 font-medium text-gray-900"} ${className}`}>
            {children}
        </div>
    );
};

CardHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
};

export default CardHeader;
