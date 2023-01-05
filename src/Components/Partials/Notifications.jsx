import React, { useState, useEffect, useRef, forwardRef } from "react";
import TimeAgo from "react-timeago";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";

import { useUser, useRequest, useLanguage, useSocket } from "@/Hooks";
import { Loading } from "@/Components/Partials";

const Notifications = () => {
    const socket = useSocket();
    const { user } = useUser();
    const notificationRef = useRef();

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

        if (user.id) {
            socket
                .private(`App.Models.User.${user.id}`)
                .notification((notification) => {
                    setUnreadNotifications(count => count + 1);
                });
        }

        return () => {
            window.removeEventListener("mousedown", handleDismissNotifications);
            window.removeEventListener("touchstart", handleDismissNotifications);

            socket.leave(`App.Models.User.${user.id}`);
        };
    }, [user.id]);

    const handleDismissNotifications = (event) => {
        if (!notificationRef?.current || notificationRef.current.contains(event.target)) {
            return;
        }

        setShowNotifications(false);
    };

    return (
        <div className="relative">
            <div
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white cursor-pointer relative"
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <FontAwesomeIcon icon={faBell} />

                {unreadNotifications > 0 && (
                    <div className="rounded-full w-5 h-5 flex items-center justify-center absolute right-0 top-0 bg-red-500 text-xs">
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

const NotificationDrawer = forwardRef(({ setShowNotifications }, ref) => {
    const { get } = useRequest();
    const { c } = useLanguage();

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
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 flex flex-col"
        >
            {working && (
                <Loading />
            )}

            {!working && notifications && (
                <>
                    {notifications.length === 0 && (
                        <div className="text-gray-700 text-sm p-2">
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
            className="p-2 cursor-pointer flex space-x-2"
            onClick={handleReadNotification}
        >
            <NotificationIcon
                type={notification.data?.type}
            />

            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <TimeAgo
                        date={notification.created_at}
                        className="text-gray-500 text-xs"
                    />

                    {!notification.read_at && (
                        <div className="w-2 h-2 rounded-full bg-gray-700" />
                    )}
                </div>

                <div className="text-gray-700 text-sm">
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
    const iconType = "icon";
    const icon = null;

    // switch (type) {}

    if (!icon) {
        return null;
    }

    return (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            {iconType === "icon" && (
                <FontAwesomeIcon icon={icon} className="h-4 w-4" />
            )}

            {iconType === "image" && (
                <img src={icon} alt="" className="rounded-full w-8 h-8 object-cover" />
            )}
        </div>
    );
};

NotificationIcon.propTypes = {
    type: PropTypes.string,
};

export default Notifications;
