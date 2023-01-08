import { useFeatureFlags } from "@/Hooks";
import PropTypes from "prop-types";

const FeatureEnabled = ({ feature, children }) => {
    const { featureFlagEnabled } = useFeatureFlags();

    if (!featureFlagEnabled(feature)) {
        return null;
    }

    return children;
};

FeatureEnabled.propTypes = {
    feature: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default FeatureEnabled;
