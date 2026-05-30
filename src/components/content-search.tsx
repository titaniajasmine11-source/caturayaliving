"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import styles from "@/app/styles/subpages.module.css";

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
    <div className={styles.searchBox}>
      <input 
        value={query} 
        onChange={(event) => setQuery(event.target.value)} 
        placeholder="Cari layanan, artikel, atau portofolio..." 
        aria-label="Cari konten" 
      />
      <div className={styles.searchResults}>
        {results.map((item) => (
          <Link href={item.href} key={`${item.type}-${item.title}`}>
            <span>{item.type}</span>
            <strong>{item.title}</strong>
            <small>{item.summary}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
