import { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";

import { useUser } from "@/Hooks";

const NoAccess = ({ scope, children }) => {
    const { user, hasScope } = useUser();

    const [cantAccess, setCantAccess] = useState(false);

    useEffect(() => {
        if (!isEmpty(user)) {
            if (!hasScope(scope)) {
                setCantAccess(true);
            }
        }
    }, [user, setCantAccess]);

    return cantAccess ? children : null;
};

NoAccess.propTypes = {
    scope: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default NoAccess;
