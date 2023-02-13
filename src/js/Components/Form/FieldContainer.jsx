import React from "react";
import PropTypes from "prop-types";

import Label from "./Label";

import { useConfig } from "@/Hooks";

const FieldContainer = ({ children, label, containerClassName, id }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.fieldContainer.default", "space-y-1")} ${containerClassName}`}>
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
