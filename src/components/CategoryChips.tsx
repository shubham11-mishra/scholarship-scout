import { CATEGORIES, SCHOLARSHIPS } from "@/data/scholarships";

interface CategoryChipsProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const CategoryChips = ({ activeCategory, onCategoryChange }: CategoryChipsProps) => {
  const getCounts = (cat: string) =>
    cat === "All" ? SCHOLARSHIPS.length : SCHOLARSHIPS.filter((s) => s.category === cat).length;

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 pb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3.5">
        Browse by Category
      </div>
      <div className="flex flex-wrap gap-2.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.label}
            onClick={() => onCategoryChange(c.label)}
            className={`flex items-center gap-2 border-[1.5px] rounded-full px-4 py-2 text-[13px] font-semibold cursor-pointer transition-all select-none ${
              activeCategory === c.label
                ? "border-teal text-teal bg-teal-light"
                : "bg-card border-border text-slate hover:border-teal hover:text-teal hover:bg-teal-light"
            }`}
          >
            <span className="text-base">{c.icon}</span>
            {c.label}
            <span
              className={`rounded-full px-2 py-px text-[11px] font-bold ${
                activeCategory === c.label
                  ? "bg-teal/20 text-teal"
                  : "bg-border text-muted-foreground"
              }`}
            >
              {getCounts(c.label)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryChips;
