import { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/Hooks";

const TwoFactor = ({ children }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEmpty(user) && user?.two_factor_enabled && !user?.two_factor_verified) {
            navigate("/login/challenge");
        }
    }, [user]);

    return children;
};

export default TwoFactor;
