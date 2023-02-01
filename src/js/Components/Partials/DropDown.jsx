import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";

import { useConfig } from "@/Hooks";

const DropDown = ({ children, icon }) => {
    const { getConfig } = useConfig();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const dropdownTriggerRef = useRef();

    useEffect(() => {
        window.addEventListener("mousedown", close);
        window.addEventListener("touchstart", close);

        return () => {
            window.removeEventListener("mousedown", close);
            window.removeEventListener("touchstart", close);
        };
    }, []);

    const close = (event) => {
        if (
            !dropdownRef?.current || dropdownRef.current.contains(event.target) ||
            dropdownTriggerRef.current.contains(event.target)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <div className="relative">
            <div
                ref={dropdownTriggerRef}
                className={getConfig("theme.dropDown.icon") ?? "text-gray-500 cursor-pointer"}
                onClick={() => setOpen(!open)}
            >
                <FontAwesomeIcon icon={icon ?? faEllipsisV} />
            </div>

            {open && (
                <div
                    ref={dropdownRef}
                    className={getConfig("theme.dropDown.container") ?? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}
                    role="menu"
                >
                    <div className="py-1">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

DropDown.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    icon: PropTypes.any,
};

export default DropDown;
