import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import FieldContainer from "./FieldContainer";

/**
 * @param {string} containerClassName
 * @param {string} label
 * @param {string} id
 * @param {string} className
 * @param {string} value
 * @param {string} name
 * @param {function} onChange
 * @param {*[]} rest
 * @return {JSX.Element}
 */
const DateTimePicker = ({
    containerClassName,
    label,
    id,
    className,
    value,
    name,
    onChange,
    ...rest
}) => {
    return (
        <FieldContainer
            containerClassName={containerClassName}
            label={label}
            id={id}
        >
            <DatePicker
                {...rest}
                selected={value}
                name={name}
                onChange={(value) => onChange({
                    type: "date-time",
                    name,
                    value,
                })}
                className={`w-full border border-gray-300 rounded-l-md shadow-sm ${className}`}
            />
        </FieldContainer>
    );
};

DateTimePicker.propTypes = {
    containerClassName: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.date,
    name: PropTypes.string,
    onChange: PropTypes.func,
};

export default DateTimePicker;
