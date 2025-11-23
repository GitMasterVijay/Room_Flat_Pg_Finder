import React from 'react';

// Inline SVG Icon for Copyright
const IconCopyright = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M14.5 9.5a5 5 0 0 0-4.5 4.5"/>
    </svg>
);

export default function OwnerFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full   p-6 bg-white border-t border-gray-100 shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                
                {/* Copyright and Brand Info */}
                <div className="flex items-center text-sm text-gray-500 mb-3 md:mb-0">
                    <IconCopyright className="w-4 h-4 mr-1 text-gray-400" />
                    <span>{currentYear} RoomFinder Dashboard. All rights reserved.</span>
                </div>

                {/* Quick Links / Navigation */}
                <nav className="flex space-x-4 sm:space-x-6 text-sm font-medium">
                    <a href="/dashboard/support" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                        Support
                    </a>
                    <a href="/dashboard/terms" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Terms of Service
                    </a>
                    <a href="/dashboard/privacy" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Privacy
                    </a>
                </nav>
            </div>
        </footer>
    );
}