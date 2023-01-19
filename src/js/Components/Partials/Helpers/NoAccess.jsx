import { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";

import { useUser } from "@/Hooks";

const HasAccess = ({ scope, children, handleNoAccess }) => {
    const { user, hasScope } = useUser();

    const [cantAccess, setCantAccess] = useState(false);

    useEffect(() => {
        if (!isEmpty(user)) {
            if (!hasScope(scope)) {
                setCantAccess(true);
            } else if (handleNoAccess) {
                handleNoAccess();
            }
        }
    }, [user, setCantAccess]);

    return cantAccess ? children : null;
};

HasAccess.propTypes = {
    scope: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    handleNoAccess: PropTypes.func,
};

export default HasAccess;
