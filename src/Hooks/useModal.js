import { useContext } from "react";

import ModalContext from "@/Context/ModalProvider";

const useModal = () => {
    const { modal, setModal } = useContext(ModalContext);

    return {
        setModal,
        modal,
    };
};

export default useModal;
