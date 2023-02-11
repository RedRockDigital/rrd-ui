import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import CloseButton from "./CloseButton";

import { useConfig } from "@/Hooks";

const Base = ({ title, body, icon, colour = "text-red-400", closeButton }) => {
    const { getConfig } = useConfig();

    return (
        <div className={getConfig("theme.toastrBase.container", "p-4 flex items-start")}>
            <div className={`${getConfig("theme.toastrBase.iconContainer", "flex-shrink-0")}} ${colour}`}>
                <FontAwesomeIcon icon={icon} size="lg" color=""/>
            </div>
            <div className={getConfig("theme.toastrBase.textContainer", "ml-3 w-0 flex-1 pt-0.5")}>
                <p className={getConfig("theme.toastrBase.titleText", "text-sm leading-5 font-medium text-gray-900")}>
                    {title}
                </p>
                <p className={getConfig("theme.toastrBase.bodyText", "mt-1 text-sm leading-5")}>{body}</p>
            </div>
            <div className={getConfig("theme.toastBase.closeButtonContainer", "ml-4 flex-shrink-0 flex")}>
                <CloseButton
                    closeButton={closeButton}
                />
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
