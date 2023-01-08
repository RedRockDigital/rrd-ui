/* global context, dispatch */
import * as Sentry from "@sentry/react";
import PropTypes from "prop-types";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";

const Server = ({ config }) => {
    return (
        <Sentry.ErrorBoundary>
            <StaticRouter location={context.url}>
                <App config={config}/>
            </StaticRouter>
        </Sentry.ErrorBoundary>
    );
};

Server.propTypes = {
    config: PropTypes.object,
};

if (import.meta.env.VITE_SENTRY_LARAVEL_DSN) {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_LARAVEL_DSN,
        integrations: [],
        beforeSend (event, hint) {
            // Check if it is an exception, and if so, show the report dialog
            if (event.exception) {
                Sentry.showReportDialog({ eventId: event.event_id });
            }

            return event;
        },
    });
}

export default Server;
