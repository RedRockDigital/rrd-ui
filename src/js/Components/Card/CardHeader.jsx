import React from "react";
import PropTypes from "prop-types";

/**
 * @function CardHeader
 * @param {JSX.Element} children
 * @param {string} className
 * @param {string} headerClassName
 * @return {JSX.Element}
 * @constructor
 */
const CardHeader = ({ children, className, headerClassName }) => {
    return (
        <div className={`bg-white px-4 py-5 border-b border-gray-200 ${className}`}>
            <h3 className={`text-lg leading-6 font-medium text-gray-900 ${headerClassName}`}>
                {children}
            </h3>
        </div>
    );
};

CardHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
};

export default CardHeader;
