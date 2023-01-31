import React from "react";
import PropTypes from "prop-types";

import BaseButton from "./BaseButton";

import { useConfig } from "@/Hooks";

/**
 * @function SecondaryButton
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
const SecondaryButton = ({ onClick, className, children, working, disabled, type, leftIcon, rightIcon }) => {
    const { getConfig } = useConfig();

    const classes = `
        ${getConfig("theme.secondaryButton.default") ?? "inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm"}
        ${
            !disabled && !working
                ? `${getConfig("theme.secondaryButton.hover") ?? "hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 hover:scale-105"}`
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
    leftIcon: PropTypes.any,
    rightIcon: PropTypes.any,
};

export default SecondaryButton;
