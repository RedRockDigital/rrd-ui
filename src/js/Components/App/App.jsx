import React from "react";
import { ToastContainer } from "react-toastify";

import { Loader } from "@/Components/Partials";
import { Router } from "@/Components/Router";
import { ModalContainer } from "@/Components/Modal";
import { AuthProvider, UserProvider, ModalProvider } from "@/Context";

const App = () => {
    return (
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
    );
};

export default App;
