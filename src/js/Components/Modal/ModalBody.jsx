import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

/**
 * @function ModalBody
 * @param {JSX.Element} children
 * @param {string} className
 * @return {JSX.Element}
 * @constructor
 */
const ModalBody = ({ children, className }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.modalBody.default", "px-4 py-5 sm:p-6 flex-1")} ${className}`}>
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
