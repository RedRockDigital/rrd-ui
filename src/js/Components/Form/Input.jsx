import React from "react";
import PropTypes from "prop-types";

import { RawInput, FieldContainer } from "./index";

import { useConfig } from "@/Hooks";

/**
 * @function Input
 * @param {string} containerClassName
 * @param {string} className
 * @param {string} type
 * @param {string} label
 * @param {string} id
 * @param {function} onChange
 * @param {?string} error
 * @return {JSX.Element}
 */
const Input = React.forwardRef(({
    containerClassName,
    className,
    type = "text",
    label,
    id,
    onChange,
    error = null,
    ...rest
}, ref) => {
    const { getConfig } = useConfig();

    const classes = `
        ${getConfig("theme.input.default", "focus:ring-app-primary-focus focus:border-app-primary-focus block w-full border shadow-sm py-2 px-3 focus:outline-none sm:text-sm rounded-md")}
        ${error ? "border-red-800" : "border-gray-300"}
        ${className}
    `;

    return (
        <FieldContainer
            containerClassName={containerClassName}
            label={label}
            id={id}
        >
            <RawInput
                ref={ref}
                type={type}
                id={id}
                onChange={onChange}
                className={classes}
                {...rest}
            />
        </FieldContainer>
    );
});

Input.propTypes = {
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

Input.displayName = "Input";

export default Input;
