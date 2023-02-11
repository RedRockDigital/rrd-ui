import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

/**
 * @function Label
 * @param {string} label
 * @param {string} htmlFor
 * @param {string} className
 * @param {null|array} error
 * @return {JSX.Element}
 * @constructor
 */
const Label = ({ label, htmlFor, className, error = null }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.label.default", "flex flex-row items-center block text-sm font-medium leading-5")} ${error ? "text-red-800" : "text-gray-700"} ${className}`}>
            <label htmlFor={htmlFor}>
                {label}

                {error && (
                    <Fragment>
                        {` - ${error.join(" ")}`}
                    </Fragment>
                )}
            </label>
        </div>
    );
};

Label.propTypes = {
    label: PropTypes.string,
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.array,
};

export default Label;
