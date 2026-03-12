import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

const COUNTRIES = [
  { code: "AE", name: "United Arab Emirates" },
  { code: "AU", name: "Australia" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  { code: "CN", name: "China" },
  { code: "DE", name: "Germany" },
  { code: "ES", name: "Spain" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "IN", name: "India" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "OTHER", name: "Other" },
  { code: "SG", name: "Singapore" },
  { code: "US", name: "United States" },
  { code: "ZA", name: "South Africa" },
];

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-sm font-display font-semibold text-primary tracking-widest uppercase">Let's Talk</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4 tracking-tight">
            Ready to <span className="text-shimmer">Get Started?</span>
          </h2>
          <p className="text-muted-foreground mb-10">Tell us about your project and we'll get back to you within 24 hours.</p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="glass rounded-2xl p-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-5xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="font-display text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground text-sm">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 md:p-10 text-left space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                  <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Name</label>
                  <input required type="text" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all" placeholder="Your name" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                  <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email</label>
                  <input required type="email" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all" placeholder="you@company.com" />
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                  <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Country</label>
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your country</option>
                    {/* {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))} */}

                    {[...COUNTRIES]
                      .sort((a, b) => {
                        if (a.code === "OTHER") return 1;
                        if (b.code === "OTHER") return -1;
                        return a.name.localeCompare(b.name);
                      })
                      .map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                      
                  </select>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                  <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Mobile Number</label>
                  <input
                    required
                    type="tel"
                    pattern="[+]?[\d\s\-\(\)]{7,20}"
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
                <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Details</label>
                <textarea required rows={4} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all resize-none" placeholder="Tell us about your project, goals, and timeline..." />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px hsl(187 100% 50% / 0.4)" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold transition-all"
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
