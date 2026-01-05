import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 bg-dark border-t border-white/10 text-center">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-gray-500">
                    © {new Date().getFullYear()} Yuvraj. All rights reserved.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                    Designed and built with <span className="text-red-500">♥</span> using React & Tailwind.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
