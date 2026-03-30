const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border px-4 md:px-8 flex items-center justify-between h-14">
    <a href="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-foreground no-underline tracking-tight">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-display font-bold">
        S
      </div>
      Spectrum
    </a>
    <div className="flex items-center gap-1">
      <a href="#" className="hidden md:inline-block px-3 py-1.5 rounded-md text-muted-foreground text-sm font-medium hover:bg-muted hover:text-foreground transition-colors">
        Browse
      </a>
      <a href="#" className="hidden md:inline-block px-3 py-1.5 rounded-md text-muted-foreground text-sm font-medium hover:bg-muted hover:text-foreground transition-colors">
        Schools
      </a>
      <a href="#" className="hidden md:inline-block px-3 py-1.5 rounded-md text-muted-foreground text-sm font-medium hover:bg-muted hover:text-foreground transition-colors">
        Shortlist
      </a>
      <a href="#" className="bg-accent text-accent-foreground px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
        Get Alerts
      </a>
    </div>
  </nav>
);

export default Navbar;
