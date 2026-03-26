import { X, ExternalLink, Check } from "lucide-react";
import { Scholarship, daysUntil, getCatBadgeVariant } from "@/data/scholarships";

interface ScholarshipModalProps {
  scholarship: Scholarship | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (id: number) => void;
}

const badgeColors: Record<string, string> = {
  teal: "bg-teal-light text-teal",
  coral: "bg-coral-light text-coral",
  gold: "bg-[hsl(39,80%,94%)] text-[hsl(39,70%,20%)]",
  gray: "bg-canvas text-muted-foreground",
};

const accentBgColors: Record<string, string> = {
  "": "bg-teal",
  coral: "bg-coral",
  gold: "bg-gold",
};

const ScholarshipModal = ({ scholarship: s, isSaved, onClose, onToggleSave }: ScholarshipModalProps) => {
  if (!s) return null;

  const catVariant = getCatBadgeVariant(s.category);

  return (
    <div
      className="fixed inset-0 z-[200] bg-foreground/55 backdrop-blur-sm flex items-center justify-center p-5 transition-opacity"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-[20px] w-full max-w-[640px] max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-7 pb-5 border-b border-border relative">
          <div className={`h-[5px] rounded-t-[20px] -mx-7 -mt-7 mb-6 ${accentBgColors[s.accentClass]}`} />
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <div className="text-[13px] text-muted-foreground mb-1">{s.school} · {s.suburb}, {s.state}</div>
              <div className="font-display text-2xl font-bold leading-tight mb-3">{s.name}</div>
              <div className="flex flex-wrap gap-1.5">
                <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase ${badgeColors[catVariant]}`}>{s.category}</span>
                <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase ${badgeColors.gray}`}>{s.sector}</span>
                <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase ${badgeColors.gray}`}>{s.gender}</span>
                {s.verified && <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase ${badgeColors.teal}`}>✓ AI Verified</span>}
              </div>
            </div>
            <button onClick={onClose} className="bg-canvas border-[1.5px] border-border rounded-lg w-[34px] h-[34px] flex items-center justify-center cursor-pointer text-muted-foreground hover:border-foreground hover:text-foreground transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-7">
          <div className="grid grid-cols-2 gap-3.5 mb-5">
            <div className="bg-canvas rounded-[10px] p-3.5">
              <div className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Value</div>
              <div className="text-lg font-extrabold text-teal">{s.value}</div>
            </div>
            <div className="bg-canvas rounded-[10px] p-3.5">
              <div className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Closing Date</div>
              <div className="text-lg font-extrabold text-foreground">{s.closingLabel} 2026</div>
            </div>
            <div className="bg-canvas rounded-[10px] p-3.5">
              <div className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Year Level</div>
              <div className="text-lg font-extrabold text-foreground">{s.yearLevel}</div>
            </div>
            <div className="bg-canvas rounded-[10px] p-3.5">
              <div className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Test Provider</div>
              <div className="text-lg font-extrabold text-foreground">{s.testProvider}</div>
            </div>
          </div>
          <div className="text-[13px] font-bold text-foreground mb-2 mt-4">About this Scholarship</div>
          <p className="text-sm text-slate leading-relaxed">{s.desc}</p>
          <div className="text-[13px] font-bold text-foreground mb-2 mt-4">Eligibility Requirements</div>
          <p className="text-sm text-slate leading-relaxed">{s.elig}</p>
        </div>
        <div className="p-5 border-t border-border flex gap-2.5 items-center">
          <button className="flex-1 bg-teal text-primary-foreground border-none rounded-[10px] py-3 px-5 font-body text-sm font-bold cursor-pointer hover:bg-teal/90 transition-colors text-center">
            View on School Website →
          </button>
          <button
            onClick={() => onToggleSave(s.id)}
            className="bg-canvas text-slate border-[1.5px] border-border rounded-[10px] py-3 px-4 font-body text-sm font-semibold cursor-pointer hover:border-teal hover:text-teal transition-all whitespace-nowrap"
          >
            {isSaved ? "★ Saved" : "☆ Shortlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipModal;
