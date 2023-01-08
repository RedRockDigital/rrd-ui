import React from "react";
import PropTypes from "prop-types";

import { FieldContainer } from "./index";

/**
 * @function Input
 * @param {string} containerClassName
 * @param {string} className
 * @param {number} rows
 * @param {string} label
 * @param {string} id
 * @param {function} onChange
 * @param {?string} value
 * @param {?string} error
 * @return {JSX.Element}
 */
const Input = React.forwardRef(({
    containerClassName,
    className,
    rows = 5,
    label,
    id,
    onChange,
    value,
    error = null,
    ...rest
}, ref) => {
    const classes = `
        focus:ring-app-primary-focus focus:border-app-primary-focus block w-full border shadow-sm py-2 px-3 focus:outline-none sm:text-sm
        rounded-md
        ${error ? "border-red-800" : "border-gray-300"}
        ${className}
    `;

    return (
        <FieldContainer
            containerClassName={containerClassName}
            label={label}
            id={id}
        >
            <textarea
                rows={rows}
                ref={ref}
                id={id}
                onChange={onChange}
                className={classes}
                {...rest}
            >
                {value ?? ""}
            </textarea>
        </FieldContainer>
    );
});

Input.propTypes = {
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    rows: PropTypes.number,
    label: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    error: PropTypes.string,
};

Input.displayName = "Input";

export default Input;
