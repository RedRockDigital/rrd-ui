import React from "react";
import { useModal } from "@/Hooks";

const Container = () => {
    const { modal, setModal } = useModal();

    const handleClose = () => setModal(null);

    if (!modal) {
        return null;
    }

    return (
        <modal.component
            {...modal.props}
            onClose={handleClose}
        />
    );
};

export default Container;
