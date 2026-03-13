import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Sparkles } from "lucide-react";
import cuteRobot from "@/assets/cute-robot.png";

type Message = {
  id: number;
  role: "user" | "bot";
  content: string;
};

const botResponses = [
  "Hey there! 👋 I'm M3GAN, your AI buddy. How can I help you today?",
  "Great question! We specialize in AI solutions, RAG pipelines, API development, and business automation. Want to know more? 🚀",
  "Our AI solutions are custom-built for your business needs — from NLP systems to intelligent automation! 💡",
  "We typically start with a discovery call to understand your needs, then propose a tailored solution. Want to book one? 📞",
  "Our team has delivered 50+ AI projects across industries. We focus on scalable, production-ready solutions! 🎯",
  "Sure thing! You can reach us through the contact form below, or I can help answer more questions right here 😊",
  "That's a fantastic idea! AI can definitely help with that. Let me connect you with our team! ✨",
  "I appreciate your interest! Every project is unique — pricing depends on scope and complexity 💰",
];

const CuteRobotAvatar = ({ size = 28, animate = false }: { size?: number; animate?: boolean }) => (
  <motion.img
    src={cuteRobot}
    alt="M3GAN Bot"
    className="rounded-full object-cover"
    style={{ width: size, height: size }}
    animate={animate ? { y: [0, -3, 0] } : undefined}
    transition={animate ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : undefined}
  />
);

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-end gap-2 mb-4"
  >
    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
      <CuteRobotAvatar size={24} animate />
    </div>
    <div className="bg-secondary/80 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-primary/60"
          animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
      <motion.span
        className="text-xs text-muted-foreground ml-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        thinking...
      </motion.span>
    </div>
  </motion.div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", content: "Hiya! I'm M3GAN 🤖✨ Your cute little AI helper! Ask me anything about our services~ 💙" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: botResponses[responseIndex % botResponses.length],
      };
      setMessages((prev) => [...prev, botMsg]);
      setResponseIndex((prev) => prev + 1);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <>
      {/* Floating cute robot button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center shadow-lg overflow-hidden"
            style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.3), 0 4px 20px hsl(var(--background) / 0.5)" }}
          >
            <motion.img
              src={cuteRobot}
              alt="Chat with M3GAN"
              className="w-12 h-12 object-contain"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-primary/50"
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Speech bubble hint */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 2, type: "spring" }}
              className="absolute -top-10 -left-2 bg-card border border-border rounded-xl px-3 py-1.5 text-xs font-display text-foreground whitespace-nowrap shadow-md"
            >
              Chat with me! 💬
              <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            // className="fixed bottom-6 right-6 z-50 w-[370px] h-[530px] rounded-3xl overflow-hidden flex flex-col border border-primary/20 bg-background shadow-2xl"
            className="fixed bottom-0 right-0 z-50 w-full h-full sm:bottom-6 sm:right-6 sm:w-[370px] sm:h-[530px] sm:rounded-3xl rounded-none overflow-hidden flex flex-col border border-primary/20 bg-background shadow-2xl"
            style={{ boxShadow: "0 20px 60px hsl(187 100% 50% / 0.12), 0 0 0 1px hsl(var(--border))" }}
          >
            {/* Header with cute robot */}
            <div className="relative flex items-center gap-3 px-4 py-3 bg-card border-b border-border overflow-hidden">
              {/* Subtle animated bg */}
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--primary)), transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent)), transparent 50%)",
                }}
                animate={{ opacity: [0.03, 0.07, 0.03] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden relative"
              >
                <img src={cuteRobot} alt="M3GAN" className="w-9 h-9 object-contain" />
              </motion.div>
              <div className="flex-1 relative">
                <h4 className="text-sm font-display font-bold text-foreground flex items-center gap-1.5">
                  Zoro AI
                  <motion.span
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    className="text-xs"
                  >
                    🤖
                  </motion.span>
                </h4>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-muted-foreground">Always here for you~</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors relative"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className={`flex items-end gap-2 mb-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.05 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                        msg.role === "bot"
                          ? "bg-primary/10 border-primary/20"
                          : "bg-accent/10 border-accent/20"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <CuteRobotAvatar size={24} />
                      ) : (
                        <User className="w-4 h-4 text-accent" />
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className={`max-w-[75%] px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "bot"
                          ? "bg-secondary/80 text-foreground rounded-2xl rounded-bl-md border border-border/50"
                          : "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                      }`}
                    >
                      {msg.content}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message~ ✨"
                    className="w-full bg-secondary/60 text-foreground text-sm rounded-full px-4 py-2.5 pr-10 outline-none border border-border focus:border-primary/50 transition-colors placeholder:text-muted-foreground"
                  />
                  <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85, rotate: -15 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
