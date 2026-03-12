import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const COUNTRIES = [
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
  { code: "ZA", name: "South Africa" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "US", name: "United States" },
];

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  country: z.string().min(1, { message: "Please select a country" }),
  mobile: z.string().trim().min(7, { message: "Mobile number must be at least 7 digits" }).max(20, { message: "Mobile number must be less than 20 digits" }).regex(/^[+]?[\d\s\-\(\)]+$/, { message: "Please enter a valid phone number" }),
  message: z.string().trim().min(10, { message: "Please provide at least 10 characters about your project" }).max(1000, { message: "Project details must be less than 1000 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      mobile: "",
      message: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Form submitted:", data);

    const API_HOST = import.meta.env.VITE_API_HOST;

    try {
      let API_ROUTE = '/inquiries/submit'
      let API_URL = `${API_HOST}${API_ROUTE}`

      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Only show success if the server actually accepted it (200-299)
        setSubmitted(true);
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error("Validation Error Details:", errorData.detail);
        alert("Validation failed. Check the console for details.");
      } else {
        console.error("Server Error:", response.statusText);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Could not connect to the server.");
    }
  });
  
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Form {...form}>
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 text-left space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name" 
                              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-destructive" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="you@company.com" 
                              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Country</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
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
                          </FormControl>
                          <FormMessage className="text-xs text-destructive" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Mobile Number</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="+1 (555) 123-4567" 
                              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Project Details</FormLabel>
                        <FormControl>
                          <textarea 
                            rows={4} 
                            placeholder="Tell us about your project, goals, and timeline..." 
                            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-destructive" />
                      </FormItem>
                    )}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px hsl(187 100% 50% / 0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </Form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
