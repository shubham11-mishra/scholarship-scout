import { Search } from "lucide-react";

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-canvas/92 backdrop-blur-xl border-b border-border px-4 md:px-8 flex items-center justify-between h-16">
    <a href="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-foreground no-underline">
      <div className="w-[34px] h-[34px] rounded-lg bg-teal flex items-center justify-center text-primary-foreground text-base font-display font-black">
        S
      </div>
      Spectrum Navigator
    </a>
    <div className="flex items-center gap-1.5">
      <a href="#" className="hidden md:inline-block px-3.5 py-1.5 rounded-md text-slate text-sm font-medium hover:bg-border hover:text-foreground transition-colors">
        Browse
      </a>
      <a href="#" className="hidden md:inline-block px-3.5 py-1.5 rounded-md text-slate text-sm font-medium hover:bg-border hover:text-foreground transition-colors">
        Schools
      </a>
      <a href="#" className="hidden md:inline-block px-3.5 py-1.5 rounded-md text-slate text-sm font-medium hover:bg-border hover:text-foreground transition-colors">
        My Shortlist
      </a>
      <a href="#" className="bg-teal text-primary-foreground px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-teal/90 transition-colors">
        Get Alerts
      </a>
    </div>
  </nav>
);

export default Navbar;
