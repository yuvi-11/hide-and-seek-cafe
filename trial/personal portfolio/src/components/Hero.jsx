import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            {/* Background blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-secondary font-medium tracking-wider text-sm uppercase mb-4 block">
                        Welcome to my portfolio
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Hi, I'm <span className="text-gradient">Yuvraj</span>
                    </h1>
                    <h2 className="text-2xl md:text-4xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Build responsive, interactive, and high-performance web applications.
                    </h2>

                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        I'm a passionate Full Stack Developer specializing in React, Node.js, and modern web technologies.
                        I create seamless digital experiences that solve real-world problems.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium flex items-center gap-2 shadow-lg shadow-primary/25"
                        >
                            View My Work <ArrowRight size={20} />
                        </motion.a>

                        <motion.a
                            href="/resume.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 border border-white/20 hover:bg-white/5 rounded-full font-medium flex items-center gap-2 transition-colors"
                        >
                            Download CV <Download size={20} />
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
