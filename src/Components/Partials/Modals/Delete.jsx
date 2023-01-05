import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/Components/Modal";
import { PrimaryButton, DangerButton } from "@/Components/Buttons";

import { useRequest, useLanguage, useToast } from "@/Hooks";

const Delete = ({ onClose, handleRefresh, deleteRoute }) => {
    const [working, setWorking] = useState(false);
    const { del } = useRequest();
    const { c } = useLanguage();
    const { success } = useToast();

    const handleDelete = async () => {
        setWorking(true);

        const request = await del(deleteRoute);

        if (request.success) {
            if (handleRefresh) {
                handleRefresh();
            }

            success();

            onClose();

            return;
        }

        setWorking(false);
    };

    return (
        <Modal>
            <ModalHeader onClose={onClose}>
                {c("delete_header")}
            </ModalHeader>

            <ModalBody className="text-center">
                {c("delete_message")}
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
