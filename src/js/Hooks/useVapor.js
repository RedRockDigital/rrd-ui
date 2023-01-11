import Vapor from "laravel-vapor";

import useAuth from "@/Hooks/useAuth";
import useConfig from "@/Hooks/useConfig";

const useVapor = () => {
    const { auth } = useAuth();
    const { getConfig } = useConfig();

    const assetUrl = getConfig("assetUrl");

    Vapor.withBaseAssetUrl(assetUrl);

    const upload = (file, onProgress) => Vapor.store(file, {
        signedStorageUrl: `${assetUrl}/upload`,
        progress: onProgress,
        headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
        },
    });

    return {
        asset: Vapor.asset,
        upload,
    };
};

export default useVapor;
