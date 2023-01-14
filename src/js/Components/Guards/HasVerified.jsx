import { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/Hooks";

const HasVerified = ({ children }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEmpty(user) && !user?.email_verified) {
            navigate("/verification");
        }
    }, [user]);

    return children;
};

export default HasVerified;
