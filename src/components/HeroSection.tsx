import { Search } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

const HeroSection = ({ searchQuery, onSearchChange, onSearch }: HeroSectionProps) => (
  <section className="py-14 md:py-20 px-4 md:px-8 max-w-[860px] mx-auto text-center animate-fade-up">
    <div className="inline-flex items-center gap-2 bg-teal-light text-primary px-3.5 py-1 rounded-full text-[12px] font-semibold mb-6 border border-primary/10 tracking-wide uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      2,400+ Scholarships · Updated Weekly
    </div>
    <h1 className="font-display font-bold text-foreground text-3xl md:text-[52px] leading-[1.12] mb-4 tracking-tight">
      Find the perfect scholarship<br />for your child
    </h1>
    <p className="text-[16px] text-muted-foreground max-w-[520px] mx-auto mb-10 leading-relaxed">
      Search every Australian private school scholarship in one place — AI-verified data, direct links, closing date alerts.
    </p>
    <div className="bg-card border border-border rounded-xl px-4 py-1 flex items-center gap-2 shadow-md max-w-[600px] mx-auto mb-5 focus-within:border-primary focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.08),var(--shadow-md)] transition-all">
      <Search className="w-[18px] h-[18px] text-muted-foreground shrink-0" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="Search by school, suburb or scholarship…"
        className="flex-1 border-none outline-none text-[14px] bg-transparent text-foreground py-2.5 placeholder:text-muted-foreground"
      />
      <button
        onClick={onSearch}
        className="bg-primary text-primary-foreground border-none rounded-lg px-5 py-2 text-sm font-semibold cursor-pointer whitespace-nowrap hover:bg-primary/90 transition-colors"
      >
        Search
      </button>
    </div>
    <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap text-[12px] text-muted-foreground mt-5">
      <div><strong className="text-foreground font-semibold">10,427</strong> schools</div>
      <div className="w-1 h-1 rounded-full bg-border" />
      <div><strong className="text-foreground font-semibold">2,400+</strong> scholarships</div>
      <div className="w-1 h-1 rounded-full bg-border" />
      <div><strong className="text-foreground font-semibold">AI-verified</strong> listings</div>
      <div className="w-1 h-1 rounded-full bg-border" />
      <div>Updated <strong className="text-foreground font-semibold">today</strong></div>
    </div>
  </section>
);

export default HeroSection;
