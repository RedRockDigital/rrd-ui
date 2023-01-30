import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

import { useConfig } from "@/Hooks";

/**
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ModalHeader = ({ children, onClose }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.modalHeader.default") ?? "px-4 py-5 sm:p-6 border-b border-gray-50 flex justify-between"}`}>
            <h3 className={`${getConfig("theme.modalHeader.title") ?? "text-lg leading-6 font-medium text-gray-900"}`}>
                {children}
            </h3>
            {onClose && (
                <button onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            )}
        </div>
    );
};

ModalHeader.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default ModalHeader;
