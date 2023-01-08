import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "@/Hooks/useAuth";

const Auth = ({ children }) => {
    const location = useLocation();
    const { auth } = useAuth();

    if (!auth.accessToken) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: location,
                }}
                replace
            />
        );
    }

    return children;
};

Auth.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Auth;
