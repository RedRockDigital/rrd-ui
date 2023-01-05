import React from "react";
import PropTypes from "prop-types";

import BaseButton from "./BaseButton";

/**
 * @function MutedButton
 * @param {function} onClick
 * @param {string} className
 * @param {JSX.Element} children
 * @param {boolean} working
 * @param {boolean} disabled
 * @param {string} [type]
 * @return {JSX.Element}
 * @constructor
 */
const MutedButton = ({ onClick, className, children, working, disabled, type }) => {
    const classes = `
        bg-white text-gray-600 rounded-md border border-transparent shadow-sm py-2 px-4
        inline-flex justify-center items-center text-sm font-medium
        ${
            !disabled && !working
                ? "hover:bg-gray-100 focus:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                : "opacity-50"
        }
        ${className}
    `;

    return (
        <BaseButton
            className={classes}
            type={type ?? (onClick !== undefined ? "button" : "submit")}
            onClick={onClick}
            disabled={disabled}
            working={working}
        >
            {children}
        </BaseButton>
    );
};

MutedButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    working: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
};

export default MutedButton;
