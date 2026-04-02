import { useState, useMemo, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SchoolCard from "@/components/SchoolCard";
import { SchoolScholarship, loadScholarshipsFromCSV } from "@/data/csvScholarships";

type SortOption = "name" | "suburb" | "confidence";
type ConfidenceFilter = "all" | "high" | "medium" | "low" | "not_found";
type SectorFilter = "all" | "Gov" | "Non-Gov";

const Index = () => {
  const [schools, setSchools] = useState<SchoolScholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceFilter>("all");
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("all");

  useEffect(() => {
    loadScholarshipsFromCSV().then((data) => {
      setSchools(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = useCallback(() => setActiveSearch(searchQuery), [searchQuery]);

  const filtered = useMemo(() => {
    let data = schools.filter((s) => {
      // Hide schools with no scholarship URL
      if (s.scholarship_confidence === "not_found" && !s.scholarship_url && !s.website_url) return false;
      if (activeSearch) {
        const q = activeSearch.toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.suburb.toLowerCase().includes(q) &&
          !s.postcode.includes(q)
        )
          return false;
      }
      if (confidenceFilter !== "all" && s.scholarship_confidence !== confidenceFilter) return false;
      if (sectorFilter !== "all" && s.sector !== sectorFilter) return false;
      return true;
    });

    switch (sortBy) {
      case "name": data.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "suburb": data.sort((a, b) => a.suburb.localeCompare(b.suburb)); break;
      case "confidence": {
        const order = { high: 0, medium: 1, low: 2, not_found: 3 };
        data.sort((a, b) => order[a.scholarship_confidence] - order[b.scholarship_confidence]);
        break;
      }
    }
    return data;
  }, [schools, activeSearch, sortBy, confidenceFilter, sectorFilter]);

  const counts = useMemo(() => {
    const c = { all: schools.length, high: 0, medium: 0, low: 0, not_found: 0 };
    schools.forEach((s) => c[s.scholarship_confidence]++);
    return c;
  }, [schools]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={handleSearch} />

      {/* Confidence filter chips */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-3">
          Filter by Scholarship Confidence
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "high", "medium", "low", "not_found"] as ConfidenceFilter[]).map((c) => (
            <button
              key={c}
              onClick={() => setConfidenceFilter(c)}
              className={`border rounded-xl px-3.5 py-2 text-[13px] font-medium cursor-pointer transition-all select-none ${
                confidenceFilter === c
                  ? "border-primary/50 text-primary bg-teal-light glow-primary"
                  : "glass text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {c === "all" ? "All" : c === "not_found" ? "Not Found" : c.charAt(0).toUpperCase() + c.slice(1)}
              <span className={`ml-1.5 rounded-md px-1.5 py-px text-[11px] font-semibold ${
                confidenceFilter === c ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              }`}>
                {counts[c]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pb-20 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2.5">
          <div className="text-sm text-muted-foreground">
            Showing <strong className="text-foreground font-bold">{filtered.length}</strong> schools
          </div>
          <div className="flex gap-2">
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value as SectorFilter)}
              className="border border-border rounded-lg px-3 py-1.5 text-[13px] text-muted-foreground bg-card cursor-pointer outline-none"
            >
              <option value="all">All Sectors</option>
              <option value="Gov">Government</option>
              <option value="Non-Gov">Non-Government</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-border rounded-lg px-3 py-1.5 text-[13px] text-muted-foreground bg-card cursor-pointer outline-none"
            >
              <option value="name">Name A–Z</option>
              <option value="suburb">Suburb A–Z</option>
              <option value="confidence">Confidence Level</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4 animate-spin">⏳</div>
            <h3 className="font-display text-xl mb-2">Loading schools...</h3>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-xl mb-2">No schools found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s, i) => (
              <SchoolCard key={s.acara_id} school={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
