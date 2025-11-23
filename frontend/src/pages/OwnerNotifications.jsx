import React, { useState } from 'react';
import { Mail, MessageSquare, Star, CheckCircle, Trash2, Settings, AlertTriangle, User, Bell } from 'lucide-react';

// Sample Notification Data
const initialNotifications = [
    {
        id: 1,
        type: 'BookingRequest',
        message: 'New booking request for "2BHK in Pune" from Priya Sharma.',
        time: '2 hours ago',
        read: false,
        icon: Star,
        iconColor: 'text-indigo-600'
    },
    {
        id: 2,
        type: 'Message',
        message: 'User Rohan Verma sent a message about "Fully Furnished PG".',
        time: '5 hours ago',
        read: false,
        icon: MessageSquare,
        iconColor: 'text-cyan-500'
    },
    {
        id: 3,
        type: 'PropertyInquiry',
        message: 'Quick inquiry regarding availability of "1RK for Students".',
        time: 'Yesterday',
        read: true,
        icon: Mail,
        iconColor: 'text-green-600'
    },
    {
        id: 4,
        type: 'SystemAlert',
        message: 'Your property "2BHK in Pune" verification is pending.',
        time: '2 days ago',
        read: true,
        icon: AlertTriangle,
        iconColor: 'text-red-500'
    },
    {
        id: 5,
        type: 'Review',
        message: 'Amit Patil left a positive review on your PG listing.',
        time: '1 week ago',
        read: true,
        icon: User,
        iconColor: 'text-purple-600'
    },
];

function OwnerNotifications() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState('all'); // 'all' or 'unread'

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const toggleReadStatus = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: !n.read } : n
        ));
    };

    const filteredNotifications = notifications.filter(n =>
        filter === 'all' ? true : !n.read
    ).sort((a, b) => {
        // Simple sorting: unread items first
        if (!a.read && b.read) return -1;
        if (a.read && !b.read) return 1;
        return 0;
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                        <Bell size={36} className="text-indigo-600" /> Notification Center
                    </h1>

                    <button
                        onClick={() => alert("Notification Settings Clicked")}
                        className="p-2 text-gray-600 hover:text-indigo-600 transition"
                        title="Notification Settings"
                    >
                        <Settings size={24} />
                    </button>
                </div>

                {/* Filter and Actions Bar */}
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6 flex justify-between items-center flex-wrap">

                    {/* Tabs */}
                    <div className="flex space-x-3 mb-3 sm:mb-0">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition ${filter === 'all'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition flex items-center gap-1 ${filter === 'unread'
                                    ? 'bg-cyan-500 text-gray-900 shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Unread
                            {unreadCount > 0 && (
                                <span className="ml-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Action */}
                    <button
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                        className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition disabled:opacity-50 ${unreadCount > 0
                                ? 'bg-white border border-indigo-500 text-indigo-600 hover:bg-indigo-50'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        <CheckCircle size={18} /> Mark all as read
                    </button>
                </div>

                {/* Notification List */}
                <div className="space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((n) => (
                            <div
                                key={n.id}
                                className={`flex items-center justify-between p-5 rounded-xl shadow-lg transition duration-300 border ${n.read
                                        ? 'bg-white border-gray-100'
                                        : 'bg-indigo-50 border-indigo-200 hover:shadow-xl'
                                    }`}
                            >
                                <div className="flex items-start gap-4 flex-1">
                                    <div className={`p-3 rounded-full ${n.read ? 'bg-gray-100' : 'bg-white'}`}>
                                        <n.icon size={24} className={n.iconColor} />
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-lg ${n.read ? 'text-gray-800' : 'text-gray-900'}`}>
                                            {n.type}
                                        </p>
                                        <p className={`text-gray-600 ${n.read ? 'text-sm' : 'font-medium'}`}>
                                            {n.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-4">
                                    {/* Mark Read/Unread Toggle */}
                                    <button
                                        onClick={() => toggleReadStatus(n.id)}
                                        title={n.read ? "Mark as Unread" : "Mark as Read"}
                                        className={`p-2 rounded-full transition ${n.read ? 'text-cyan-500 hover:bg-cyan-50' : 'text-indigo-600 hover:bg-indigo-100'}`}
                                    >
                                        <CheckCircle size={20} />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteNotification(n.id)}
                                        title="Delete Notification"
                                        className="p-2 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-16 bg-white rounded-xl shadow-lg border border-gray-200">
                            <AlertTriangle size={32} className="text-yellow-500 mx-auto mb-4" />
                            <p className="text-xl font-medium text-gray-700">No new notifications!</p>
                            <p className="text-gray-500 mt-2">Check back later or change your filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OwnerNotifications;