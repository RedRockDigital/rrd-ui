import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

/**
 * @function BaseButton
 * @param {function} onClick
 * @param {string} className
 * @param {JSX.Element} children
 * @param {boolean} working
 * @param {boolean} disabled
 * @param {string} [type]
 * @return {JSX.Element}
 * @constructor
 */
const BaseButton = ({ onClick, className, children, working, disabled, type }) => {
    return (
        <button
            className={`${className} transition duration-200`}
            type={type ?? (onClick !== undefined ? "button" : "submit")}
            onClick={onClick}
            disabled={disabled || working}
        >
            {working && (
                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" />
            )}
            {children}
        </button>
    );
};

BaseButton.propTypes = {
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

export default BaseButton;
