import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { stateNameMap } from "@/lib/uhi-data";

type Datum = { name: string; value: number };

export function IndiaMap({ data, max, onSelect, selected }: { data: Datum[]; max: number; onSelect?: (name: string) => void; selected?: string | null }) {
  const [geoData, setGeoData] = useState<unknown>(null);
  const [hover, setHover] = useState<{ name: string; value: number; x: number; y: number } | null>(null);

  useEffect(() => {
    fetch("/maps/india-states.json").then((r) => r.json()).then(setGeoData);
  }, []);

  const valueByState = new Map<string, number>();
  data.forEach((d) => {
    const key = stateNameMap[d.name] ?? d.name;
    valueByState.set(key, d.value);
  });

  const colorFor = (v: number | undefined) => {
    if (!v) return "color-mix(in oklab, var(--color-navy) 6%, white)";
    const intensity = Math.min(1, v / max);
    // Brand-aligned scale: pale cream → amber/coral
    return `color-mix(in oklab, var(--color-bar-coral) ${Math.round(15 + intensity * 80)}%, var(--color-cream))`;
  };

  return (
    <div className="relative w-full">
      {geoData ? (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [82.8, 22.5], scale: 900 }}
          width={600}
          height={620}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoData as object}>

            {({ geographies }: { geographies: Array<{ rsmKey: string; properties: { st_nm: string } }> }) =>
              geographies.map((geo) => {
                const name = geo.properties.st_nm;
                const v = valueByState.get(name);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e: React.MouseEvent) => setHover({ name, value: v ?? 0, x: e.clientX, y: e.clientY })}
                    onMouseMove={(e: React.MouseEvent) => setHover((h) => h && { ...h, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      default: {
                        fill: colorFor(v),
                        stroke: "var(--color-navy)",
                        strokeWidth: 0.4,
                        outline: "none",
                      },
                      hover: {
                        fill: "var(--color-navy)",
                        stroke: "var(--color-navy)",
                        strokeWidth: 0.6,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: { fill: "var(--color-navy)", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      ) : (
        <div className="h-[420px] grid place-items-center text-sm text-muted-foreground">Loading map…</div>
      )}

      {hover && (
        <div
          className="fixed z-50 pointer-events-none bg-[var(--color-navy)] text-white text-xs px-3 py-2 rounded shadow-lg"
          style={{ left: hover.x + 12, top: hover.y + 12 }}
        >
          <div className="font-semibold">{hover.name}</div>
          <div className="opacity-90">{hover.value.toLocaleString("en-IN")}</div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex items-center gap-3">
        <span className="text-[11px] text-muted-foreground">Low</span>
        <div
          className="flex-1 h-2.5 rounded"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--color-bar-coral) 15%, var(--color-cream)), color-mix(in oklab, var(--color-bar-coral) 95%, var(--color-cream)))",
          }}
        />
        <span className="text-[11px] text-muted-foreground">High · {max.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}
