import { useState, useEffect, useCallback } from "react";
import isEmpty from "lodash/isEmpty";

// import lang from "@/Config/lang";

const lang = {};

const useLanguage = () => {
    const [language, setLanguage] = useState(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (!language) {
            let selectedLanguage = localStorage.getItem("_language");

            if (!selectedLanguage) {
                selectedLanguage = window.navigator.language;
            }

            const config = getLanguageConfig(selectedLanguage);

            setLanguage(config);
            loadContent(config);
        }
    }, [language]);

    const handleChangeLanguage = (languageCode) => {
        if (!languagesSupported()?.find(l => l.code === languageCode)) {
            return console.error(`Unsupported language chosen "${languageCode}"`);
        }

        localStorage.setItem("_language", languageCode);

        window.location.reload();
    };

    const getLanguageConfig = (languageCode) => {
        const languageConfig = languagesSupported().find(l => l.code === languageCode);

        if (!languageConfig) {
            console.error(`Unsupported language chosen "${languageCode}"`);
            return null;
        }

        return languageConfig;
    };

    const languagesSupported = () => lang;

    const loadContent = async (config) => {
        const request = await import(`../Language/${config?.fileName}.js` /* @vite-ignore */);

        if (request?.default) {
            setContent(request.default);
        }
    };

    const currentLanguage = () => language;

    const c = useCallback((key, replaceValues = {}) => {
        if (!key) {
            if (import.meta.env.VITE_APP_ENV === "local") {
                console.warn(`Supplier key: "${key}" is undefined. This message will be removed in production`);
            }
            return;
        }

        if (!content) {
            return "";
        }

        let contentString = key;

        do {
            contentString = content[contentString];
        } while (content[contentString] !== undefined);

        if (contentString === undefined) {
            if (import.meta.env.VITE_APP_ENV === "local") {
                console.warn(`Supplied key: "${key}" does not exist. This message will be removed in production`);
            }

            contentString = key;
        }

        if (!isEmpty(replaceValues)) {
            Object.keys(replaceValues).forEach((placeholder) => {
                contentString = contentString.replace(`:${placeholder}`, replaceValues[placeholder]);
            });
        }

        return contentString;
    }, [content]);

    return {
        c,
        handleChangeLanguage,
        languagesSupported,
        currentLanguage,
    };
};

export default useLanguage;
