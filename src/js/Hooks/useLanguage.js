import { useState, useEffect, useCallback } from "react";
import isEmpty from "lodash/isEmpty";

import useConfig from "@/Hooks/useConfig";

const useLanguage = () => {
    const { getConfig } = useConfig();
    const [language, setLanguage] = useState(null);
    const [content, setContent] = useState(null);

    const languages = getConfig("languages");
    const env = getConfig("env");

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
        if (!languages?.find(l => l.code === languageCode)) {
            return console.error(`Unsupported language chosen "${languageCode}"`);
        }

        localStorage.setItem("_language", languageCode);

        window.location.reload();
    };

    const getLanguageConfig = (languageCode) => {
        const languageConfig = languages?.find(l => l.code === languageCode);

        if (!languageConfig) {
            console.error(`Unsupported language chosen "${languageCode}"`);
            return null;
        }

        return languageConfig;
    };

    const loadContent = async (config) => {
        const request = await import(config?.fileName /* @vite-ignore */);

        if (request?.default) {
            setContent(request.default);
        }
    };

    const currentLanguage = () => language;

    const c = useCallback((key, replaceValues = {}) => {
        if (!key) {
            if (env === "local") {
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
            if (env === "local") {
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
        languages,
        handleChangeLanguage,
        currentLanguage,
    };
};

export default useLanguage;
