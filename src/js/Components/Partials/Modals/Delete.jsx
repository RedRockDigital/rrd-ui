import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/Components/Modal";
import { PrimaryButton, DangerButton } from "@/Components/Buttons";
import { Alert } from "@/Components/Partials";

import { useRequest, useLanguage, useToast } from "@/Hooks";

const Delete = ({ onClose, handleRefresh, deleteRoute }) => {
    const [working, setWorking] = useState(false);
    const [alert, setAlert] = useState(null);
    const { del } = useRequest();
    const { c } = useLanguage();
    const { success } = useToast();

    const handleDelete = async () => {
        setWorking(true);
        setAlert(null);

        const request = await del(deleteRoute);

        if (request.success) {
            if (handleRefresh) {
                handleRefresh();
            }

            success();

            onClose();

            return;
        } else if (request.message && request.errors) {
            setAlert({
                message: request.message,
                errors: request.errors,
                type: "error",
            });
        }

        setWorking(false);
    };

    return (
        <Modal>
            <ModalHeader onClose={onClose}>
                {c("delete_header")}
            </ModalHeader>

            <ModalBody className="text-center space-y-4">
                {alert && (<Alert {...alert} />)}
                <p>{c("delete_message")}</p>
            </ModalBody>

            <ModalFooter className="flex justify-center space-x-2">
                <PrimaryButton working={working} onClick={onClose}>
                    {c("delete_cancel_button")}
                </PrimaryButton>

                <DangerButton working={working} onClick={handleDelete}>
                    {c("delete_delete_button")}
                </DangerButton>
            </ModalFooter>
        </Modal>
    );
};

Delete.propTypes = {
    onClose: PropTypes.func,
    handleRefresh: PropTypes.func,
    deleteRoute: PropTypes.string,
};

export default Delete;
