import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Terminal } from 'lucide-react';

const About = () => {
    const cards = [
        {
            icon: <Code size={32} />,
            title: "Clean Code",
            description: "Writing scalable, maintainable, and efficient code is my priority."
        },
        {
            icon: <Palette size={32} />,
            title: "Creative Design",
            description: "I love crafting beautiful, intuitive, and user-centric interfaces."
        },
        {
            icon: <Terminal size={32} />,
            title: "Modern Tech",
            description: "Always learning and staying up-to-date with the latest technologies."
        }
    ];

    return (
        <section id="about" className="py-20 bg-dark/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-medium tracking-wider text-sm uppercase">What I do</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2">Passionate about <span className="text-gradient">building digital products</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors duration-300 group"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 mb-6">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-20 flex flex-col md:flex-row items-center gap-12"
                >
                    <div className="w-full md:w-1/2">
                        {/* Using a placeholder image for 'About Me' photo */}
                        <img
                            src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800&h=800"
                            alt="About Me"
                            className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full object-cover aspect-square"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-3xl font-bold mb-6">Bridging the gap between <span className="text-primary">design</span> and <span className="text-secondary">engineering</span></h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            I started my journey as a designer but quickly fell in love with coding. This unique background allows me to understand both sides of the product development process.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Whether it's a small business website or a complex web application, I bring the same level of attention to detail and passion to every project. I believe that good design is not just about how things look, but how they work.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
