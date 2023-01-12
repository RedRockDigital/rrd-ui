import startsWith from "lodash/startsWith";

import useAxiosApi from "./useAxiosApi";
import useConfig from "./useConfig";

const useRequest = () => {
    const axiosApi = useAxiosApi();
    const { getConfig } = useConfig();

    /**
     * @method convertPath
     * @param {string} path
     * @return {string}
     */
    const convertPath = (path) => {
        path = path.replace(`${window.location.origin}/api`, "");
        path = path.replace("/api", "");

        return `${getConfig('apiRoute')}${!startsWith(path, "/") ? "/" : ""}${path}`;
    };

    /**
     * @function deleteRequest (delete)
     * @param {string} path
     * @param {number} successStatus
     * @param {object} config
     * @return {Promise<{data, success: boolean, status}|*>}
     */
    const deleteRequest = async (path, successStatus = 204, config = {}) => {
        let err = null;

        const response = await axiosApi.delete(convertPath(path), config).catch(
            (error) => (err = error)
        );

        return handleResponse(response, err, successStatus);
    };

    /**
     * @function get
     * @param {string} path
     * @param {object} data
     * @param {object} config
     * @return {Promise<{data, success: boolean, status}|*>}
     */
    const get = async (path, data = {}, config = {}) => {
        let err = null;

        const response = await axiosApi.get(
            `${convertPath(path)}${urlParams(data)}`,
            config
        ).catch(
            (error) => (err = error)
        );

        return handleResponse(response, err);
    };

    /**
     * @function post
     * @param {string} path
     * @param {object} data
     * @param {number} successStatus
     * @param {object} config
     * @return {Promise<{data, success: boolean, status}|*>}
     */
    const post = async (path, data = {}, successStatus = 201, config = {}) => {
        let err = null;

        const response = await axiosApi.post(convertPath(path), data, config).catch(
            (error) => (err = error)
        );

        return handleResponse(response, err, successStatus);
    };

    /**
     * @function patch
     * @param {string} path
     * @param {object} data
     * @param {number} successStatus
     * @param {object} config
     * @return {Promise<{data, success: boolean, status}|*>}
     */
    const patch = async (path, data = {}, successStatus = 200, config = {}) => {
        let err = null;

        const response = await axiosApi.patch(convertPath(path), data, config).catch(
            (error) => (err = error)
        );

        return handleResponse(response, err, successStatus);
    };

    /**
     * @function put
     * @param {string} path
     * @param {object} data
     * @param {number} successStatus
     * @param {object} config
     * @returns {{data, success: boolean, status}|*}
     */
    const put = (path, data = {}, successStatus = 200, config = {}) => {
        let err = null;

        const response = axiosApi.put(convertPath(path), data, config).catch(
            (error) => (err = error)
        );

        return handleResponse(response, err, successStatus);
    };

    /**
     * @function urlParams
     * @param {object} params
     * @return {string}
     */
    const urlParams = (params) => {
        if (params === undefined || params.length === 0) {
            return "";
        }

        const queryStringItems = [];

        for (const field in params) {
            if (params[field] !== undefined &&
                params[field] !== null &&
                params[field].length !== 0) {
                queryStringItems.push(field + "=" + encodeURI(params[field]));
            }
        }

        return "?" + queryStringItems.join("&");
    };

    /**
     * @function getStatus
     * @param successStatus
     * @returns {*[]|*}
     */
    const getStatus = (successStatus) => {
        return !Array.isArray(successStatus) ? [successStatus] : successStatus;
    };

    /**
     * @function handleResponse
     * @param {object} response
     * @param {object} error
     * @param {number} successStatus
     * @returns {{data, success: boolean, status}|(*&{success: boolean, status})}
     */
    const handleResponse = (response, error, successStatus = 200) => {
        const status = getStatus(successStatus);

        if (status.indexOf(response.status) !== -1) {
            return { status: response.status, data: response.data, success: true };
        }

        if (error) {
            return { status: error.response.status, ...error.response.data, success: false };
        }

        return { status: response.status, ...response.data, success: true };
    };

    return {
        del: deleteRequest,
        get,
        patch,
        post,
        put,
    };
};

export default useRequest;
