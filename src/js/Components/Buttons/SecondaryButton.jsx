import React from "react";
import PropTypes from "prop-types";

import BaseButton from "./BaseButton";

/**
 * @function SecondaryButton
 * @param {function} onClick
 * @param {string} className
 * @param {JSX.Element} children
 * @param {boolean} working
 * @param {boolean} disabled
 * @param {string} [type]
 * @return {JSX.Element}
 * @constructor
 */
const SecondaryButton = ({ onClick, className, children, working, disabled, type }) => {
    const classes = `
        inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm
        ${
            !disabled && !working
                ? "hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 hover:scale-105"
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

SecondaryButton.propTypes = {
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

export default SecondaryButton;
