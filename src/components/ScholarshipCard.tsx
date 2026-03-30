import { Bookmark, Check, ExternalLink, MapPin } from "lucide-react";
import { Scholarship, daysUntil, getCatBadgeVariant } from "@/data/scholarships";

interface ScholarshipCardProps {
  scholarship: Scholarship;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  onOpenDetail: (id: number) => void;
  index: number;
}

const badgeColors: Record<string, string> = {
  teal: "bg-teal-light text-primary",
  coral: "bg-coral-light text-coral",
  gold: "bg-gold-light text-accent",
  gray: "bg-muted text-muted-foreground",
};

const accentColors: Record<string, string> = {
  "": "bg-primary",
  coral: "bg-coral",
  gold: "bg-accent",
};

const ScholarshipCard = ({ scholarship: s, isSaved, onToggleSave, onOpenDetail, index }: ScholarshipCardProps) => {
  const dLeft = daysUntil(s.closing);
  const closingSoon = dLeft <= 14;
  const catVariant = getCatBadgeVariant(s.category);

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20 relative animate-fade-up group"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onOpenDetail(s.id)}
    >
      <div className={`h-0.5 ${accentColors[s.accentClass]}`} />
      {closingSoon && (
        <div className="absolute top-3.5 right-3.5 bg-destructive text-destructive-foreground text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
          ⚡ Closing Soon
        </div>
      )}
      <button
        className={`absolute top-3.5 left-3.5 w-7 h-7 rounded-lg border flex items-center justify-center cursor-pointer transition-all z-[2] ${
          isSaved ? "bg-gold-light border-accent" : "bg-card/90 border-border hover:border-accent"
        }`}
        onClick={(e) => { e.stopPropagation(); onToggleSave(s.id); }}
      >
        <Bookmark className={`w-3 h-3 ${isSaved ? "text-accent fill-accent" : "text-muted-foreground"}`} />
      </button>
      <div className="p-4 pt-4">
        <div className="flex items-start justify-between mb-3 gap-2.5">
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-foreground leading-tight mb-0.5 truncate">{s.school}</div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1">
              <MapPin className="w-[10px] h-[10px] shrink-0" />
              <span className="truncate">{s.suburb}, {s.state} · {s.sector} · {s.gender}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-base shrink-0">
            {s.logo}
          </div>
        </div>
        <div className="font-display text-[16px] font-bold text-foreground leading-tight mb-2.5">{s.name}</div>
        <div className="flex flex-wrap gap-1 mb-3">
          <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-md uppercase ${badgeColors[catVariant]}`}>
            {s.category}
          </span>
          <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-md uppercase ${badgeColors.gray}`}>
            {s.yearLevel}
          </span>
          {s.testProvider !== "None" && (
            <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-md uppercase ${badgeColors.gray}`}>
              {s.testProvider}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-muted/50 rounded-lg p-2.5">
            <div className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-0.5">Value</div>
            <div className="text-sm font-bold text-primary leading-tight">{s.value}</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-2.5">
            <div className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-0.5">Closes</div>
            <div className={`text-sm font-bold leading-tight ${closingSoon ? "text-destructive" : "text-foreground"}`}>
              {s.closingLabel} {closingSoon && <small className="text-[10px]">({dLeft}d)</small>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            {s.verified ? (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                <Check className="w-3 h-3" /> AI Verified
              </div>
            ) : (
              <div className="text-[11px] text-muted-foreground">Pending review</div>
            )}
            <div className="text-[11px] text-muted-foreground">Updated {s.updated}</div>
          </div>
          <button
            className="flex items-center gap-1 bg-primary text-primary-foreground border-none rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={(e) => { e.stopPropagation(); }}
          >
            Apply <ExternalLink className="w-[11px] h-[11px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
