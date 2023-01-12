import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

const Loading = ({ className, size = "5x" }) => {
    return (
        <div className={`flex justify-center align-center w-full py-10 ${className ?? ''}`}>
            <FontAwesomeIcon
                icon={faSpinner}
                spin
                size={size}
                className="fill-current"
            />
        </div>
    );
};

Loading.propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
};

export default Loading;
