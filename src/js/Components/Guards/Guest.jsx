import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import useAuth from "@/Hooks/useAuth";

const Guest = ({ children }) => {
    const { auth } = useAuth();

    if (auth.accessToken) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
};

Guest.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Guest;
