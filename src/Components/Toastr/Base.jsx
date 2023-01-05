import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import CloseButton from "./CloseButton";

const Base = ({ title, body, icon, colour = "text-red-400", closeButton }) => {
    return (
        <div className="p-4">
            <div className="flex items-start">
                <div className={`flex-shrink-0 ${colour}`}>
                    <FontAwesomeIcon icon={icon} size="lg" color=""/>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm leading-5 font-medium text-gray-900">
                        {title}
                    </p>
                    <p className="mt-1 text-sm leading-5">{body}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <CloseButton
                        closeButton={closeButton}
                    />
                </div>
            </div>
        </div>
    );
};

Base.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    icon: PropTypes.any,
    colour: PropTypes.string,
    closeButton: PropTypes.func,
};

export default Base;
