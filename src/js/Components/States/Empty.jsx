import React from "react";
import PropTypes from "prop-types";

import { Card, CardBody } from "@/Components/Card";

import { useConfig } from "@/Hooks";

const Empty = ({ title, message, children, withoutCard = false }) => {
    const { getConfig } = useConfig();

    const inner = (
        <div className={getConfig("theme.emptyState.container", "text-center flex justify-center items-center flex-col")}>
            <h3 className={getConfig("theme.emptyState.title", "mt-2 text-sm font-medium text-gray-900")}>{title}</h3>

            <p className={getConfig("theme.emptyState.message", "mt-1 text-sm text-gray-500")}>{message}</p>

            {children && (
                <div className="mt-6">
                    {children}
                </div>
            )}
        </div>
    );

    if (withoutCard) {
        return inner;
    }

    return (
        <Card>
            <CardBody>
                {inner}
            </CardBody>
        </Card>
    );
};

Empty.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    withoutCard: PropTypes.bool,
};

export default Empty;
