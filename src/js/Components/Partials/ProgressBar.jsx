import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ size = "medium", bgColor = "bg-gray-200", railColor = "bg-blue-600", className, progress, hideLabel = false }) => {
    let heightClass;

    switch (size) {
        case "small":
            heightClass = "h-2";
            hideLabel = true;
            break;
        case "medium":
            heightClass = "h-4";
            break;
        case "large":
            heightClass = "h-6";
            break;
    }

    if (progress === 0) {
        return null;
    }

    return (
        <div className={`w-full ${bgColor} rounded-full ${heightClass} ${className}`}>
            <div
                className={`${railColor} ${heightClass} rounded-full text-xs font-medium text-white text-center p-0.5 leading-none`}
                style={{
                    width: `${progress}%`,
                }}
            >
                {!hideLabel && (
                    <>
                        {progress}%
                    </>
                )}
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    size: PropTypes.string,
    bgColor: PropTypes.string,
    railColor: PropTypes.string,
    className: PropTypes.string,
    progress: PropTypes.number,
    hideLabel: PropTypes.bool,
};

export default ProgressBar;
