import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null);

    return (
        <ModalContext.Provider value={{ modal, setModal }}>
            {children}
        </ModalContext.Provider>
    );
};

ModalProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default ModalContext;
