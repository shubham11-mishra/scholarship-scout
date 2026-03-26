import { Search } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

const HeroSection = ({ searchQuery, onSearchChange, onSearch }: HeroSectionProps) => (
  <section className="py-16 md:py-20 px-4 md:px-8 max-w-[900px] mx-auto text-center animate-fade-up">
    <div className="inline-flex items-center gap-2 bg-teal-light text-teal px-3.5 py-1 rounded-full text-[13px] font-semibold mb-5 border border-teal/20">
      <span className="w-1.5 h-1.5 rounded-full bg-teal" />
      2,400+ Scholarships · Updated Weekly
    </div>
    <h1 className="font-display font-black text-foreground text-4xl md:text-[58px] leading-[1.1] mb-4 tracking-tight">
      Find the perfect<br /><span className="text-teal">scholarship</span> for your child
    </h1>
    <p className="text-[17px] text-slate max-w-[560px] mx-auto mb-9 leading-relaxed">
      Search every Australian private school scholarship in one place — AI-verified data, direct links, closing date alerts.
    </p>
    <div className="bg-card border-[1.5px] border-border rounded-2xl px-5 py-1.5 flex items-center gap-2 shadow-md max-w-[640px] mx-auto mb-4 focus-within:border-teal focus-within:shadow-[0_0_0_3px_hsl(var(--teal)/0.12),var(--shadow-md)] transition-all">
      <Search className="w-[18px] h-[18px] text-muted-foreground shrink-0" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="Search by school name, suburb or scholarship…"
        className="flex-1 border-none outline-none font-body text-[15px] bg-transparent text-foreground py-2 placeholder:text-muted-foreground"
      />
      <button
        onClick={onSearch}
        className="bg-teal text-primary-foreground border-none rounded-[10px] px-5 py-2.5 font-body text-sm font-semibold cursor-pointer whitespace-nowrap hover:bg-teal/90 transition-colors"
      >
        Search
      </button>
    </div>
    <div className="flex items-center justify-center gap-5 md:gap-7 flex-wrap text-[13px] text-muted-foreground mt-4">
      <div><strong className="text-foreground font-bold">10,427</strong> schools indexed</div>
      <div>·</div>
      <div><strong className="text-foreground font-bold">2,400+</strong> scholarships</div>
      <div>·</div>
      <div><strong className="text-foreground font-bold">AI-verified</strong> listings</div>
      <div>·</div>
      <div>Last updated <strong className="text-foreground font-bold">today</strong></div>
    </div>
  </section>
);

export default HeroSection;
