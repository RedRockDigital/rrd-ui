import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

import { useLanguage, useConfig } from "@/Hooks";

const LanguageSwitcher = () => {
    const { getConfig } = useConfig();
    const { currentLanguage, languagesSupported, handleChangeLanguage } = useLanguage();
    const menuRef = useRef();

    const [showLanguageSelector, setShowLanguageSelector] = useState(false);

    useEffect(() => {
        window.addEventListener("mousedown", handleDismissUserMenu);
        window.addEventListener("touchstart", handleDismissUserMenu);

        return () => {
            window.removeEventListener("touchstart", handleDismissUserMenu);
        };
    }, []);

    const handleDismissUserMenu = (event) => {
        if (!menuRef?.current || menuRef.current.contains(event.target)) {
            return;
        }

        setShowLanguageSelector(false);
    };

    const handleChange = async (config) => {
        await handleChangeLanguage(config?.code);

        setShowLanguageSelector(false);
    };

    return (
        <div className={getConfig("theme.languageSwitcher.container", "relative flex-shrink-0")}>
            <div>
                <button
                    onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                    type="button"
                    className={getConfig("theme.languageSwitcher.trigger", "flex items-center space-x-1 text-sm rounded-full text-white font-medium text-gray-500 hover:text-gray-900")}
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                >
                    <span>{currentLanguage()?.display}</span>

                    <FontAwesomeIcon icon={faChevronDown} />
                </button>
            </div>

            {showLanguageSelector && (
                <div
                    ref={menuRef}
                    className={getConfig("theme.languageSwitcher.dropdownContainer", "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none")}
                    tabIndex="-1"
                >
                    {languagesSupported()?.map((language, key) => (
                        <div
                            key={key}
                            className={getConfig("theme.languageSwitcher.dropdownItem", "block px-4 py-2 text-sm text-gray-700 cursor-pointer")}
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => handleChange(language)}
                        >
                            {language?.display}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
