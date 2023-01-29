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
 * @param {string} type
 * @param {IconDefinition} leftIcon
 * @param {IconDefinition} rightIcon
 * @return {JSX.Element}
 * @constructor
 */
const MutedButton = ({ onClick, className, children, working, disabled, type, leftIcon, rightIcon }) => {
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
            leftIcon={leftIcon}
            rightIcon={rightIcon}
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
    leftIcon: PropTypes.any,
    rightIcon: PropTypes.any,
};

export default MutedButton;
