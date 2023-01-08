import React from "react";
import PropTypes from "prop-types";

import { useModal } from "@/Hooks";

const ModalTrigger = ({ onClick, className, children, component, props, disabled }) => {
    const { setModal } = useModal();

    const handleOpenModal = () => {
        if (onClick) {
            onClick();
        }

        return setModal({
            component,
            props,
        });
    };

    return (
        <div
            onClick={() => !disabled ? handleOpenModal() : false}
            className={`${className} ${disabled ? "cursor-default" : "cursor-pointer"}`}
        >
            {children}
        </div>
    );
};

ModalTrigger.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    component: PropTypes.func,
    props: PropTypes.object,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default ModalTrigger;
