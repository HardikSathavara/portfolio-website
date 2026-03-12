import { motion, useInView } from "framer-motion";
import { Zap, Shield, TrendingUp } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const pillars = [
  { icon: Zap, title: "Fast Delivery", desc: "From concept to production in weeks, not months." },
  { icon: Shield, title: "Enterprise-Grade", desc: "Security, reliability, and compliance built in from day one." },
  { icon: TrendingUp, title: "Scalable by Design", desc: "Architectures that grow seamlessly with your business." },
];

const CountUp = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const prefix = target.replace(/[0-9.]/g, "").replace(suffix, "");
    if (isNaN(num)) { setDisplay(target); return; }

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = num * eased;

      const formatted = num % 1 !== 0 ? start.toFixed(1) : Math.floor(start).toString();
      setDisplay(prefix + formatted + suffix);

      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, suffix]);

  return <div ref={ref}>{display}</div>;
};

const stats = [
  { value: "50", suffix: "+", label: "Projects Delivered" },
  { value: "99.9", suffix: "%", label: "Uptime SLA" },
  { value: "3", suffix: "x", label: "Avg. ROI Increase" },
  { value: "4", suffix: "wk", prefix: "< ", label: "Time to MVP" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <span className="text-sm font-display font-semibold text-primary tracking-widest uppercase">Why Us</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6 tracking-tight">
              Engineering <span className="text-shimmer">Excellence</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We're a team of AI engineers, data scientists, and full-stack developers obsessed with building production-ready intelligent systems. We don't do demos — we ship solutions that generate real business value.
            </p>
            <div className="flex flex-col gap-6">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors"
                  >
                    <p.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-display font-bold text-sm mb-1">{p.title}</h4>
                    <p className="text-muted-foreground text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="glass rounded-2xl p-8 md:p-10"
          >
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-display font-extrabold text-gradient mb-2">
                    {stat.prefix || ""}<CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
