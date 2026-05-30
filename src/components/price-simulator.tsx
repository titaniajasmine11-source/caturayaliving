"use client";

import { whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { useEffect, useState } from "react";
import styles from "./styles/simulator.module.css";

const rates = {
  kitchen: { basic: 1800000, standard: 2600000, premium: 3800000 },
  aluminium: { basic: 650000, standard: 900000, premium: 1250000 },
  doorWindow: { basic: 850000, standard: 1200000, premium: 1650000 },
  plafon: { gypsum: 165000, pvc: 185000, premium: 240000 },
  kanopi: { hollow: 450000, galvanis: 650000, premium: 900000 },
  partisi: { gypsum: 350000, aluminium: 700000, kaca: 950000 },
};

const packageOptions = {
  kitchen: ["basic", "standard", "premium"],
  aluminium: ["basic", "standard", "premium"],
  doorWindow: ["basic", "standard", "premium"],
  plafon: ["gypsum", "pvc", "premium"],
  kanopi: ["hollow", "galvanis", "premium"],
  partisi: ["gypsum", "aluminium", "kaca"],
};

const labels = {
  kitchen: "Kitchen Set",
  aluminium: "Kusen Aluminium",
  doorWindow: "Pintu/Jendela Aluminium",
  plafon: "Plafon",
  kanopi: "Kanopi",
  partisi: "Partisi",
};

type RateType = keyof typeof rates;
type PriceRule = { service: string; package: string; base_price: number; margin_percent?: number };

const serviceMap: Record<string, RateType> = {
  "kitchen set": "kitchen",
  "kusen aluminium": "aluminium",
  aluminium: "aluminium",
  "pintu/jendela aluminium": "doorWindow",
  "pintu jendela aluminium": "doorWindow",
  plafon: "plafon",
  kanopi: "kanopi",
  partisi: "partisi",
};

function positiveNumber(value: string, fallback = 1) {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) && nextValue > 0 ? nextValue : fallback;
}

export function PriceSimulator() {
  const [type, setType] = useState<keyof typeof rates>("kitchen");
  const [packageType, setPackageType] = useState("standard");
  const [length, setLength] = useState(3);
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("Sidareja");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [remoteRates, setRemoteRates] = useState<Partial<Record<RateType, Record<string, number>>>>({});
  const [rateSource, setRateSource] = useState("loading");

  useEffect(() => {
    let active = true;

    async function loadPriceRules() {
      try {
        const response = await fetch("/api/price-rules", { cache: "no-store" });
        const result = (await response.json()) as { ok?: boolean; rules?: PriceRule[] };

        if (!active) return;

        if (result.ok && result.rules?.length) {
          const nextRates: Partial<Record<RateType, Record<string, number>>> = {};
          for (const rule of result.rules) {
            const key = serviceMap[rule.service.toLowerCase()];
            if (!key || !rule.package || !Number.isFinite(Number(rule.base_price))) continue;
            nextRates[key] = { ...nextRates[key], [rule.package]: Math.round(Number(rule.base_price) * (1 + Number(rule.margin_percent ?? 0) / 100)) };
          }

          if (Object.keys(nextRates).length > 0) {
            setRemoteRates(nextRates);
            setRateSource("price rules Supabase");
            return;
          }
        }
        setRateSource("baseline internal");
      } catch {
        if (active) {
          setRateSource("baseline internal");
        }
      }
    }

    loadPriceRules();

    return () => {
      active = false;
    };
  }, []);

  const unit = type === "kitchen" ? length + width : type === "aluminium" || type === "doorWindow" || type === "partisi" ? length * height * quantity : length * width;
  
  // Use local fallback if remote rates are still loading or failed
  const activeRates: Record<string, number> = remoteRates[type] ?? rates[type];
  const rate = activeRates[packageType] ?? 0;
  const middleEstimate = Math.round(unit * rate);
  const lowEstimate = Math.round(middleEstimate * 0.85);
  const highEstimate = Math.round(middleEstimate * 1.18);
  const format = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  const label = labels[type];
  const message = `Halo Caturaya Living, saya ingin konsultasi hasil simulasi harga.

Nama: ${name || "-"}
Nomor WhatsApp: ${phone || "-"}
Jenis: ${label}
Paket/material: ${packageType}
Panjang: ${length} m
Lebar: ${width} m
Tinggi: ${height} m
Jumlah unit: ${quantity}
Lokasi: ${location}
Estimasi awal: ${format(lowEstimate)} - ${format(highEstimate)}

Catatan: Saya paham estimasi final menunggu survei dan pilihan material.`;

  function changeType(value: keyof typeof rates) {
    setType(value);
    setPackageType(packageOptions[value][0]);
  }

  const isLoading = rateSource === "loading";

  return (
    <div className={styles.simulator}>
      <div className={styles.simulatorForm}>
        {isLoading && (
          <div className={styles.rateLoader} aria-live="polite">
            <span className="shimmer" style={{ display: "inline-block", height: "16px", width: "100%", borderRadius: "4px" }} />
            Mengambil data referensi harga terbaru dari server...
          </div>
        )}

        <label>
          Jenis Simulasi Properti
          <select value={type} onChange={(event) => changeType(event.target.value as keyof typeof rates)}>
            <option value="kitchen">Kitchen Set</option>
            <option value="aluminium">Kusen Aluminium</option>
            <option value="doorWindow">Pintu/Jendela Aluminium</option>
            <option value="plafon">Plafon</option>
            <option value="kanopi">Kanopi</option>
            <option value="partisi">Partisi</option>
          </select>
        </label>
        
        <label>
          Kategori Paket & Material
          <select value={packageType} onChange={(event) => setPackageType(event.target.value)}>
            {packageOptions[type].map((option) => (
              <option value={option} key={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </label>

        <label>
          Panjang (meter)
          <input 
            type="number" 
            min="1" 
            step="0.5" 
            value={length} 
            onChange={(event) => setLength(positiveNumber(event.target.value))} 
            aria-label="Panjang area dalam satuan meter"
          />
        </label>

        <label>
          Lebar (meter)
          <input 
            type="number" 
            min="1" 
            step="0.5" 
            value={width} 
            onChange={(event) => setWidth(positiveNumber(event.target.value))} 
            aria-label="Lebar area dalam satuan meter"
          />
        </label>

        <label>
          Tinggi / Ketebalan (meter)
          <input 
            type="number" 
            min="0.5" 
            step="0.1" 
            value={height} 
            onChange={(event) => setHeight(positiveNumber(event.target.value))} 
            aria-label="Tinggi atau ketebalan area dalam satuan meter"
          />
        </label>

        <label>
          Jumlah Unit (Pcs)
          <input 
            type="number" 
            min="1" 
            step="1" 
            value={quantity} 
            onChange={(event) => setQuantity(positiveNumber(event.target.value))} 
            aria-label="Jumlah unit produk yang disimulasikan"
          />
        </label>

        <label>
          Lokasi Pemasangan (Kecamatan)
          <input 
            value={location} 
            onChange={(event) => setLocation(event.target.value)} 
            placeholder="Sidareja / Cilacap / Cipari" 
          />
        </label>

        <label>
          Nama Lengkap
          <input 
            value={name} 
            onChange={(event) => setName(event.target.value)} 
            placeholder="Nama Anda" 
          />
        </label>

        <label style={{ gridColumn: "1 / span 2" }}>
          Nomor WhatsApp
          <input 
            value={phone} 
            onChange={(event) => setPhone(event.target.value)} 
            placeholder="Contoh: 085119467138" 
          />
        </label>
      </div>

      <aside className={styles.estimateBox}>
        <p className={styles.eyebrow}>Estimasi Biaya Proyek</p>
        
        {isLoading ? (
          <div className="shimmer" style={{ height: "40px", width: "100%", borderRadius: "8px", margin: "8px 0" }} />
        ) : (
          <strong>{format(lowEstimate)} - {format(highEstimate)}</strong>
        )}

        <span>
          Sumber harga: <strong>{isLoading ? "Memuat..." : rateSource}</strong>.<br />
          Estimasi ini merupakan gambaran awal proyek. Harga final ditentukan setelah survei lokasi presisi, model desain, material terpilih, dan kondisi riil di lapangan.
        </span>

        <a 
          className="primary" 
          href={whatsappUrl(message)} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => trackEvent("price_simulation_whatsapp", { type, estimate: middleEstimate })}
          aria-label="Kirim simulasi harga ke WhatsApp Caturaya Living"
        >
          Kirim Estimasi ke WhatsApp
        </a>
      </aside>
    </div>
  );
}
