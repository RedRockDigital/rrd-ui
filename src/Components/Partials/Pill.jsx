import React from "react";
import PropTypes from "prop-types";

const Pill = ({ label, type = "success", className }) => {
    switch (type) {
        case "success":
            className = `${className} bg-green-100 text-green-800`;
            break;
        case "danger":
            className = `${className} bg-red-100 text-red-800`;
            break;
    }

    return (
        <span
            className={`
                inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0 ${className}
            `}
        >
            {label}
        </span>
    );
};

Pill.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "danger"]),
    className: PropTypes.string,
};

export default Pill;
