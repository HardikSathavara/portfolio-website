import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "We deep-dive into your data, workflows, and goals to define the right solution." },
  { num: "02", title: "Architecture", desc: "Design scalable system architecture with clear milestones and deliverables." },
  { num: "03", title: "Build & Iterate", desc: "Rapid development cycles with continuous feedback and testing." },
  { num: "04", title: "Deploy & Scale", desc: "Production deployment with monitoring, optimization, and ongoing support." },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-display font-semibold text-primary tracking-widest uppercase">How We Work</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
            Our <span className="text-shimmer">Process</span>
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-4 gap-6">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 origin-left"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative glass rounded-xl p-8 text-center group hover:border-primary/40 transition-all hover:glow-primary cursor-default"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 300 }}
                className="text-5xl font-display font-extrabold text-primary/20 group-hover:text-primary/50 transition-colors mb-4"
              >
                {step.num}
              </motion.div>
              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
