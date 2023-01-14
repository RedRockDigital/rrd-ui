import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import { PrimaryButton, SecondaryButton, DangerButton } from "@/Components/Buttons";
import Delete from "@/Components/Partials/Modals/Delete";

import { useLanguage, useModal, useRequest } from "@/Hooks";

const Actions = ({ modals, actions, handleRefresh, item, routes }) => {
    const { c } = useLanguage();
    const { setModal } = useModal();
    const { get } = useRequest();

    const handleClick = async ({type, modal, linkType, newTab, onClick, download}) => {
        if (onClick) {
            onClick();
        }

        if (type === "delete") {
            setModal({
                component: Delete,
                props: {
                    handleRefresh,
                    deleteRoute: routes.delete,
                },
            });
        }

        if (modal) {
            const props = {
                handleRefresh,
            };

            if (item) {
                props.item = item;
            }

            if (routes) {
                props.routes = routes;
            }

            setModal(
                modal?.component
                    ? {
                        component: modal.component,
                        props: {
                            ...props,
                            ...modal.props,
                        },
                    }
                    : {
                        component: modals[modal],
                        props,
                    }
            );
        }

        if (linkType) {
            if (download) {
                const request = await get(routes[linkType], {}, {
                    responseType: "blob",
                });

                if (request.success) {
                    const fileURL = window.URL.createObjectURL(new Blob([request.data]));
                    const fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', download);
                    document.body.appendChild(fileLink);

                    fileLink.click();
                }
            } else if (newTab) {
                window.open(routes[linkType]);
            } else {
                window.location.replace(routes[linkType]);
            }
        }
    };

    return (
        <div className="space-x-0.5">
            {actions.map((action, key) => {
                const { type, icon, label } = action;

                return (
                    <Fragment key={key}>
                        {type === "primary_button" && (
                            <PrimaryButton onClick={() => handleClick(action)}>
                                {icon && (
                                    <FontAwesomeIcon
                                        icon={icon}
                                        className={label && "mr-1"}
                                    />
                                )}

                                {label && c(label)}
                            </PrimaryButton>
                        )}

                        {type === "secondary_button" && (
                            <SecondaryButton onClick={() => handleClick(action)}>
                                {icon && (
                                    <FontAwesomeIcon
                                        icon={icon}
                                        className={label && "mr-1"}
                                    />
                                )}

                                {label && c(label)}
                            </SecondaryButton>
                        )}

                        {type === "danger_button" && (
                            <DangerButton onClick={() => handleClick(action)}>
                                {icon && (
                                    <FontAwesomeIcon
                                        icon={icon}
                                        className={label && "mr-1"}
                                    />
                                )}

                                {label && c(label)}
                            </DangerButton>
                        )}

                        {type === "delete" && (
                            <DangerButton onClick={() => handleClick(action)}>
                                {icon && (
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className={label && "mr-1"}
                                    />
                                )}

                                {label && c(label)}
                            </DangerButton>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};

Actions.propTypes = {
    actions: PropTypes.array,
    handleRefresh: PropTypes.func,
    item: PropTypes.shape({
        routes: PropTypes.object,
    }),
    routes: PropTypes.object,
    modals: PropTypes.object,
};

export default Actions;
