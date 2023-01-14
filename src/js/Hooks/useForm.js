import { useState } from "react";
import get from "lodash/get";
import set from "lodash/set";

const useForm = (defaultValues = {}) => {
    const [working, setWorking] = useState(false);
    const [form, setForm] = useState(defaultValues);
    const [alert, setAlert] = useState({});

    /**
     * @function handleInput
     * @param {event} event
     */
    const handleInput = (event) => {
        if (event?.target?.type === "file") {
            setForm({
                ...set(
                    form,
                    event.target.name,
                    event.target.multiple ? event.target.files : event.target.files[0]
                ),
            });
        } else if (
            event?.type === "select" || event?.type === "toggle" || event?.type === "radio" ||
            event?.type === "date-time"
        ) {
            setForm({
                ...set(form, event?.name, event?.value ?? null),
            });
        } else if (event?.type === "checkbox") {
            const values = form[event?.name] ?? [];
            const index = values.indexOf(event?.value);

            if (index !== -1) {
                values.splice(values.indexOf(event?.value), 1);
            } else {
                values.push(event?.value);
            }

            setForm({
                ...set(form, event?.name, values),
            });
        } else {
            setForm({
                ...set(form, event.target.name, event.target.value),
            });
        }
    };

    /**
     * @function handleSubmit
     * @param {Event} event
     * @param {function} handleRequest
     * @param {function} handleSuccess
     * @param {function} handleError
     * @return {Promise<void>}
     */
    const handleSubmit = async (event, handleRequest, handleSuccess = undefined, handleError = undefined) => {
        if (event) {
            event.preventDefault();
        }

        setWorking(true);

        const response = await handleRequest(form);

        if (!response.success) {
            if (handleError) {
                await handleError(response);
            } else {
                setAlert({
                    message: response.message,
                    errors: response.errors,
                    type: "error",
                });
            }
        } else {
            if (handleSuccess) {
                await handleSuccess(response);
            }
        }

        setWorking(false);
    };

    /**
     * @method resetForm
     */
    const resetForm = () => setForm(defaultValues ?? {});

    /**
     * @method value
     * @param {string} field
     * @return {*}
     */
    const value = (field) => get(form, field) ?? "";

    /**
     * @method setFieldValue
     * @param {string} field
     * @param {*} value
     */
    const setFieldValue = (field, value) => setForm(set(form, field, value));

    return {
        working,
        setWorking,
        form,
        setForm,
        alert,
        setAlert,
        handleInput,
        handleSubmit,
        resetForm,
        value,
        setFieldValue,
    };
};

export default useForm;
