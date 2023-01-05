import React from "react";
import PropTypes from "prop-types";

/**
 * @function ModalFooter
 * @param {JSX.Element} children
 * @param {string} className
 * @return {JSX.Element}
 * @constructor
 */
const ModalFooter = ({ children, className }) => {
    return (
        <div className={`bg-gray-200 bg-opacity-50 px-4 py-3 sm:px-6 ${className}`}>
            {children}
        </div>
    );
};

ModalFooter.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default ModalFooter;
