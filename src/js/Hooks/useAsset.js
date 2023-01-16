import useConfig from "./useConfig";

const useAsset = () => {
    const { getConfig } = useConfig();

    const getAsset = (path) => `${getConfig('assetUrl')}/${path}`;

    const getImage = (path) => getAsset(`images/${path}`);

    const getVideo = (path) => getAsset(`videos/${path}`);

    return {
        getAsset,
        getImage,
        getVideo,
    };
};

export default useAsset;
