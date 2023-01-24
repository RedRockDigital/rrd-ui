import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

import { Card, CardBody } from "@/Components/Card";

const Complete = ({ title, message, withoutCard = false }) => {
    const inner = (
        <div className="text-center flex justify-center items-center flex-col">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <FontAwesomeIcon icon={faCheck} />
            </div>

            <h3 className="mt-3 text-lg font-medium leading-6 text-gray-900">
                {title}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                {message}
            </p>
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

Complete.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    withoutCard: PropTypes.bool,
};

export default Complete;
