import React from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";

import { ModalContainer } from "@/Components/Modal";
import { AuthProvider, UserProvider, ModalProvider, ConfigProvider } from "@/Context";

const Test = ({ config, children }) => {
    return (
        <ConfigProvider config={config}>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <ModalProvider>
                            {children}

                            <ModalContainer />

                            <ToastContainer
                                hideProgressBar={true}
                                closeButton={false}
                            />
                        </ModalProvider>
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </ConfigProvider>
    );
};

Test.propTypes = {
    config: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Test;
