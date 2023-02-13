import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

/**
 * @function Modal
 * @param {JSX.Element} children
 * @param {string} className
 * @param {string} size
 * @param {string} position
 * @return {JSX.Element}
 * @constructor
 */
const Modal = ({ children, className, size, position = "center" }) => {
    const { getConfig } = useConfig();

    let containerClassName = null;

    switch (position) {
        case "center":
            containerClassName = "items-center justify-center";
            break;
        case "right":
            containerClassName = "items-center justify-end";
            break;
        case "left":
            containerClassName = "items-center justify-start";
            break;
    }

    return (
        <div className={`${getConfig("theme.modal.container", "modal fixed w-full h-full top-0 left-0 flex z-50")} ${containerClassName}`}>
            <div className={getConfig("theme.modal.overlay",  "modal-overlay absolute w-full h-full bg-gray-900 opacity-50")} />

            <div
                className={`
                    ${getConfig("theme.modal.default", "modal-container bg-white w-full flex flex-col max-h-full overflow-y-scroll shadow-lg z-50 overflow-y-visible rounded")}
                    ${className} ${size ?? "max-w-screen-sm"}
                `}
            >
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    position: PropTypes.oneOf(["center", "right", "left"]),
    size: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Modal;
