import React from "react";
import PropTypes from "prop-types";

import Label from "./Label";

const FieldContainer = ({ children, label, containerClassName, id }) => {
    return (
        <div className={`space-y-1 ${containerClassName}`}>
            {label && (<Label label={label} htmlFor={id} />)}
            {children}
        </div>
    );
};

FieldContainer.propTypes = {
    children: PropTypes.element.isRequired,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    id: PropTypes.string,
};

export default FieldContainer;
