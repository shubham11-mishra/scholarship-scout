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
  teal: "bg-teal-light text-teal",
  coral: "bg-coral-light text-coral",
  gold: "bg-[hsl(39,80%,94%)] text-[hsl(39,70%,20%)]",
  gray: "bg-canvas text-muted-foreground",
};

const accentColors: Record<string, string> = {
  "": "bg-teal",
  coral: "bg-coral",
  gold: "bg-gold",
};

const ScholarshipCard = ({ scholarship: s, isSaved, onToggleSave, onOpenDetail, index }: ScholarshipCardProps) => {
  const dLeft = daysUntil(s.closing);
  const closingSoon = dLeft <= 14;
  const catVariant = getCatBadgeVariant(s.category);

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-teal/30 relative animate-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onOpenDetail(s.id)}
    >
      <div className={`h-1 ${accentColors[s.accentClass]}`} />
      {closingSoon && (
        <div className="absolute top-4 right-4 bg-coral text-primary-foreground text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
          ⚡ Closing Soon
        </div>
      )}
      <button
        className={`absolute top-4 left-4 w-[30px] h-[30px] rounded-lg border flex items-center justify-center cursor-pointer transition-all z-[2] ${
          isSaved ? "bg-gold-light border-gold" : "bg-card/90 border-border hover:border-gold"
        }`}
        onClick={(e) => { e.stopPropagation(); onToggleSave(s.id); }}
      >
        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "text-gold fill-gold" : "text-muted-foreground"}`} />
      </button>
      <div className="p-4 pt-[18px]">
        <div className="flex items-start justify-between mb-3 gap-2.5">
          <div className="flex-1">
            <div className="text-[15px] font-bold text-foreground leading-tight mb-0.5">{s.school}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-[11px] h-[11px]" />
              {s.suburb}, {s.state} · {s.sector} · {s.gender}
            </div>
          </div>
          <div className="w-[42px] h-[42px] rounded-lg bg-canvas border border-border flex items-center justify-center text-lg shrink-0">
            {s.logo}
          </div>
        </div>
        <div className="font-display text-[17px] font-bold text-foreground leading-tight mb-2.5">{s.name}</div>
        <div className="flex flex-wrap gap-1 mb-3">
          <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase ${badgeColors[catVariant]}`}>
            {s.category}
          </span>
          <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase ${badgeColors.gray}`}>
            {s.yearLevel}
          </span>
          {s.testProvider !== "None" && (
            <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase ${badgeColors.gray}`}>
              {s.testProvider}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3.5">
          <div className="bg-canvas rounded-lg p-2.5">
            <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-0.5">Value</div>
            <div className="text-sm font-bold text-teal leading-tight">{s.value}</div>
          </div>
          <div className="bg-canvas rounded-lg p-2.5">
            <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-0.5">Closes</div>
            <div className={`text-sm font-bold leading-tight ${closingSoon ? "text-coral" : "text-foreground"}`}>
              {s.closingLabel} {closingSoon && <small className="text-[10px]">({dLeft}d)</small>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            {s.verified ? (
              <div className="flex items-center gap-1 text-[11px] font-bold text-teal">
                <Check className="w-[13px] h-[13px]" /> AI Verified
              </div>
            ) : (
              <div className="text-[11px] text-muted-foreground">Pending review</div>
            )}
            <div className="text-[11px] text-muted-foreground">Updated {s.updated}</div>
          </div>
          <button
            className="flex items-center gap-1 bg-teal text-primary-foreground border-none rounded-[7px] px-3 py-1.5 text-xs font-bold cursor-pointer font-body hover:bg-teal/90 transition-colors"
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
