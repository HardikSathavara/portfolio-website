import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Binary, CircuitBoard, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import aiBrain from "@/assets/ai-brain.png";
import aiRobot from "@/assets/ai-robot.png";

const TypeWriter = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex(charIndex + 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && charIndex > 0) {
        setCharIndex(charIndex - 1);
      } else {
        setDeleting(false);
        setIndex((index + 1) % texts.length);
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, texts]);

  return (
    <span className="text-gradient">
      {texts[index].substring(0, charIndex)}
      <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-pulse" />
    </span>
  );
};

const FloatingIcon = ({ icon: Icon, className, delay }: { icon: typeof Binary; className: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.15, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
    className={className}
  >
    <Icon className="w-full h-full text-primary" />
  </motion.div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs with motion */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -40, 30, 0], y: [0, 20, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]"
      />

      {/* Floating decorative icons */}
      <FloatingIcon icon={Binary} className="absolute top-32 right-[15%] w-16 h-16 animate-float" delay={0.5} />
      <FloatingIcon icon={CircuitBoard} className="absolute bottom-32 left-[10%] w-20 h-20 animate-float-reverse" delay={0.8} />
      <FloatingIcon icon={Cpu} className="absolute top-1/2 right-[8%] w-12 h-12 animate-float" delay={1.1} />

      {/* Floating AI images */}
      <motion.img
        src={aiBrain}
        alt="AI Neural Network"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.25, scale: 1, y: [0, -20, 0] }}
        transition={{ opacity: { delay: 0.6, duration: 1 }, scale: { delay: 0.6, duration: 1 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-24 left-[5%] w-40 h-40 md:w-56 md:h-56 pointer-events-none select-none"
      />
      <motion.img
        src={aiRobot}
        alt="AI Robot"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1, y: [0, 15, 0] }}
        transition={{ opacity: { delay: 0.9, duration: 1 }, scale: { delay: 0.9, duration: 1 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-24 right-[5%] w-36 h-36 md:w-48 md:h-48 pointer-events-none select-none"
      />

      {/* Spinning ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-primary animate-spin-slow"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-border-glow"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI-Powered Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Build Intelligent
            <br />
            <TypeWriter texts={["Systems That Scale", "AI That Delivers", "Automation That Works", "APIs That Perform"]} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body leading-relaxed"
          >
            We architect custom AI solutions, RAG pipelines, robust APIs, and business automation — engineered for performance, built for growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(187 100% 50% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold transition-all"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, borderColor: "hsl(187 100% 50% / 0.5)" }}
              whileTap={{ scale: 0.97 }}
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-display text-sm font-bold transition-colors"
            >
              Explore Services
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
