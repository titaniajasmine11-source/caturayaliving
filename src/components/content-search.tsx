"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { ArrowRight } from "lucide-react";

type SearchItem = {
  title: string;
  summary: string;
  href: string;
  type: string;
};

export function ContentSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.toLowerCase().trim());
  const results = deferredQuery
    ? items.filter((item) => `${item.title} ${item.summary} ${item.type}`.toLowerCase().includes(deferredQuery)).slice(0, 8)
    : items.slice(0, 6);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-full text-left">
        <input 
          value={query} 
          onChange={(event) => setQuery(event.target.value)} 
          placeholder="Cari layanan, artikel, atau portofolio..." 
          aria-label="Cari konten" 
          className="w-full bg-accent-light/10 hover:bg-accent-light/20 border border-border-premium/50 focus:border-accent px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/15 text-primary placeholder-neutral-400 transition-all font-medium shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
        {results.map((item) => (
          <Link 
            href={item.href} 
            key={`${item.type}-${item.title}`}
            className="group flex flex-col gap-2 p-5 bg-accent-light/10 border border-border-premium/30 hover:border-accent rounded-2xl transition-all cursor-pointer h-full justify-between shadow-premium"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md text-accent font-bold uppercase tracking-widest w-fit">
                {item.type}
              </span>
              <strong className="text-base font-semibold text-primary group-hover:text-accent transition-colors leading-snug mt-1">
                {item.title}
              </strong>
              <p className="text-sm text-neutral-muted leading-relaxed line-clamp-2 mt-1">
                {item.summary}
              </p>
            </div>
            
            <span className="text-[13px] font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-4">
              <span>Buka {item.type}</span>
              <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <div className="p-8 text-center text-sm uppercase font-bold tracking-widest text-neutral-muted bg-accent-light/20 border border-border-premium/20 rounded-2xl mt-4">
          Tidak ada hasil pencarian yang cocok dengan kata kunci Anda.
        </div>
      )}
    </div>
  );
}
