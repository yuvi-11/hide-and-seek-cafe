import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
    const skills = [
        { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"] },
        { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Firebase"] },
        { category: "Tools", items: ["Git", "Docker", "VS Code", "Figma", "Vercel"] },
    ];

    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-medium tracking-wider text-sm uppercase">My Expertise</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2">Tools & <span className="text-gradient">Technologies</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skills.map((group, index) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-primary">{group.category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:border-primary/50 transition-colors cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
