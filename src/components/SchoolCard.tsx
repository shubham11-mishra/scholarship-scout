import { ExternalLink, MapPin, School, ShieldCheck } from "lucide-react";
import { SchoolScholarship, getConfidenceBadge } from "@/data/csvScholarships";

interface SchoolCardProps {
  school: SchoolScholarship;
  index: number;
}

const SchoolCard = ({ school, index }: SchoolCardProps) => {
  const badge = getConfidenceBadge(school.scholarship_confidence);
  const link = school.scholarship_url || school.website_url;
  const hasLink = !!link;

  return (
    <div
      className="card-shine glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:glow-primary relative animate-fade-up group"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <div className="h-0.5 bg-gradient-to-r from-primary to-accent" />
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-2.5">
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-foreground leading-tight mb-0.5 truncate">
              {school.name}
            </div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1">
              <MapPin className="w-[10px] h-[10px] shrink-0" />
              <span className="truncate">{school.suburb}, {school.postcode}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0">
            <School className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-lg uppercase bg-secondary text-muted-foreground">
            {school.sector}
          </span>
          <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-lg uppercase flex items-center gap-1 ${badge.color}`}>
            <ShieldCheck className="w-[10px] h-[10px]" />
            {badge.label}
          </span>
        </div>

        {/* Note */}
        <p className="text-[12px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {school.scholarship_note}
        </p>

        {/* Checked date
        <div className="text-[11px] text-muted-foreground mb-3">
          Checked: {new Date(school.checked_at).toLocaleDateString()}
        </div> */}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-border/50">
          {school.scholarship_url && (
            <a
              href={school.scholarship_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground border-none rounded-xl px-3.5 py-2 text-xs font-semibold cursor-pointer hover:opacity-90 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              Scholarship Page <ExternalLink className="w-[11px] h-[11px]" />
            </a>
          )}
          {school.website_url && (
            <a
              href={school.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 bg-secondary text-muted-foreground border border-border rounded-xl px-3.5 py-2 text-xs font-medium cursor-pointer hover:border-primary hover:text-foreground transition-all ${
                !school.scholarship_url ? "flex-1" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              School Site <ExternalLink className="w-[11px] h-[11px]" />
            </a>
          )}
          {!hasLink && (
            <div className="flex-1 text-center text-[11px] text-muted-foreground py-2">
              No links available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
