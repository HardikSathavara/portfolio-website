import { motion } from "framer-motion";
import { Brain, Database, Code2, Cog, Bot, Workflow } from "lucide-react";
import aiData from "@/assets/ai-data.png";

const services = [
  { icon: Brain, title: "AI Solutions", description: "Custom machine learning models, NLP systems, and intelligent automation tailored to your business needs." },
  { icon: Database, title: "RAG Pipelines", description: "Retrieval-Augmented Generation systems that ground LLMs in your proprietary data for accurate, contextual answers." },
  { icon: Code2, title: "API Development", description: "Scalable, secure REST and GraphQL APIs built with modern architectures and comprehensive documentation." },
  { icon: Cog, title: "Business Automation", description: "End-to-end workflow automation that eliminates manual processes and reduces operational costs." },
  { icon: Bot, title: "AI Agents", description: "Autonomous AI agents that reason, plan, and execute complex tasks across your toolchain." },
  { icon: Workflow, title: "System Integration", description: "Seamless integration between your existing systems, third-party services, and new AI capabilities." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated AI data flow background */}
      <motion.img
        src={aiData}
        alt=""
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl pointer-events-none select-none"
      />
      <motion.img
        src={aiData}
        alt=""
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl pointer-events-none select-none rotate-180"
      />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-display font-semibold text-primary tracking-widest uppercase">What We Build</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
            Solutions That <span className="text-shimmer">Drive Results</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 150 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group glass rounded-xl p-8 hover:border-primary/40 transition-all duration-300 hover:glow-primary cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
              >
                <service.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
