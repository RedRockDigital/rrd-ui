import { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useUser } from "@/Hooks";

const PaymentFailed = ({ children }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEmpty(user) && user?.current_team?.payment_failed) {
            navigate("/team/billing/failed");
        }
    }, [user]);

    return children;
};

PaymentFailed.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default PaymentFailed;
