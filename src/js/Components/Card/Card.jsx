import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

/**
 * @function Card
 * @param {JSX.Element} children
 * @param {string} className
 * @parma {object} rest
 * @return {JSX.Element}
 * @constructor
 */
const Card = ({ children, className, ...rest }) => {
    const { getConfig } = useConfig();

    return (
        <div
            className={`${getConfig("theme.card.default", "bg-white overflow-hidden sm:shadow-lg w-full rounded-lg")} ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    rest: PropTypes.any,
};

export default Card;
