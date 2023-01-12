import * as Sentry from "@sentry/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const Client = () => {
    return (
        <Sentry.ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Sentry.ErrorBoundary>
    );
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
