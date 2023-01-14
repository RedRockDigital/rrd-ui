import React, { useEffect } from "react";
import * as Fathom from "fathom-client";
import PropTypes from "prop-types";
import { Routes, Route, useLocation } from "react-router-dom";

import { useConfig } from "@/Hooks";

const Router = () => {
    const { getConfig } = useConfig();

    const routes = getConfig("routes");
    const defaultRoute = getConfig("defaultRoute");

    return (
        <ScrollToTop>
            <AnalyticsWrapper>
                <Routes>
                    {routes
                        .filter(route => route.component)
                        .map((route, key) => (
                            <Route
                                key={key}
                                path={route.path}
                                element={
                                    <RenderRouteThroughGuard guards={route.guards}>
                                        <route.component />
                                    </RenderRouteThroughGuard>
                                }
                            />
                        ))}

                    {defaultRoute && (
                        <Route
                            path="*"
                            element={defaultRoute}
                        />
                    )}
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

    return (
        <>
            {children}
        </>
    );
};

ScrollToTop.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

const AnalyticsWrapper = ({ children }) => {
    const location = useLocation();
    const { getConfig } = useConfig();

    const fathom = getConfig("fathomAnalytics");
    const env = getConfig("env");

    useEffect(() => {
        if (fathom && env === "production") {
            Fathom.load(fathom);
        }
    }, []);

    useEffect(() => {
        if (fathom && env === "production") {
            Fathom.trackPageview();
        }
    }, [location]);

    return (
        <>
            {children}
        </>
    );
};

AnalyticsWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

const RenderRouteThroughGuard = ({ children, guards: routeGuards, previousGuard = false }) => {
    if (!routeGuards || routeGuards?.length === 0) {
        return children;
    }

    let guard = null;

    if (previousGuard !== false) {
        const lastGuardIndex = routeGuards.indexOf(previousGuard);
        guard = routeGuards[lastGuardIndex + 1];
    } else {
        guard = routeGuards[0];
    }

    const Component = guard?.guard ?? guard;
    const hasMoreGuards = routeGuards.length > (routeGuards.indexOf(guard) + 1);

    return (
        <Component
            {...guard?.props}
        >
            {hasMoreGuards
                ? (
                        <RenderRouteThroughGuard guards={routeGuards} previousGuard={guard}>
                            {children}
                        </RenderRouteThroughGuard>
                    )
                : children}
        </Component>
    );
};

RenderRouteThroughGuard.propTypes = {
    guards: PropTypes.array,
    previousGuard: PropTypes.any,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Router;
