import React from "react";
import PropTypes from "prop-types";

import Label from "./Label";

/**
 * @function Radio
 * @param {string} labelPlacement
 * @param {string} containerClassName
 * @param {string} label
 * @param {string} id
 * @param {function} onChange
 * @param {*} value
 * @param {null|array} error
 * @param {string} selected
 * @param {string} name
 * @return {JSX.Element}
 * @constructor
 */
const Radio = ({
    labelPlacement = "left",
    containerClassName,
    label,
    id,
    onChange,
    value,
    error = null,
    selected,
    name,
}) => {
    return (
        <div className={`${containerClassName} flex items-center`}>
            {(labelPlacement === "left") && label && (
                <Label
                    label={label}
                    htmlFor={id}
                    className="mb-0 mr-2"
                    error={error}
                />
            )}

            <input
                type="radio"
                id={id}
                checked={selected === value}
                onChange={() => onChange({
                    type: "radio",
                    name,
                    value,
                })}
                className="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out border-gray-500 border hover:border-gray-600 focus:border-indigo-500"
            />

            {(labelPlacement === "right") && label && (
                <Label
                    label={label}
                    htmlFor={id}
                    className="mb-0 ml-2"
                    error={error}
                />
            )}
        </div>
    );
};

Radio.propTypes = {
    labelPlacement: PropTypes.string,
    containerClassName: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    error: PropTypes.string,
    selected: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
};

export default Radio;
