import React, { useState } from 'react';
import { User, Lock, Bell, Mail, Phone, MapPin, Save, AlertTriangle, Settings, LogOut } from 'lucide-react';

// --- Tab Content Components ---

// 1. Profile Settings
const ProfileSettings = ({ profile, setProfile }) => {
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Saving Profile:", profile);
        alert('Profile saved successfully!');
    };

    const InputField = ({ label, name, value, Icon, type = 'text' }) => (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative flex items-center">
                <Icon size={20} className="absolute left-3 text-indigo-400" />
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    required
                />
            </div>
        </div>
    );

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">Personal Profile</h2>
            <form onSubmit={handleSave} className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField label="Full Name" name="name" value={profile.name} Icon={User} />
                    <InputField label="Email Address" name="email" value={profile.email} Icon={Mail} type="email" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField label="Phone Number" name="phone" value={profile.phone} Icon={Phone} type="tel" />
                    <InputField label="City" name="city" value={profile.city} Icon={MapPin} />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                    >
                        <Save size={20} /> Save Changes
                    </button>
                </div>
            </form>
        </>
    );
};

// 2. Security Settings
const SecuritySettings = () => {
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Changing Password...");
        alert('Password change request submitted!');
        setPassword({ current: '', new: '', confirm: '' });
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">Security & Login</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6 rounded-lg flex items-start gap-3">
                <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm">For your safety, remember to use a strong, unique password for your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type="password"
                        name="current"
                        value={password.current}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        name="new"
                        value={password.new}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirm"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"
                        required
                    />
                </div>
                <div className="pt-4">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-gray-900 font-bold rounded-full hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/30"
                    >
                        <Lock size={20} /> Change Password
                    </button>
                </div>
            </form>
        </>
    );
};

// 3. Notification Settings
const NotificationSettings = () => {
    const [settings, setSettings] = useState({
        emailRequests: true,
        smsAlerts: false,
        newMessages: true,
        systemUpdates: true,
    });

    const toggleSetting = (name) => {
        setSettings({ ...settings, [name]: !settings[name] });
    };

    const handleSave = () => {
        console.log("Saving Notification Settings:", settings);
        alert('Notification settings updated!');
    };

    const ToggleRow = ({ label, desc, name }) => (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <div>
                <p className="font-medium text-gray-800">{label}</p>
                <p className="text-sm text-gray-500 max-w-md">{desc}</p>
            </div>
            {/* Simple Tailwind Toggle Switch */}
            <button
                onClick={() => toggleSetting(name)}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${settings[name] ? 'bg-indigo-600 focus:ring-indigo-500' : 'bg-gray-200 focus:ring-gray-300'
                    }`}
                aria-checked={settings[name]}
                role="switch"
            >
                <span className="sr-only">Toggle setting</span>
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${settings[name] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                ></span>
            </button>
        </div>
    );

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">Notification Preferences</h2>
            <p className="text-gray-600 mb-6">Manage how and when you receive updates about your property listings.</p>

            <div className="space-y-2">
                <ToggleRow
                    label="Booking Request Emails"
                    desc="Receive an email immediately when a user submits a booking request."
                    name="emailRequests"
                />
                <ToggleRow
                    label="Instant SMS Alerts"
                    desc="Receive critical alerts on your mobile phone (e.g., booking confirmation)."
                    name="smsAlerts"
                />
                <ToggleRow
                    label="New Message Alerts"
                    desc="Notify me when a potential tenant sends a direct message."
                    name="newMessages"
                />
                <ToggleRow
                    label="System Updates"
                    desc="Receive emails regarding service changes, policy updates, and new features."
                    name="systemUpdates"
                />
            </div>

            <div className="pt-6">
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                >
                    <Save size={20} /> Update Preferences
                </button>
            </div>
        </>
    );
};

// --- Main Component ---

function OwnerSettings() {
    const [activeTab, setActiveTab] = useState('profile');

    // State for form data (simplified)
    const [profile, setProfile] = useState({
        name: 'Owner Name',
        email: 'owner@roomfinder.com',
        phone: '9876543210',
        city: 'Pune',
    });

    // Helper function to render active content
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSettings profile={profile} setProfile={setProfile} />;
            case 'security':
                return <SecuritySettings />;
            case 'notifications':
                return <NotificationSettings />;
            default:
                return null;
        }
    };

    const TabButton = ({ tabId, Icon, label }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex items-center gap-3 w-full px-6 py-3 text-left transition duration-200 rounded-lg ${activeTab === tabId
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
        >
            <Icon size={20} />
            <span className="font-semibold">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                    <Settings size={36} className="text-indigo-600" /> Account Settings
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Navigation (Tabs) */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 space-y-2">
                            <TabButton tabId="profile" Icon={User} label="Personal Profile" />
                            <TabButton tabId="security" Icon={Lock} label="Security & Login" />
                            <TabButton tabId="notifications" Icon={Bell} label="Notification Preferences" />

                            <div className="pt-2 border-t border-gray-100 mt-2">
                                <button className="flex items-center gap-3 w-full px-6 py-3 text-left transition duration-200 text-red-600 hover:bg-red-50 rounded-lg">
                                    <LogOut size={20} />
                                    <span className="font-semibold">Log Out</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full lg:w-3/4 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OwnerSettings;