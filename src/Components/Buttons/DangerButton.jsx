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
        bg-rose-600 text-white rounded-md border border-transparent shadow-sm py-2 px-4
        inline-flex justify-center items-center text-sm font-medium
        ${
            !disabled && !working
                ? "hover:bg-rose-800 focus:ring-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105"
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
