import React, { useEffect } from "react";
import * as Fathom from "fathom-client";
import PropTypes from "prop-types";
import { Routes, Route, useLocation } from "react-router-dom";

const Router = ({ routes, defaultRoute }) => {
    return (
        <ScrollToTop>
            <AnalyticsWrapper>
                <Routes>
                    {routes.map((route, key) => (
                        <Route
                            key={key}
                            path={route.path}
                            element={
                                <RenderRouteThroughGuard
                                    guards={route.guards ?? []}
                                    key={key}
                                >
                                    <route.component />
                                </RenderRouteThroughGuard>
                            }
                        />
                    ))}

                    <Route
                        path="*"
                        element={defaultRoute}
                    />
                </Routes>
            </AnalyticsWrapper>
        </ScrollToTop>
    );
};

Router.propTypes = {
    guards: PropTypes.array,
    array: PropTypes.array,
    defaultRoute: PropTypes.node,
};

const ScrollToTop = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return children;
};

ScrollToTop.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

const AnalyticsWrapper = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        if (import.meta.env.VITE_FATHOM_ANALYTICS && import.meta.env.VITE_APP_ENV === "production") {
            Fathom.load(import.meta.env.VITE_FATHOM_ANALYTICS);
        }
    }, []);

    useEffect(() => {
        if (import.meta.env.VITE_FATHOM_ANALYTICS && import.meta.env.VITE_APP_ENV === "production") {
            Fathom.trackPageview();
        }
    }, [location]);

    return children;
};

AnalyticsWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

const RenderRouteThroughGuard = ({ children, guards: routeGuards, previousGuard = false }) => {
    if (routeGuards.length === 0) {
        return children;
    }

    let guard = null;

    if (previousGuard !== false) {
        const lastGuardIndex = routeGuards.indexOf(previousGuard);
        guard = routeGuards[lastGuardIndex + 1];
    } else {
        guard = routeGuards[0];
    }

    const guardParts = guard.split(":"); // 0 is the guard, 1 is comma separated parameters
    const guardToCall = guardParts[0];
    const guardParameters = guardParts[1] ? guardParts[1].split(",") : [];

    const Component = guards[guardToCall];
    const hasMoreGuards = routeGuards.length > (routeGuards.indexOf(guard) + 1);

    return (
        <Component
            parameters={guardParameters}
        >
            {hasMoreGuards
                ? (
                        <RenderRouteThroughGuard guards={routeGuards} previousGuard={guardToCall}>
                            {children}
                        </RenderRouteThroughGuard>
                    )
                : children}
        </Component>
    );
};

RenderRouteThroughGuard.propTypes = {
    guards: PropTypes.array,
    previousGuard: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.bool,
    ]),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Router;
