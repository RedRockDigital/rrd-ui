import React from "react";
import { toast } from "react-toastify";

import { ErrorToast, Success, Warning } from "@/Components/Toastr";

const useToast = () => {
    /**
     * @method error
     * @param {?string} body
     * @param {?string} title
     * @param {number} autoClose
     */
    const error = (body = null, title = null, autoClose = 5000) => {
        toast(<ErrorToast body={body} title={title} />, {
            autoClose,
        });
    };

    /**
     * @method success
     * @param {?string} body
     * @param {?string} title
     * @param {number} autoClose
     */
    const success = (body = null, title = null, autoClose = 5000) => {
        toast(<Success body={body} title={title} />, {
            autoClose,
        });
    };

    /**
     * @method warning
     * @param {?string} body
     * @param {?string} title
     * @param {number} autoClose
     */
    const warning = (body = null, title = null, autoClose = 5000) => {
        toast(<Warning body={body} title={title} />, {
            autoClose,
        });
    };

    return {
        error,
        success,
        warning,
    };
};

export default useToast;
