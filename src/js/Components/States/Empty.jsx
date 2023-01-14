import React from "react";
import PropTypes from "prop-types";

import { Card, CardBody } from "@/Components/Card";

const Empty = ({ title, message, children }) => {
    return (
        <Card>
            <CardBody className="text-center">
                <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>

                <p className="mt-1 text-sm text-gray-500">{message}</p>

                {children && (
                    <div className="mt-6">
                        {children}
                    </div>
                )}
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
};

export default Empty;
