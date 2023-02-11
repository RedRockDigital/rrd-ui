import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

const Pill = ({ label, type = "success", className }) => {
    const { getConfig } = useConfig();

    switch (type) {
        case "success":
            className = `${className} ${getConfig("theme.pill.success", "bg-green-100 text-green-800")}`;
            break;
        case "warning":
            className = `${className} ${getConfig("theme.pill.warning", "bg-orange-100 text-orange-800")}`;
            break;
        case "danger":
            className = `${className} ${getConfig("theme.pill.danger", "bg-red-100 text-red-800")}`;
            break;
    }

    return (
        <span
            className={`${getConfig("theme.pill.default", "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0")} ${className}`}
        >
            {label}
        </span>
    );
};

Pill.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "warning", "danger"]),
    className: PropTypes.string,
};

export default Pill;
