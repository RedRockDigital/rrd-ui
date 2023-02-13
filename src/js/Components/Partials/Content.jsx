import React from "react";
import PropTypes from "prop-types";

import { useConfig } from "@/Hooks";

const Content = ({ className, children }) => {
    const { getConfig } = useConfig();

    return (
        <div className={`${getConfig("theme.content.default", "text-gray-500 text-md space-x-3")} ${className}`}>
            {children}
        </div>
    );
};

Content.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Content;
