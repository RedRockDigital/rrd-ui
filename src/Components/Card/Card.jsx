import React from "react";
import PropTypes from "prop-types";

/**
 * @function Card
 * @param {JSX.Element} children
 * @param {string} className
 * @return {JSX.Element}
 * @constructor
 */
const Card = ({ children, className }) => {
    return (
        <div className={`bg-white overflow-hidden sm:shadow-lg w-full rounded-lg ${className}`}>
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
};

export default Card;
