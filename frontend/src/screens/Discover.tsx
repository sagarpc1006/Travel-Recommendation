import { useEffect, useMemo, useRef, useState } from "react";
import AppShell from "../components/AppShell";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE } from "../components/ui";
import { DestinationCard } from "../components/DestinationCard";
import { DESTINATIONS, type Destination } from "../data/destinations";
import { discoverPlaces } from "../services/discoverAPI";
import { apiPlaceToDestination, figmaCategoryToBackendCategory } from "../services/adapters";

type Go = (route: string) => void;

const RECENT_SEARCHES = ["Goa", "Munnar", "Jaipur", "Coorg", "Accessible beach destinations", "Weekend trips from Pune"];

const SORTS = [
  ["recommended", "Recommended"],
  ["carbon", "Lower Carbon"],
  ["access", "Most Accessible"],
  ["value", "Best Value"],
  ["time", "Shortest Travel Time"],
  ["popular", "Popular"],
] as const;

const TYPE_OPTS = ["Nature", "Culture", "Adventure", "Relaxation", "City Exploration", "Food & Local"];
const ACCESS_OPTS = ["Step-free access", "Accessible stay", "Accessible transport", "Minimal walking"];

type Filters = {
  types: string[];
  access: string[];
  lowerCarbon: boolean;
  publicTransport: boolean;
  ecoStays: boolean;
  maxDistance: number;
};

const EMPTY_FILTERS: Filters = {
  types: [],
  access: [],
  lowerCarbon: false,
  publicTransport: false,
  ecoStays: false,
  maxDistance: 2000,
};

function accessScore(d: Destination) {
  return d.access.reduce((n, a) => n + (a.status === "verified" ? 2 : a.status === "supported" ? 1 : 0), 0);
}

export default function Discover({ go, onExplore }: { go: Go; onExplore: (d: Destination) => void }) {
  const [query, setQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [sort, setSort] = useState<string>("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  // Real backend API state
  const [places, setPlaces] = useState<Destination[]>(DESTINATIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchTimerRef = useRef<number | null>(null);

  const activeFilterCount =
    filters.types.length +
    filters.access.length +
    (filters.lowerCarbon ? 1 : 0) +
    (filters.publicTransport ? 1 : 0) +
    (filters.ecoStays ? 1 : 0) +
    (filters.maxDistance < 2000 ? 1 : 0);

  // Fetch real destinations from Django /api/discover/
  const fetchDestinations = async (searchQuery: string, typesList: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const backendCat = typesList.length === 1 ? figmaCategoryToBackendCategory(typesList[0]) : undefined;
      const res = await discoverPlaces(searchQuery, backendCat);
      if (res && res.success && Array.isArray(res.places)) {
        const mapped = res.places.map(apiPlaceToDestination);
        setPlaces(mapped.length > 0 ? mapped : searchQuery.trim() ? [] : DESTINATIONS);
      } else {
        // Fallback to local destinations if empty response
        setPlaces(DESTINATIONS);
      }
    } catch (err: any) {
      console.warn("Discover API request failed, using local destinations:", err);
      setError("Unable to connect to live destinations server. Showing cached places.");
      setPlaces(DESTINATIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimerRef.current) {
      window.clearTimeout(searchTimerRef.current);
    }
    // Debounce API calls by 400ms for search typing
    searchTimerRef.current = window.setTimeout(() => {
      fetchDestinations(query, filters.types);
    }, 400);

    return () => {
      if (searchTimerRef.current) {
        window.clearTimeout(searchTimerRef.current);
      }
    };
  }, [query, filters.types]);

  const results = useMemo(() => {
    let list = places.filter((d) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!(`${d.name} ${d.region} ${d.bestFor.join(" ")}`.toLowerCase().includes(q))) return false;
      }
      if (filters.types.length && !filters.types.some((t) => d.bestFor.includes(t))) return false;
      if (filters.access.length) {
        const ok = filters.access.every((label) =>
          d.access.some((a) => a.label === label && a.status !== "unknown"),
        );
        if (!ok) return false;
      }
      if (filters.lowerCarbon && d.carbonKg > 45) return false;
      if (filters.publicTransport && !d.publicTransport) return false;
      if (filters.ecoStays && !d.ecoStays) return false;
      if (d.distanceKm > filters.maxDistance) return false;
      return true;
    });

    const sorters: Record<string, (a: Destination, b: Destination) => number> = {
      recommended: (a, b) => Number(b.recommended) - Number(a.recommended) || b.score - a.score,
      carbon: (a, b) => a.carbonKg - b.carbonKg,
      access: (a, b) => accessScore(b) - accessScore(a),
      value: (a, b) => a.distanceKm - b.distanceKm,
      time: (a, b) => a.distanceKm - b.distanceKm,
      popular: (a, b) => b.score - a.score,
    };
    return [...list].sort(sorters[sort]);
  }, [places, query, filters, sort]);

  function toggleIn(key: "types" | "access", v: string) {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(v) ? f[key].filter((x) => x !== v) : [...f[key], v],
    }));
  }

  return (
    <AppShell active="discover" go={go}>
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-near-black md:text-4xl">
            Discover your next destination.
          </h1>
          <p className="mt-2 text-slate-gray">Explore places that match the way you want to travel.</p>
        </div>

        {/* Search */}
        <div className="relative mt-6">
          <div
            className={`flex items-center gap-2 rounded-xl border-2 bg-card px-3 py-2 transition-colors ${
              searchFocus ? "border-emerald-500" : "border-border"
            }`}
          >
            <Icon.Search size={20} className="shrink-0 text-medium-gray" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setTimeout(() => setSearchFocus(false), 120)}
              placeholder="Search destinations, experiences or travel ideas"
              aria-label="Search destinations"
              className="h-9 flex-1 bg-transparent text-[15px] text-near-black placeholder:text-medium-gray focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="grid h-8 w-8 place-items-center rounded-md text-medium-gray hover:bg-soft-gray" aria-label="Clear search">
                <Icon.Close size={16} />
              </button>
            )}
          </div>
          {searchFocus && !query && (
            <div className="absolute inset-x-0 top-14 z-20 rounded-xl border border-border bg-card p-2 elev-modal">
              <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-medium-gray">Recent searches</p>
              <div className="flex flex-wrap gap-1.5 p-1">
                {RECENT_SEARCHES.map((r) => (
                  <button
                    key={r}
                    onMouseDown={() => setQuery(r)}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-charcoal hover:border-emerald-400 hover:bg-sage-100"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Toolbar: filters + sort + view + count */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="tertiary" icon="Sliders" onClick={() => setFiltersOpen(true)}>
            Filters {activeFilterCount > 0 && <span className="ml-1 rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">{activeFilterCount}</span>}
          </Button>

          <div className="relative">
            <Button variant="tertiary" iconRight="Chevron" className="[&_svg:last-child]:rotate-90" onClick={() => setSortOpen((v) => !v)}>
              {SORTS.find((s) => s[0] === sort)![1]}
            </Button>
            {sortOpen && (
              <div className="absolute left-0 top-11 z-20 w-52 rounded-xl border border-border bg-card p-1.5 elev-modal">
                {SORTS.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { setSort(key); setSortOpen(false); }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ${sort === key ? "bg-sage-100 text-forest-700" : "text-charcoal hover:bg-soft-gray"}`}
                  >
                    {label} {sort === key && <Icon.Check size={15} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-sm text-medium-gray">{results.length} destinations</span>

          <div className="ml-auto flex items-center gap-1">
            <div className="hidden overflow-hidden rounded-lg border border-border sm:flex">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`grid h-9 w-9 place-items-center transition-colors ${view === v ? "bg-sage-100 text-forest-700" : "text-medium-gray hover:bg-soft-gray"}`}
                  aria-label={`${v} view`}
                >
                  {v === "grid" ? <Icon.Layers size={17} /> : <Icon.Sliders size={17} />}
                </button>
              ))}
            </div>
            <Button variant="secondary" icon="Map" className="lg:hidden" onClick={() => setMapOpen(true)}>
              Map
            </Button>
          </div>
        </div>

        {/* Selected filter chips */}
        {activeFilterCount > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {[...filters.types, ...filters.access].map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-forest-700">
                {t}
                <button onClick={() => (filters.types.includes(t) ? toggleIn("types", t) : toggleIn("access", t))} aria-label={`Remove ${t}`}>
                  <Icon.Close size={12} />
                </button>
              </span>
            ))}
            {filters.lowerCarbon && <Chip label="Lower carbon" onClear={() => setFilters((f) => ({ ...f, lowerCarbon: false }))} />}
            {filters.publicTransport && <Chip label="Public transport" onClear={() => setFilters((f) => ({ ...f, publicTransport: false }))} />}
            {filters.ecoStays && <Chip label="Eco stays" onClear={() => setFilters((f) => ({ ...f, ecoStays: false }))} />}
            <button onClick={() => setFilters(EMPTY_FILTERS)} className="text-xs font-medium text-medium-gray hover:text-error hover:underline">
              Clear all
            </button>
          </div>
        )}

        {/* Content: list + map */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Results */}
          <div>
            {error && (
              <div className="mb-4 flex items-center justify-between rounded-xl border border-error/20 bg-error-soft/60 px-4 py-3 text-xs text-error">
                <div className="flex items-center gap-2">
                  <Icon.Warning size={15} />
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => fetchDestinations(query, filters.types)}
                  className="font-medium underline hover:text-near-black"
                >
                  Retry
                </button>
              </div>
            )}

            {loading && places.length === 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="overflow-hidden rounded-xl border border-border bg-card p-4 animate-pulse">
                    <div className="h-44 w-full rounded-lg bg-sage-200/60" />
                    <div className="mt-3 h-5 w-3/4 rounded bg-sage-200/70" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-sage-100" />
                    <div className="mt-4 flex gap-2">
                      <div className="h-7 w-20 rounded-full bg-sage-100" />
                      <div className="h-7 w-20 rounded-full bg-sage-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-xl border border-dashed border-mist bg-card/60 p-10 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-soft-gray text-medium-gray">
                  <Icon.Search size={22} />
                </span>
                <h3 className="mt-3 font-semibold text-near-black">No destinations found</h3>
                <p className="mt-1 text-sm text-slate-gray">Try a broader destination or remove a filter.</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Button variant="tertiary" onClick={() => setFilters(EMPTY_FILTERS)}>Clear Filters</Button>
                  <Button onClick={() => setQuery("")} icon="Search">Search Again</Button>
                </div>
              </div>
            ) : (
              <div className={view === "grid" ? "grid gap-5 sm:grid-cols-2" : "space-y-4"}>
                {results.map((d) =>
                  view === "grid" ? (
                    <DestinationCard
                      key={d.id}
                      d={d}
                      onExplore={onExplore}
                      onHover={setActiveId}
                      onLeave={() => setActiveId(null)}
                      active={activeId === d.id}
                    />
                  ) : (
                    <ListRow key={d.id} d={d} active={activeId === d.id} onHover={setActiveId} onLeave={() => setActiveId(null)} onExplore={onExplore} />
                  ),
                )}
              </div>
            )}
          </div>

          {/* Map (sticky desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <MapView results={results} activeId={activeId} setActiveId={setActiveId} onExplore={onExplore} />
            </div>
          </div>
        </div>
      </main>

      {/* Filter drawer / bottom sheet */}
      {filtersOpen && (
        <FilterSheet
          filters={filters}
          setFilters={setFilters}
          toggleIn={toggleIn}
          onClose={() => setFiltersOpen(false)}
          resultCount={results.length}
        />
      )}

      {/* Mobile full-screen map */}
      {mapOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="font-semibold text-near-black">{results.length} destinations</span>
            <button onClick={() => setMapOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-soft-gray" aria-label="Close map">
              <Icon.Close size={20} />
            </button>
          </div>
          <div className="flex-1 p-4">
            <MapView results={results} activeId={activeId} setActiveId={setActiveId} onExplore={onExplore} full />
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-forest-700">
      {label}
      <button onClick={onClear} aria-label={`Remove ${label}`}><Icon.Close size={12} /></button>
    </span>
  );
}

/* ---- List row (list view) ---- */
function ListRow({
  d,
  active,
  onHover,
  onLeave,
  onExplore,
}: {
  d: Destination;
  active: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onExplore: (d: Destination) => void;
}) {
  return (
    <button
      onClick={() => onExplore(d)}
      onMouseEnter={() => onHover(d.id)}
      onMouseLeave={onLeave}
      className={`flex w-full gap-4 rounded-xl border bg-card p-3 text-left transition-all hover:elev-card focus:outline-none focus:ring-2 focus:ring-ring/60 ${active ? "border-emerald-500" : "border-border"}`}
    >
      <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-sage-200">
        <img src={d.image} alt={`${d.name}, ${d.region}`} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs text-medium-gray"><Icon.Location size={12} /> {d.region}</div>
          <span className="inline-flex items-center gap-1 rounded-md bg-forest-700 px-1.5 py-0.5 text-primary-foreground">
            <Icon.Leaf size={11} /> <span className="font-mono text-[11px] font-semibold">{d.score}</span>
          </span>
        </div>
        <h3 className="mt-0.5 font-semibold text-near-black">{d.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-slate-gray">{d.description}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-medium-gray">
          <span className="flex items-center gap-1"><Icon.Clock size={12} /> {d.time}</span>
          <span className="flex items-center gap-1"><Icon.Carbon size={12} /> {d.carbonKg}kg</span>
        </div>
      </div>
    </button>
  );
}

/* ---- Flat Leaflet-style map ---- */
function MapView({
  results,
  activeId,
  setActiveId,
  onExplore,
  full,
}: {
  results: Destination[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  onExplore: (d: Destination) => void;
  full?: boolean;
}) {
  const active = results.find((d) => d.id === activeId) ?? null;
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-sage-100 ${full ? "h-full" : "h-[560px]"}`}
      role="group"
      aria-label={`Map of ${results.length} destinations. A textual list is available alongside.`}
    >
      {/* stylized flat field */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="dmap-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0V44" fill="none" stroke="#00000008" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dmap-grid)" />
        <path d="M-20 70% Q 40% 55% 120% 75%" fill="none" stroke="#c3ddce" strokeWidth="40" opacity="0.6" />
        <path d="M25% -20 Q 35% 45% 22% 120%" fill="none" stroke="#c3ddce" strokeWidth="26" opacity="0.5" />
      </svg>

      {/* markers */}
      {results.map((d) => {
        const on = activeId === d.id;
        return (
          <button
            key={d.id}
            onMouseEnter={() => setActiveId(d.id)}
            onClick={() => onExplore(d)}
            className="absolute -translate-x-1/2 -translate-y-full transition-transform"
            style={{ left: `${d.coords.x}%`, top: `${d.coords.y}%`, zIndex: on ? 20 : 10 }}
            aria-label={`${d.name}, score ${d.score}`}
          >
            <span className={`flex flex-col items-center ${on ? "scale-110" : ""} transition-transform`}>
              <span className={`grid place-items-center rounded-full text-white shadow-lg ring-4 ring-white transition-colors ${on ? "h-9 w-9 bg-primary" : "h-7 w-7 bg-forest-500"}`}>
                <Icon.Leaf size={on ? 17 : 14} />
              </span>
              {on && (
                <span className="mt-1 whitespace-nowrap rounded-md bg-card px-2 py-0.5 text-[11px] font-semibold text-near-black shadow">
                  {d.name} · {d.score}
                </span>
              )}
            </span>
          </button>
        );
      })}

      {/* controls */}
      <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border border-border bg-card elev-card">
        {(["Plus", "Sliders"] as IconName[]).map((ic, i) => {
          const I = Icon[ic];
          return (
            <button key={ic} className={`grid h-9 w-9 place-items-center text-charcoal hover:bg-soft-gray ${i === 0 ? "border-b border-border" : ""}`} aria-label={ic}>
              <I size={16} />
            </button>
          );
        })}
      </div>

      {/* legend */}
      <div className="absolute left-3 top-3 rounded-lg border border-border bg-card/95 px-3 py-2 text-[11px] backdrop-blur">
        <div className="flex items-center gap-1.5 text-charcoal">
          <span className="h-3 w-3 rounded-full bg-forest-500" /> Destination
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-charcoal">
          <span className="h-3 w-3 rounded-full bg-primary" /> Selected
        </div>
      </div>

      {/* preview on select */}
      {active && (
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl border border-border bg-card p-3 elev-modal">
          <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-sage-200">
            <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-near-black">{active.name}</div>
            <div className="truncate text-xs text-medium-gray">{active.region}</div>
            <div className="mt-1 flex gap-1.5">
              <Badge icon="Leaf" label={`${active.score}`} tone={TONE.verified} />
              <Badge icon="Clock" label={active.time} tone={TONE.neutral} />
            </div>
          </div>
          <Button size="sm" onClick={() => onExplore(active)}>Explore</Button>
        </div>
      )}

      <p className="sr-only">
        {results.map((d) => `${d.name} in ${d.region}, green and accessible score ${d.score} out of 100.`).join(" ")}
      </p>
    </div>
  );
}

/* ---- Filter sheet (bottom sheet mobile / right drawer desktop) ---- */
function FilterSheet({
  filters,
  setFilters,
  toggleIn,
  onClose,
  resultCount,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleIn: (key: "types" | "access", v: string) => void;
  onClose: () => void;
  resultCount: number;
}) {
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filters">
      <button className="absolute inset-0 bg-near-black/40" onClick={onClose} aria-label="Close filters" />
      <div
        className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-card sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[400px] sm:max-h-none sm:rounded-none sm:rounded-l-2xl elev-modal"
        style={{ animation: "sheet-up 300ms cubic-bezier(.16,1,.3,1)" }}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-5 py-4">
          <h2 className="text-lg font-semibold text-near-black">Filters</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-soft-gray" aria-label="Close">
            <Icon.Close size={20} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <FGroup title="Destination type">
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTS.map((t) => (
                <FilterChip key={t} label={t} on={filters.types.includes(t)} onClick={() => toggleIn("types", t)} />
              ))}
            </div>
          </FGroup>

          <FGroup title="Accessibility" hint="Only destinations with verified or supported evidence.">
            <div className="flex flex-wrap gap-2">
              {ACCESS_OPTS.map((t) => (
                <FilterChip key={t} icon="Accessibility" label={t} on={filters.access.includes(t)} onClick={() => toggleIn("access", t)} />
              ))}
            </div>
          </FGroup>

          <FGroup title="Sustainability">
            <div className="space-y-2">
              {([
                ["lowerCarbon", "Leaf", "Lower carbon"],
                ["publicTransport", "Train", "Public transport friendly"],
                ["ecoStays", "Location", "Eco-friendly stays"],
              ] as [keyof Filters, IconName, string][]).map(([key, icon, label]) => {
                const I = Icon[icon];
                const on = filters[key] as boolean;
                return (
                  <button
                    key={key}
                    onClick={() => setFilters((f) => ({ ...f, [key]: !f[key] }))}
                    className="flex w-full items-center gap-2.5 text-sm text-charcoal"
                  >
                    <span className={`grid h-5 w-5 place-items-center rounded-[5px] border-2 transition-colors ${on ? "border-primary bg-primary text-white" : "border-mist"}`}>
                      {on && <Icon.Check size={13} />}
                    </span>
                    <I size={16} className="text-emerald-500" /> {label}
                  </button>
                );
              })}
            </div>
          </FGroup>

          <FGroup title={`Max distance · ${filters.maxDistance >= 2000 ? "Any" : filters.maxDistance + " km"}`}>
            <input
              type="range"
              min={300}
              max={2000}
              step={100}
              value={filters.maxDistance}
              onChange={(e) => setFilters((f) => ({ ...f, maxDistance: Number(e.target.value) }))}
              className="w-full accent-emerald-500"
            />
          </FGroup>
        </div>

        <div className="sticky bottom-0 flex gap-2 border-t border-border bg-card/95 px-5 py-4 backdrop-blur">
          <Button variant="tertiary" className="flex-1" onClick={() => setFilters(EMPTY_FILTERS)}>Clear All</Button>
          <Button className="flex-1" onClick={onClose}>Show {resultCount} results</Button>
        </div>
      </div>
      <style>{`@keyframes sheet-up { from { opacity:0; transform: translateY(24px);} to {opacity:1; transform:none;} } @media (min-width:640px){@keyframes sheet-up{from{opacity:0;transform:translateX(24px);}to{opacity:1;transform:none;}}}`}</style>
    </div>
  );
}

function FGroup({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-near-black">{title}</h3>
      {hint && <p className="mb-2 mt-0.5 text-xs text-medium-gray">{hint}</p>}
      <div className={hint ? "" : "mt-2.5"}>{children}</div>
    </div>
  );
}

function FilterChip({ label, on, onClick, icon }: { label: string; on: boolean; onClick: () => void; icon?: IconName }) {
  const I = icon ? Icon[icon] : null;
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        on ? "border-primary bg-sage-100 text-forest-700" : "border-border text-charcoal hover:border-emerald-400"
      }`}
    >
      {I && <I size={14} className={on ? "text-forest-700" : "text-medium-gray"} />}
      {label}
      {on && <Icon.Check size={13} />}
    </button>
  );
}
