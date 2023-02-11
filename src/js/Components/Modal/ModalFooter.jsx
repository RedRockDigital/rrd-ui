import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

/**
 * @function ModalFooter
 * @param {JSX.Element} children
 * @param {string} className
 * @return {JSX.Element}
 * @constructor
 */
const ModalFooter = ({ children, className }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.modalFooter.default", "bg-gray-200 bg-opacity-50 px-4 py-3 sm:px-6")} ${className}`}>
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
