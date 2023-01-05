import React from "react";
import PropTypes from "prop-types";

const Container = ({ children, sizeClassName, className }) => {
    return (
        <div className={`mx-auto w-full ${sizeClassName ?? "max-w-7xl"} px-3 md:px-0 ${className}`}>
            {children}
        </div>
    );
};

Container.propTypes = {
    sizeClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Container;
