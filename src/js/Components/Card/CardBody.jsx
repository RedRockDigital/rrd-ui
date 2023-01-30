import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

/**
 * @function CardBody
 * @param {JSX.Element} children
 * @param {string} className
 * @return {JSX.Element}
 * @constructor
 */
const CardBody = ({ children, className }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.cardBody.default") ?? "px-4 py-5 sm:p-6"} ${className}`}>
            {children}
        </div>
    );
};

CardBody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
};

export default CardBody;
