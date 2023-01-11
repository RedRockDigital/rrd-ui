import * as Sentry from "@sentry/react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const Client = ({ config }) => {
    return (
        <Sentry.ErrorBoundary>
            <BrowserRouter>
                <App config={config}/>
            </BrowserRouter>
        </Sentry.ErrorBoundary>
    );
};

Client.propTypes = {
    config: PropTypes.object,
};

if (window.sentryDsn) {
    Sentry.init({
        dsn: window.sentryDsn,
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

export default Client;
