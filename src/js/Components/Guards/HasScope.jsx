import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { HasAccess } from "@/Components/Partials/Helpers";

const HasScope = ({ children, parameters }) => {
    const navigate = useNavigate();

    const handleNoAccess = () => navigate("/");

    return (
        <HasAccess
            scope={parameters[0]}
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
    parameters: PropTypes.array,
};

export default HasScope;
