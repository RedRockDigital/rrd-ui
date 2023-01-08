import { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useUser } from "@/Hooks";

const Onboarded = ({ children }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEmpty(user) && !user?.current_team?.has_onboarded) {
            navigate("/team/onboarding");
        }
    }, [user]);

    return children;
};

Onboarded.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Onboarded;
