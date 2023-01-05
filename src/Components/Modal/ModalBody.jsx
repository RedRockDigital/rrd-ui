import React from "react";
import PropTypes from "prop-types";

/**
 * @function ModalBody
 * @param {JSX.Element} children
 * @param {string} className
 * @return {JSX.Element}
 * @constructor
 */
const ModalBody = ({ children, className }) => {
    return (
        <div className={`px-4 py-5 sm:p-6 ${className} flex-1`}>
            {children}
        </div>
    );
};

ModalBody.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default ModalBody;
