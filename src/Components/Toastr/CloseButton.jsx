import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import PropTypes from "prop-types";

/**
 * @function CloseButton
 * @return {*}
 * @constructor
 */
const CloseButton = ({ closeToast }) => {
    return (
        <button
            className="inline-flex text-gray-400 focus:outline-none ease-in-out duration-150"
            onClick={closeToast}
        >
            <FontAwesomeIcon className="h-5 w-5" icon={faTimes} />
        </button>
    );
};

CloseButton.propTypes = {
    closeToast: PropTypes.func,
};

export default CloseButton;
