import React from "react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import PropTypes from "prop-types";

import Base from "./Base";

import { useLanguage } from "@/Hooks";

const Warning = ({ title, body, closeToast }) => {
    const { c } = useLanguage();

    return (
        <Base
            icon={faExclamationCircle}
            closeToast={closeToast}
            colour="text-yellow-400"
            title={title ?? c("default_warning_title")}
            body={body ?? c("default_warning_message")}
        />
    );
};

Warning.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    closeToast: PropTypes.func,
};

export default Warning;
