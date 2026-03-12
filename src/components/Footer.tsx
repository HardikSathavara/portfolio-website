const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display text-sm font-bold">
          <span className="text-gradient">M3GAN</span>
          <span className="text-foreground">.AI</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} M3GAN AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
