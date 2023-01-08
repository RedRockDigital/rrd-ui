import React from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle";
import PropTypes from "prop-types";

import Base from "./Base";

import { useLanguage } from "@/Hooks";

const ErrorToast = ({ title, body, closeToast }) => {
    const { c } = useLanguage();

    return (
        <Base
            icon={faTimesCircle}
            closeToast={closeToast}
            colour="text-red-400"
            title={title ?? c("default_error_title")}
            body={body ?? c("default_error_message")}
        />
    );
};

ErrorToast.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    closeToast: PropTypes.func,
};

export default ErrorToast;
