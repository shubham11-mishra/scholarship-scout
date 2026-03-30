import { Sparkles } from "lucide-react";

const Navbar = () => (
  <nav className="sticky top-0 z-50 glass px-4 md:px-8 flex items-center justify-between h-14">
    <a href="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-foreground no-underline tracking-tight">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-display font-bold shadow-md">
        S
      </div>
      <span className="gradient-text">Spectrum</span>
    </a>
    <div className="flex items-center gap-1">
      <a href="#" className="hidden md:inline-block px-3 py-1.5 rounded-lg text-muted-foreground text-sm font-medium hover:bg-secondary hover:text-foreground transition-all">
        Browse
      </a>
      <a href="#" className="hidden md:inline-block px-3 py-1.5 rounded-lg text-muted-foreground text-sm font-medium hover:bg-secondary hover:text-foreground transition-all">
        Schools
      </a>
      <a href="#" className="hidden md:inline-block px-3 py-1.5 rounded-lg text-muted-foreground text-sm font-medium hover:bg-secondary hover:text-foreground transition-all">
        Shortlist
      </a>
      <a href="#" className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 glow-primary">
        <Sparkles className="w-3.5 h-3.5" />
        Get Alerts
      </a>
    </div>
  </nav>
);

export default Navbar;
