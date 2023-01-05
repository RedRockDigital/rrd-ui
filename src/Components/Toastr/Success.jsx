import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import PropTypes from "prop-types";

import Base from "./Base";

import { useLanguage } from "@/Hooks";

const Success = ({ title, body, closeToast }) => {
    const { c } = useLanguage();

    return (
        <Base
            icon={faCheckCircle}
            closeToast={closeToast}
            colour="text-green-400"
            title={title ?? c("default_success_title")}
            body={body ?? c("default_success_message")}
        />
    );
};

Success.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    closeToast: PropTypes.func,
};

export default Success;
