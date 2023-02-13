import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

import Label from "./Label";

import { useConfig } from "@/Hooks";

/**
 * @function Toggle
 * @param {*} value
 * @param {string} label
 * @param {string} containerClassName
 * @param {string} id
 * @param {boolean} disabled
 * @param {function} onChange
 * @param {string} labelPlacement
 * @param {null|array} error
 * @param {string} name
 * @return {JSX.Element}
 * @constructor
 */
const Toggle = ({
    value,
    label,
    containerClassName,
    id,
    disabled,
    onChange,
    labelPlacement = "left",
    error = null,
    name,
}) => {
    const { getConfig } = useConfig();

    const container = `
        ${getConfig("theme.toggle.container", "relative inline-block flex-shrink-0 h-6 w-11 rounded-full border-2 border-transparent cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline")}
        ${value ? "bg-indigo-600" : "bg-gray-200"}
        ${!value ? " opacity-50" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

    const innerContainer = `
        ${getConfig("theme.toggle.innerContainer", "translate-x-0 relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200")}
        ${value ? "translate-x-5" : "translate-x-0"}
    `;

    const unchecked = `
        ${getConfig("theme.toggle.unchecked", "ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity")}
        ${value ? "opacity-0" : "opacity-100"}
    `;

    const checked = `
        ${getConfig("theme.toggle.checked", "ease-out duration-100 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity")}
        ${!value ? "opacity-0" : "opacity-100"}
    `;

    return (
        <div
            className={`
                ${containerClassName}
                ${labelPlacement !== "top" ? "flex items-center" : ""}
                ${onChange && !disabled ? "cursor-pointer" : ""}`
            }
            onClick={() => {
                if (!disabled && onChange) {
                    onChange({
                        type: "toggle",
                        value: !value,
                        name,
                    });
                }
            }}
        >
            {(labelPlacement === "left" || labelPlacement === "top") && label && (
                <React.Fragment>
                    <Label
                        label={label}
                        htmlFor={id}
                        className={`${labelPlacement === "left" ? "mb-0 mr-4" : "mb-1"}`}
                        error={error}
                    />
                </React.Fragment>
            )}

            <span
                role="checkbox"
                tabIndex="0"
                aria-checked="false"
                className={container}
            >
                <span className={innerContainer}>
                    <span className={unchecked}>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="h-3 w-3 text-gray-400"
                        />
                    </span>
                    <span className={checked}>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="h-3 w-3 text-gray-400"
                        />
                    </span>
                </span>
            </span>

            {(labelPlacement === "right") && label && (
                <Label
                    label={label}
                    htmlFor={id}
                    className="mb-0 ml-4"
                    error={error}
                />
            )}
        </div>
    );
};

Toggle.propTypes = {
    value: PropTypes.bool,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    labelPlacement: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default Toggle;
