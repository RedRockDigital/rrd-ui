import React from "react";
import PropTypes from "prop-types";

const Content = ({ className, children }) => {
    return (
        <div className={`text-gray-500 text-md space-x-3 ${className}`}>
            {children}
        </div>
    );
};

Content.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Content;
