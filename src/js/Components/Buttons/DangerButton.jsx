import React from "react";
import PropTypes from "prop-types";

import BaseButton from "./BaseButton";

import { useConfig } from "@/Hooks";

/**
 * @function DangerButton
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
const DangerButton = ({ onClick, className, children, working, disabled, type, leftIcon, rightIcon }) => {
    const { getConfig } = useConfig();

    const classes = `
        ${getConfig("theme.dangerButton.default", "bg-rose-600 text-white rounded-md border border-transparent shadow-sm py-2 px-4 inline-flex justify-center items-center text-sm font-medium")}
        ${
            !disabled && !working
                ? `${getConfig("theme.dangerButton.hover", "hover:bg-rose-800 focus:ring-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105")}`
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

DangerButton.propTypes = {
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

export default DangerButton;
