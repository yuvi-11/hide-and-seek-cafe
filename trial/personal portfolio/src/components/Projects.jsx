import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "E-Commerce Dashboard",
            description: "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order processing.",
            tags: ["React", "Tailwind", "Chart.js"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500",
            liveLink: "#",
            githubLink: "#",
        },
        {
            title: "Social Media App",
            description: "A modern social platform connecting developers. Features include real-time messaging, code sharing, and collaborative workspaces.",
            tags: ["Next.js", "Typescript", "Prisma"],
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=500",
            liveLink: "#",
            githubLink: "#",
        },
        {
            title: "AI Content Generator",
            description: "An AI-powered application that helps users generate blog posts, captions, and marketing copy using OpenAI's GPT-3.",
            tags: ["React", "OpenAI API", "Node.js"],
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=500",
            liveLink: "#",
            githubLink: "#",
        }
    ];

    return (
        <section id="projects" className="py-20 bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-medium tracking-wider text-sm uppercase">Selected Work</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2">Featured <span className="text-gradient">Projects</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 group"
                        >
                            <div className="relative overflow-hidden aspect-video">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <a href={project.liveLink} className="p-3 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                    <a href={project.githubLink} className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-white/5 rounded-full text-gray-300">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
