import React from "react";
import PropTypes from "prop-types";

import BaseButton from "./BaseButton";

/**
 * @function PrimaryButton
 * @param {function} onClick
 * @param {string} className
 * @param {JSX.Element} children
 * @param {boolean} working
 * @param {boolean} disabled
 * @param {string} [type]
 * @return {JSX.Element}
 * @constructor
 */
const PrimaryButton = ({ onClick, className, children, working, disabled, type }) => {
    const classes = `
        bg-indigo-700 text-white rounded-md border border-transparent shadow-sm py-2 px-4
        inline-flex justify-center items-center text-sm font-medium
        ${
            !disabled && !working
                ? "hover:bg-indigo-800 focus:ring-light-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105"
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

PrimaryButton.propTypes = {
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

export default PrimaryButton;
