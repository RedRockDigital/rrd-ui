import React, { forwardRef, createRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";

const Alert = ({ type, message, errors }) => {
    const ref = createRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, message, errors]);

    switch (type) {
        case "success":
            return (
                <Success message={message} ref={ref} />
            );
        case "warning":
            return (
                <Warning message={message} ref={ref} />
            );
        case "error":
            return (
                <Error message={message} errors={errors} ref={ref} />
            );
        default:
            return null;
    }
};

Alert.propTypes = {
    type: PropTypes.oneOf(["success", "warning", "error"]),
    message: PropTypes.string,
    errors: PropTypes.object,
};

const Success = forwardRef(({ message }, ref) => {
    return (
        <div className="bg-white" ref={ref}>
            <div className="rounded-md bg-green-300 bg-opacity-25 p-4">
                <div className="flex">
                    <div className="flex-shrink-0 text-green-400">
                        <FontAwesomeIcon icon={faCheckCircle} size="lg" color=""/>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm leading-5 font-medium text-green-800">
                            {message}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
});
Success.displayName = "Success";

Success.propTypes = {
    message: PropTypes.string,
};

const Warning = forwardRef(({ message }, ref) => {
    return (
        <div className="bg-white" ref={ref}>
            <div className="bg-yellow-300 bg-opacity-25 p-4 rounded-md">
                <div className="flex">
                    <div className="flex-shrink-0 text-yellow-400">
                        <FontAwesomeIcon icon={faExclamationCircle} size="lg" color=""/>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm leading-5 font-medium text-yellow-800">
                            {message}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
});
Warning.displayName = "Warning";

Warning.propTypes = {
    message: PropTypes.string,
};

const Error = forwardRef(({ message, errors }, ref) => {
    return (
        <div className="bg-white" ref={ref}>
            <div
                className="bg-red-300 bg-opacity-25 p-4 rounded-md"
            >
                <div className="flex">
                    <div className="flex-shrink-0 text-red-400">
                        <FontAwesomeIcon icon={faTimesCircle} size="lg" color=""/>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm leading-5 font-medium text-red-800">
                            {message}
                        </h3>
                        {errors && (
                            <div className="mt-1 text-sm leading-5 text-red-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    {Object.entries(errors).map((error1, key1) => {
                                        return error1[1].map((error2, key2) => (
                                            <li key={`${key1}_${key2}`}>
                                                {error2}
                                            </li>
                                        ));
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
Error.displayName = "Error";

Error.propTypes = {
    message: PropTypes.string,
    errors: PropTypes.object,
};

export default Alert;
