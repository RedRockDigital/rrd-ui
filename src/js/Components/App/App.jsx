import React from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";

import { Loader } from "@/Components/Partials";
import { Router } from "@/Components/Router"
import { ModalContainer } from "@/Components/Modal";
import { AuthProvider, UserProvider, ModalProvider, ConfigProvider } from "@/Context";

const App = ({ config }) => {
    return (
        <ConfigProvider config={config}>
            <AuthProvider>
                <UserProvider>
                    <ModalProvider>
                        <Loader>
                            <Router />
                        </Loader>

                        <ModalContainer />

                        <ToastContainer
                            hideProgressBar={true}
                            closeButton={false}
                        />
                    </ModalProvider>
                </UserProvider>
            </AuthProvider>
        </ConfigProvider>
    );
};

App.propTypes = {
    config: PropTypes.object,
};

export default App;
