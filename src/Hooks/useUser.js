import { useContext } from "react";

import UserContext from "@/Context/UserProvider";

import useRequest from "./useRequest";
import useAuth from "./useAuth";

const useUser = () => {
    const { auth } = useAuth();
    const { get } = useRequest();
    const { user, setUser } = useContext(UserContext);

    /**
     * @function loadUser
     * @return {Promise<*>}
     */
    const loadUser = async () => {
        if (!auth?.accessToken) {
            return;
        }

        const request = await get("/me");

        if (request.success) {
            return setUser(request.data?.data ?? {});
        }
    };

    /**
     * @method hasScope
     * @param scopes
     * @return {boolean}
     */
    const hasScope = (scopes) => {
        // If no scopes then return false.
        if (!user.scopes || user.scopes.length === 0) {
            return false;
        }

        // Convert string scope to an array.
        scopes = typeof scopes === "string" ? [scopes] : scopes;

        // If scope match then return true.
        if (scopes.filter(scope => user.scopes.includes(scope)).length > 0) {
            return true;
        }

        // Check for scope-prefix match.
        for (const scope of scopes) {
            for (const scope2 of user.scopes) {
                if (scope2.indexOf(".*") !== -1) {
                    const prefix = scope.split(".")[0];
                    const prefix2 = scope2.split(".")[0];

                    if (prefix === prefix2) {
                        return true;
                    }
                }
            }
        }

        // No scope match so return false.
        return false;
    };

    /**
     * @method resetUser
     */
    const resetUser = () => setUser({});

    return {
        loadUser,
        resetUser,
        hasScope,
        user,
    };
};

export default useUser;
