import React from "react";
import PropTypes from "prop-types";

/**
 * @function CardFooter
 * @param {JSX.Element} children
 * @param {string} className
 * @return {JSX.Element}
 * @constructor
 */
const CardFooter = ({ children, className }) => {
    return (
        <div className={`px-4 py-5 border-t border-gray-200 bg-gray-100 bg-opacity-50 ${className}`}>
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
