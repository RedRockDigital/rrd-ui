import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons/faExclamation";

import { Card, CardBody } from "@/Components/Card";

import { useLanguage } from "@/Hooks";

const ErrorState = ({ title, message, children, withoutCard = false }) => {
    const { c } = useLanguage();

    const inner = (
        <div className="text-center flex justify-center items-center flex-col">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <FontAwesomeIcon icon={faExclamation} />
            </div>

            <h3 className="mt-3 text-lg font-medium leading-6 text-gray-900">
                {title ?? c("default_error_title")}
            </h3>

            <p className="mt-2 text-sm text-gray-500 text-center">
                {message ?? c("default_error_message")}
            </p>

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

ErrorState.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    withoutCard: PropTypes.bool,
};

export default ErrorState;
