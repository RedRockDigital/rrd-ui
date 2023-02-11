import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLanguage, useConfig } from "@/Hooks";

const AsideNav = ({ nav }) => {
    const { c } = useLanguage();
    const { getConfig } = useConfig();

    return (
        <aside className={getConfig("theme.asideNav.container", "py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0")}>
            <nav className={getConfig("theme.asideNav.nav", "space-y-1")}>
                {nav.map((item) => (
                    <NavLink
                        end
                        key={item.name_ref}
                        to={item.href}
                        className={({ isActive }) =>
                            `${getConfig("theme.asideNav.navLink.default", "group rounded-md px-3 py-2 flex items-center text-sm font-medium")}
                                ${isActive
                                    ? getConfig("theme.asideNav.navLink.active", "bg-gray-50 text-indigo-800 hover:bg-white")
                                    : getConfig("theme.asideNav.navLink.initial", "text-gray-900 hover:text-gray-900 hover:bg-gray-50")}`
                        }
                    >
                        <FontAwesomeIcon
                            icon={item.icon}
                            className={getConfig("theme.asideNav.navLink.icon", "text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6")}
                        />
                        <span className="truncate">{c(item.name_ref)}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

AsideNav.propTypes = {
    nav: PropTypes.array,
};

export default AsideNav;
