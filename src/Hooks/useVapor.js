import Vapor from "laravel-vapor";

import useAuth from "@/Hooks/useAuth";

const useVapor = () => {
    const { auth } = useAuth();

    Vapor.withBaseAssetUrl(import.meta.env.VITE_VAPOR_ASSET_URL);

    const upload = (file, onProgress) => Vapor.store(file, {
        signedStorageUrl: `${import.meta.env.VITE_API_BASE_URL}/upload`,
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
