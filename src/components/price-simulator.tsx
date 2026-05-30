"use client";

import { whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { useEffect, useState } from "react";
import { Calculator, Phone, MapPin, Info, ArrowRight, User, ClipboardList, CheckCircle } from "lucide-react";
import { Modal } from "./ui/modal";

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
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

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
  
  const activeRates: Record<string, number> = remoteRates[type] ?? rates[type];
  const rate = activeRates[packageType] ?? 0;
  const middleEstimate = Math.round(unit * rate);
  const lowEstimate = Math.round(middleEstimate * 0.85);
  const highEstimate = Math.round(middleEstimate * 1.15);
  const format = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  const label = labels[type];
  const message = `Halo Eko Suyanto Workshop, saya ingin konsultasi hasil simulasi harga.
 
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left">
      
      {/* Inputs Form */}
      <div className="lg:col-span-8 bg-white border border-border-premium/50 rounded-[2px] p-6 sm:p-8 shadow-premium grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        {isLoading && (
          <div className="sm:col-span-2 bg-accent-light/40 border border-accent/25 text-accent text-sm p-4 rounded-[2px] flex items-center gap-2" aria-live="polite">
            <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
            <span className="tracking-wide">Sinkronisasi basis referensi harga terbaru dari server...</span>
          </div>
        )}

        {/* 1. Select Simulation Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary flex items-center gap-1.5 mb-1">
            <Calculator size={12} className="text-accent" />
            <span>Jenis Pekerjaan</span>
          </label>
          <select 
            value={type} 
            onChange={(event) => changeType(event.target.value as keyof typeof rates)}
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm font-semibold text-primary focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10 cursor-pointer"
          >
            <option value="kitchen">Kitchen Set</option>
            <option value="aluminium">Kusen Aluminium</option>
            <option value="doorWindow">Pintu/Jendela Aluminium</option>
            <option value="plafon">Plafon</option>
            <option value="kanopi">Kanopi</option>
            <option value="partisi">Partisi</option>
          </select>
        </div>
        
        {/* 2. Select Package/Material */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary mb-1">Kategori Material/Paket</label>
          <select 
            value={packageType} 
            onChange={(event) => setPackageType(event.target.value)}
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm font-semibold text-primary focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10 cursor-pointer"
          >
            {packageOptions[type].map((option) => (
              <option value={option} key={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Length Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary mb-1">Panjang (Meter)</label>
          <input 
            type="number" 
            min="1" 
            step="0.5" 
            value={length} 
            onChange={(event) => setLength(positiveNumber(event.target.value))} 
            aria-label="Panjang area dalam satuan meter"
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm text-primary focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10"
          />
        </div>

        {/* 4. Width Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary mb-1">Lebar (Meter)</label>
          <input 
            type="number" 
            min="1" 
            step="0.5" 
            value={width} 
            onChange={(event) => setWidth(positiveNumber(event.target.value))} 
            aria-label="Lebar area dalam satuan meter"
            disabled={type === "aluminium" || type === "doorWindow"}
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm text-primary disabled:opacity-50 disabled:cursor-not-allowed focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10"
          />
        </div>

        {/* 5. Height Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary mb-1">Tinggi / Tebal (Meter)</label>
          <input 
            type="number" 
            min="0.5" 
            step="0.1" 
            value={height} 
            onChange={(event) => setHeight(positiveNumber(event.target.value))} 
            aria-label="Tinggi atau ketebalan area dalam satuan meter"
            disabled={type === "kitchen" || type === "plafon" || type === "kanopi"}
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm text-primary disabled:opacity-50 disabled:cursor-not-allowed focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10"
          />
        </div>

        {/* 6. Quantity Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary mb-1">Jumlah Unit (Pcs)</label>
          <input 
            type="number" 
            min="1" 
            step="1" 
            value={quantity} 
            onChange={(event) => setQuantity(positiveNumber(event.target.value))} 
            aria-label="Jumlah unit produk yang disimulasikan"
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm text-primary focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10"
          />
        </div>

        {/* Divider */}
        <div className="sm:col-span-2 border-t border-border-premium/20 my-2" />

        {/* 7. Installation Location */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary flex items-center gap-1 mb-1">
            <MapPin size={12} className="text-accent" />
            <span>Kecamatan Pemasangan</span>
          </label>
          <input 
            value={location} 
            onChange={(event) => setLocation(event.target.value)} 
            placeholder="Contoh: Sidareja"
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm text-primary focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10"
          />
        </div>

        {/* 8. Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary flex items-center gap-1 mb-1">
            <User size={12} className="text-accent" />
            <span>Nama Lengkap</span>
          </label>
          <input 
            value={name} 
            onChange={(event) => setName(event.target.value)} 
            placeholder="Contoh: Bapak Tholib" 
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm text-primary focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10"
          />
        </div>

        {/* 9. Phone (Span 2) */}
        <div className="sm:col-span-2 flex flex-col gap-1">
          <label className="text-xs uppercase font-semibold tracking-wide text-primary mb-1">Nomor WhatsApp</label>
          <input 
            value={phone} 
            onChange={(event) => setPhone(event.target.value)} 
            placeholder="Contoh: 085119467138" 
            className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm text-primary focus:border-accent transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10"
          />
        </div>
      </div>

      {/* Outcome/Estimate Box */}
      <aside className="lg:col-span-4 bg-primary text-white rounded-[2px] p-8 shadow-premium border border-white/5 relative overflow-hidden flex flex-col gap-6 h-full justify-between">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
        
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-luxury-sm text-accent flex items-center gap-1.5">
            <Info size={12} />
            <span>Hasil Simulasi Estimasi</span>
          </span>
          <div className="w-8 h-[1px] bg-accent/60"></div>
          
          <div className="flex flex-col gap-1.5 mt-2">
            <span className="text-xs uppercase tracking-luxury-sm text-neutral-muted font-semibold">Rentang Anggaran</span>
            {isLoading ? (
              <div className="h-8 bg-white/5 border border-white/10 rounded-[2px] animate-pulse w-full" />
            ) : (
              <strong className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-none mt-1">
                {format(lowEstimate)} <span className="text-neutral-muted text-base font-normal">-</span> {format(highEstimate)}
              </strong>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 text-sm text-neutral-muted leading-relaxed">
          <p>
            Sumber basis data: <strong className="text-white">{isLoading ? "Menunggu..." : rateSource}</strong>.
          </p>
          <p>
            Estimasi ini dihitung berdasarkan unit volume pengerjaan standar. Harga final yang akurat disesuaikan setelah survei ukuran lokasi nyata di lapangan, detail model desain visual, material aksesoris terpilih, dan kondisi struktural riil.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => setIsInvoiceOpen(true)}
          className="w-full py-4 bg-accent hover:bg-accent-hover text-primary hover:text-primary-dark text-center rounded-[2px] text-xs font-semibold tracking-wide uppercase shadow-sm transition-all flex items-center justify-center gap-2 group mt-4 cursor-pointer border-0 outline-none select-none" 
          aria-label="Buka detail rincian simulasi harga"
        >
          <ClipboardList size={12} />
          <span>Lihat Detail Estimasi</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      {/* Detail Invoice Summary Modal */}
      <Modal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        title="Lembar Rincian Estimasi Harga"
        size="lg"
      >
        <div className="flex flex-col gap-6 text-left">
          
          {/* Invoice Header */}
          <div className="border-b border-border-premium/30 pb-5">
            <h4 className="text-base font-semibold text-primary uppercase tracking-luxury">Eko Suyanto Workshop</h4>
            <p className="text-xs text-neutral-muted">Spesialis Interior, Kusen & Jasa Renovasi Properti · Sidareja, Cilacap</p>
            <div className="flex justify-between items-center text-[10px] text-neutral-400 font-semibold tracking-wider mt-4 uppercase">
              <span>Simulasi Mandiri</span>
              <span>Tanggal: {new Date().toLocaleDateString("id-ID")}</span>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs border-b border-border-premium/30 pb-5">
            <div>
              <span className="text-[10px] text-neutral-muted uppercase font-bold block mb-1">Nama Pelanggan</span>
              <span className="font-semibold text-primary">{name || "-"}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-muted uppercase font-bold block mb-1">WhatsApp</span>
              <span className="font-semibold text-primary">{phone || "-"}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-muted uppercase font-bold block mb-1">Lokasi Pemasangan</span>
              <span className="font-semibold text-primary">{location}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-muted uppercase font-bold block mb-1">Jenis Pekerjaan</span>
              <span className="font-semibold text-primary">{label}</span>
            </div>
          </div>

          {/* Itemized Calculations */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-neutral-muted uppercase font-bold tracking-wider">Item Pekerjaan & Ukuran</span>
            
            <div className="bg-white border border-border-premium/40 rounded-[2px] overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-accent-light/50 border-b border-border-premium/30 font-bold uppercase tracking-wider text-[10px] text-neutral-500">
                  <tr>
                    <th className="px-4 py-3">Deskripsi</th>
                    <th className="px-4 py-3">Ukuran</th>
                    <th className="px-4 py-3 text-right">Tarif Dasar / Satuan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-premium/20">
                  <tr>
                    <td className="px-4 py-3">
                      <div className="font-medium text-primary capitalize">{label}</div>
                      <div className="text-[10px] text-neutral-muted uppercase tracking-luxury-sm mt-0.5">Paket: {packageType}</div>
                    </td>
                    <td className="px-4 py-3 text-neutral-muted">
                      {type === "kitchen" && `${length}m + ${width}m = ${unit.toFixed(1)}m lari`}
                      {type === "plafon" && `${length}m x ${width}m = ${unit.toFixed(1)} m²`}
                      {type === "kanopi" && `${length}m x ${width}m = ${unit.toFixed(1)} m²`}
                      {type === "partisi" && `${length}m x ${height}m x ${quantity} unit = ${unit.toFixed(1)} m²`}
                      {(type === "aluminium" || type === "doorWindow") && `${length}m x ${height}m x ${quantity} unit = ${unit.toFixed(1)} m²`}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-primary">
                      {format(rate)} / {type === "kitchen" ? "m lari" : "m²"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Block */}
          <div className="p-5 bg-primary text-white rounded-[2px] border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
            <div>
              <span className="text-[10px] text-accent uppercase font-bold tracking-luxury-sm">Rekomendasi Anggaran (Kisaran)</span>
              <div className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                {format(lowEstimate)} - {format(highEstimate)}
              </div>
            </div>
            <div className="text-[10px] text-neutral-400 text-left sm:text-right max-w-[200px] leading-relaxed">
              *Rencana Anggaran Biaya (RAB) resmi dikeluarkan setelah survey lapangan resmi.
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border-premium/20 mt-2">
            <button
              onClick={() => setIsInvoiceOpen(false)}
              className="px-4 py-2.5 border border-border-premium hover:border-primary text-neutral-muted hover:text-primary rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Tutup
            </button>
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("price_simulation_whatsapp", { type, estimate: middleEstimate })}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary px-6 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wide transition-all shadow-md cursor-pointer"
            >
              <Phone size={12} />
              <span>Kirim Rincian ke WhatsApp</span>
            </a>
          </div>
        </div>
      </Modal>

      </aside>
    </div>
  );
}
