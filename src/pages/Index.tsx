import { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryChips from "@/components/CategoryChips";
import RecentlyUpdatedBanner from "@/components/RecentlyUpdatedBanner";
import FilterSidebar from "@/components/FilterSidebar";
import ScholarshipCard from "@/components/ScholarshipCard";
import ScholarshipModal from "@/components/ScholarshipModal";
import { SCHOLARSHIPS, Scholarship } from "@/data/scholarships";

type SortOption = "closing" | "value" | "school" | "updated";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("closing");
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    states: [] as string[],
    sectors: [] as string[],
    genders: [] as string[],
    yearLevels: [] as string[],
    valueTypes: [] as string[],
  });

  const handleSearch = useCallback(() => setActiveSearch(searchQuery), [searchQuery]);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setActiveSearch("");
    setSearchQuery("");
  }, []);

  const handleFilterSchool = useCallback((school: string) => {
    setSearchQuery(school);
    setActiveSearch(school);
  }, []);

  const toggleFilter = useCallback((group: string, value: string) => {
    setFilters((prev) => {
      const arr = (prev as any)[group] as string[];
      return { ...prev, [group]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ states: [], sectors: [], genders: [], yearLevels: [], valueTypes: [] });
    setSearchQuery("");
    setActiveSearch("");
    setActiveCategory("All");
  }, []);

  const toggleSave = useCallback((id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let data = SCHOLARSHIPS.filter((s) => {
      if (activeCategory !== "All" && s.category !== activeCategory) return false;
      if (activeSearch) {
        const q = activeSearch.toLowerCase();
        if (!s.school.toLowerCase().includes(q) && !s.name.toLowerCase().includes(q) && !s.suburb.toLowerCase().includes(q) && !s.category.toLowerCase().includes(q)) return false;
      }
      if (filters.states.length && !filters.states.includes(s.state)) return false;
      if (filters.sectors.length && !filters.sectors.includes(s.sector)) return false;
      if (filters.genders.length && !filters.genders.includes(s.gender)) return false;
      if (filters.yearLevels.length && !filters.yearLevels.includes(s.yearLevel)) return false;
      return true;
    });

    switch (sortBy) {
      case "closing": data.sort((a, b) => new Date(a.closing).getTime() - new Date(b.closing).getTime()); break;
      case "value": data.sort((a, b) => b.valueNum - a.valueNum); break;
      case "school": data.sort((a, b) => a.school.localeCompare(b.school)); break;
      case "updated": data.sort((a, b) => a.id - b.id); break;
    }
    return data;
  }, [activeCategory, activeSearch, filters, sortBy]);

  const selectedScholarship = selectedId ? SCHOLARSHIPS.find((s) => s.id === selectedId) || null : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={handleSearch} />
      <CategoryChips activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      <RecentlyUpdatedBanner onFilterSchool={handleFilterSchool} />

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pb-20 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-7 items-start animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <FilterSidebar filters={filters} onToggleFilter={toggleFilter} onClearAll={clearFilters} />

        <div>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2.5">
            <div className="text-sm text-slate">
              Showing <strong className="text-foreground font-bold">{filtered.length}</strong> scholarships
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-border rounded-lg px-3 py-1.5 font-body text-[13px] text-slate bg-card cursor-pointer outline-none"
            >
              <option value="closing">Closing Soonest</option>
              <option value="value">Highest Value</option>
              <option value="school">School Name A–Z</option>
              <option value="updated">Recently Updated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display text-xl mb-2">No scholarships found</h3>
              <p className="text-muted-foreground text-sm">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((s, i) => (
                <ScholarshipCard
                  key={s.id}
                  scholarship={s}
                  isSaved={savedIds.has(s.id)}
                  onToggleSave={toggleSave}
                  onOpenDetail={setSelectedId}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedScholarship && (
        <ScholarshipModal
          scholarship={selectedScholarship}
          isSaved={savedIds.has(selectedScholarship.id)}
          onClose={() => setSelectedId(null)}
          onToggleSave={toggleSave}
        />
      )}
    </div>
  );
};

export default Index;
