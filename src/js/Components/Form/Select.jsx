import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

import { FieldContainer } from "./index";

const Select = ({
    menuPosition,
    isClearable,
    name,
    label,
    onChange,
    options,
    className,
    value,
    id,
    containerClassName,
}) => {
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        setSelectedValue(options?.find(v => v.value === value));
    }, [value, setSelectedValue]);

    return (
        <FieldContainer
            label={label}
            containerClassName={containerClassName}
            id={id}
        >
            <ReactSelect
                isClearable={isClearable}
                menuPosition={menuPosition ?? "fixed"}
                className={className}
                options={options}
                value={selectedValue}
                onChange={(option) => onChange({
                    type: "select",
                    name,
                    value: option?.value,
                })}
                name={name}
            />
        </FieldContainer>
    );
};

Select.propTypes = {
    menuPosition: PropTypes.string,
    isClearable: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    className: PropTypes.string,
    value: PropTypes.any,
    id: PropTypes.string,
    containerClassName: PropTypes.string,
};

export default Select;
