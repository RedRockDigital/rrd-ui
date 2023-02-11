import React, { useState, useEffect, useRef, forwardRef } from "react";
import TimeAgo from "react-timeago";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";

import { useUser, useRequest, useLanguage, useSocket, useConfig } from "@/Hooks";
import { Loading } from "@/Components/Partials";

const Notifications = ({ icon }) => {
    const socket = useSocket();
    const { user } = useUser();
    const { getConfig } = useConfig();
    const notificationRef = useRef();
    const notificationTriggerRef = useRef();

    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        if (user?.unread_notifications !== undefined) {
            setUnreadNotifications(user?.unread_notifications);
        }
    }, [user?.unread_notifications]);

    useEffect(() => {
        window.addEventListener("mousedown", handleDismissNotifications);
        window.addEventListener("touchstart", handleDismissNotifications);

        if (user.id && socket) {
            socket
                .private(`App.Models.User.${user.id}`)
                .notification((notification) => {
                    setUnreadNotifications(count => count + 1);
                });
        }

        return () => {
            window.removeEventListener("mousedown", handleDismissNotifications);
            window.removeEventListener("touchstart", handleDismissNotifications);

            socket && socket.leave(`App.Models.User.${user.id}`);
        };
    }, [user.id]);

    const handleDismissNotifications = (event) => {
        if (
            !notificationRef?.current || notificationRef.current.contains(event.target) ||
            notificationTriggerRef.current.contains(event.target)
        ) {
            return;
        }

        setShowNotifications(false);
    };

    return (
        <div className="relative">
            <div
                ref={notificationTriggerRef}
                className={getConfig("theme.notifications.default", "px-4 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white cursor-pointer relative")}
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <FontAwesomeIcon icon={icon ?? faBell} />

                {unreadNotifications > 0 && (
                    <div className={getConfig("theme.notifications.countIcon", "rounded-full w-5 h-5 flex items-center justify-center absolute right-0 top-0 bg-red-500 text-xs")}>
                        {unreadNotifications}
                    </div>
                )}
            </div>

            {showNotifications && (
                <NotificationDrawer
                    ref={notificationRef}
                    setShowNotifications={setShowNotifications}
                />
            )}
        </div>
    );
};

Notifications.propTypes = {
    icon: PropTypes.any,
};

const NotificationDrawer = forwardRef(({ setShowNotifications }, ref) => {
    const { get } = useRequest();
    const { c } = useLanguage();
    const { getConfig } = useConfig();

    const [working, setWorking] = useState(null);
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        (async () => {
            setWorking(true);

            const request = await get("me/notifications");

            if (request.success) {
                setNotifications(request.data.data);
            }

            setWorking(false);
        })();
    }, []);

    return (
        <div
            ref={ref}
            className={getConfig("theme.notificationDrawer.container", "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 flex flex-col")}
        >
            {working && (
                <Loading />
            )}

            {!working && notifications && (
                <>
                    {notifications.length === 0 && (
                        <div className={getConfig("theme.notificationDrawer.emptyText", "text-gray-700 text-sm p-2")}>
                            {c("notifications_none_available")}
                        </div>
                    )}

                    {notifications.length > 0 && notifications.map(notification => (
                        <Notification
                            setShowNotifications={setShowNotifications}
                            key={notification.id}
                            notification={notification}
                        />
                    ))}
                </>
            )}
        </div>
    );
});

NotificationDrawer.displayName = "NotificationDrawer";

NotificationDrawer.propTypes = {
    setShowNotifications: PropTypes.func,
};

const Notification = ({ notification, setShowNotifications }) => {
    const { patch } = useRequest();
    const { loadUser } = useUser();
    const { getConfig } = useConfig();
    const navigate = useNavigate();

    const handleReadNotification = async () => {
        const request = await patch(`me/notifications/${notification.id}`);

        if (request.success) {
            if (!notification.read_at) {
                await loadUser();
            }

            if (notification.data?.link) {
                navigate(notification.data?.link);
            }

            if (setShowNotifications) {
                setShowNotifications(false);
            }
        }
    };

    return (
        <div
            className={getConfig("theme.notification.container", "p-2 cursor-pointer flex space-x-2")}
            onClick={handleReadNotification}
        >
            <NotificationIcon
                type={notification.data?.type}
            />

            <div className="flex-1">
                <div className={getConfig("theme.notification.titleContainer", "flex justify-between items-center mb-1")}>
                    <TimeAgo
                        date={notification.created_at}
                        className={getConfig("theme.notifcation.timeText", "text-gray-500 text-xs")}
                    />

                    {!notification.read_at && (
                        <div className={getConfig("theme.notification.readIcon", "w-2 h-2 rounded-full bg-gray-700")} />
                    )}
                </div>

                <div className={getConfig("theme.notification.text", "text-gray-700 text-sm")}>
                    {notification.data?.message}
                </div>
            </div>
        </div>
    );
};

Notification.propTypes = {
    notification: PropTypes.object,
    setShowNotifications: PropTypes.func,
};

const NotificationIcon = ({ type }) => {
    const { getConfig } = useConfig();

    const iconType = "icon";
    const icon = null;

    // switch (type) {}

    if (!icon) {
        return null;
    }

    return (
        <div className={getConfig("theme.notificationIcon.container", "w-8 h-8 flex items-center justify-center rounded-full bg-gray-200")}>
            {iconType === "icon" && (
                <FontAwesomeIcon icon={icon} className={getConfig("theme.notificationIcon.icon", "h-4 w-4")} />
            )}

            {iconType === "image" && (
                <img src={icon} alt="" className={getConfig("theme.notificationIcon.image", "rounded-full w-8 h-8 object-cover")} />
            )}
        </div>
    );
};

NotificationIcon.propTypes = {
    type: PropTypes.string,
};

export default Notifications;
