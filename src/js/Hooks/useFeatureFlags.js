import { useState, useEffect } from "react";

import useUser from "@/Hooks/useUser";
import useConfig from "@/Hooks/useConfig";

const useFeatureFlags = () => {
    const { getConfig } = useConfig();
    const [features, setFeatures] = useState([]);
    const { user } = useUser();

    const envFeatures = getConfig("features");
    const featureFlagKeys = getConfig("featuresEnabled");

    useEffect(() => {
        if (!user || user?.current_team?.features !== undefined) {
            let features = envFeatures ?
                envFeatures
                    ?.split(",")
                    .filter(feature => featureFlagKeys.indexOf(feature) !== -1)
                : [];

            if (user?.current_team?.features) {
                features = features.concat(
                    user?.current_team?.features
                        .filter(feature => featureFlagKeys.indexOf(feature) !== -1)
                );
            }

            if (window?.location?.search) {
                const params = new URLSearchParams(window.location.search);

                for (const flag of featureFlagKeys) {
                    if (!params.has(flag)) {
                        continue;
                    }

                    features.push(flag);
                }
            }

            setFeatures(features);
        }
    }, [user]);

    const featureFlagEnabled = (feature) => features.indexOf(feature) !== -1;

    return {
        featureFlagEnabled,
        features,
    };
};

export default useFeatureFlags;
