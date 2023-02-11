import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useRefreshToken from "@/Hooks/useRefreshToken";
import useUser from "@/Hooks/useUser";
import useAuth from "@/Hooks/useAuth";
import useConfig from "@/Hooks/useConfig";

import { Loading } from "@/Components/Partials";

const Loader = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const { loadUser } = useUser();
    const { auth } = useAuth();
    const { getConfig } = useConfig();

    // attempt to hydrate the user
    useEffect(() => {
        const reloadToken = async () => {
            if (!auth?.accessToken) {
                try {
                    await refresh();
                } catch (err) {
                    console.error(err);
                    // unset the session to prevent unwanted loops
                    sessionStorage.removeItem("refresh_token");
                }

                setLoading(false);
            }
        };

        reloadToken();
        // eslint-disable-next-line
    }, [refresh, auth, setLoading]);

    useEffect(() => {
        const hydrateToken = async () => {
            if (auth?.accessToken) {
                await loadUser();

                setLoading(false);
            }
        };

        hydrateToken();

        // eslint-disable-next-line
    }, [auth, setLoading]);

    if (loading) {
        return (
            <div className={getConfig("theme.loader.default", "h-screen w-full flex items-center justify-center")}>
                <Loading />
            </div>
        );
    }

    return children;
};

Loader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Loader;
