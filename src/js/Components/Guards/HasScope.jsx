import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { HasAccess } from "@/Components/Partials/Helpers";

const HasScope = ({ children, scope }) => {
    const navigate = useNavigate();

    const handleNoAccess = () => navigate("/");

    return (
        <HasAccess
            scope={scope}
            handleNoAccess={handleNoAccess}
        >
            {children}
        </HasAccess>
    );
};

HasScope.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    scope: PropTypes.string,
};

export default HasScope;
