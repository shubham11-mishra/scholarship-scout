const RecentlyUpdatedBanner = ({ onFilterSchool }: { onFilterSchool: (school: string) => void }) => (
  <div className="max-w-[1100px] mx-auto mb-8 px-4 md:px-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
    <div className="bg-primary rounded-xl p-5 flex items-center gap-5 flex-wrap">
      <div className="text-2xl">🔄</div>
      <div className="flex-1">
        <strong className="text-primary-foreground text-[14px] block mb-0.5">Recently Updated</strong>
        <span className="text-primary-foreground/65 text-[12px]">Verified or updated in the last 7 days</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {[
          { school: "Scotch College", time: "2h ago" },
          { school: "MLC", time: "5h ago" },
          { school: "Geelong Grammar", time: "1d ago" },
        ].map((item) => (
          <button
            key={item.school}
            onClick={() => onFilterSchool(item.school)}
            className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-lg px-3 py-1 text-xs font-medium cursor-pointer hover:bg-primary-foreground/20 transition-colors"
          >
            {item.school} · {item.time}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default RecentlyUpdatedBanner;
