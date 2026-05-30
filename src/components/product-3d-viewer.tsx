"use client";

import React, { useState, useRef } from "react";
import { Move, RefreshCw, Hammer, HardHat, Compass } from "lucide-react";

interface Product3DViewerProps {
  category: string;
  initialMaterial?: string;
}

interface BoxProps {
  w: number;
  h: number;
  d: number;
  x?: number;
  y?: number;
  z?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  faceColors?: Record<string, string>;
}

// Solid 3D Box drawing using CSS 3D translation & rotation
function Cube({ w, h, d, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, faceColors = {} }: BoxProps) {
  const defaults = {
    front: "bg-neutral-200 border border-neutral-300/40",
    back: "bg-neutral-300 border border-neutral-400/40",
    left: "bg-neutral-400 border border-neutral-500/40",
    right: "bg-neutral-400 border border-neutral-500/40",
    top: "bg-neutral-100 border border-neutral-200/40",
    bottom: "bg-neutral-500 border border-neutral-600/40",
  };

  const faces = {
    front: `${faceColors.front || defaults.front} absolute inset-0 transition-colors duration-500`,
    back: `${faceColors.back || defaults.back} absolute inset-0 transition-colors duration-500`,
    left: `${faceColors.left || defaults.left} absolute top-0 bottom-0 transition-colors duration-500`,
    right: `${faceColors.right || defaults.right} absolute top-0 bottom-0 transition-colors duration-500`,
    top: `${faceColors.top || defaults.top} absolute left-0 right-0 transition-colors duration-500`,
    bottom: `${faceColors.bottom || defaults.bottom} absolute left-0 right-0 transition-colors duration-500`,
  };

  return (
    <div
      style={{
        position: "absolute",
        width: `${w}px`,
        height: `${h}px`,
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Front */}
      <div className={faces.front} style={{ transform: `translate3d(0, 0, ${d / 2}px)` }} />
      {/* Back */}
      <div className={faces.back} style={{ transform: `translate3d(0, 0, ${-d / 2}px) rotateY(180deg)` }} />
      {/* Left */}
      <div className={faces.left} style={{ width: `${d}px`, transform: `translate3d(${-d / 2}px, 0, 0) rotateY(-90deg)`, left: 0 }} />
      {/* Right */}
      <div className={faces.right} style={{ width: `${d}px`, transform: `translate3d(${w - d / 2}px, 0, 0) rotateY(90deg)`, left: 0 }} />
      {/* Top */}
      <div className={faces.top} style={{ height: `${d}px`, transform: `translate3d(0, ${-d / 2}px, 0) rotateX(90deg)`, top: 0 }} />
      {/* Bottom */}
      <div className={faces.bottom} style={{ height: `${d}px`, transform: `translate3d(0, ${h - d / 2}px, 0) rotateX(-90deg)`, top: 0 }} />
    </div>
  );
}

const materials = [
  { name: "Warm Wood (Kayu Jati)", theme: "wood", colors: { front: "bg-amber-800 border-amber-900/30", back: "bg-amber-900 border-amber-950/30", left: "bg-amber-850 border-amber-900/30", right: "bg-amber-850 border-amber-900/30", top: "bg-amber-700 border-amber-800/30", bottom: "bg-amber-950 border-black/30" } },
  { name: "Graphite Dark (HPL Modern)", theme: "graphite", colors: { front: "bg-zinc-800 border-zinc-900/30", back: "bg-zinc-900 border-zinc-950/30", left: "bg-zinc-850 border-zinc-900/30", right: "bg-zinc-850 border-zinc-900/30", top: "bg-zinc-700 border-zinc-800/30", bottom: "bg-zinc-950 border-black/30" } },
  { name: "Aluminium Silver (Ketahanan Pesisir)", theme: "aluminium", colors: { front: "bg-slate-300 border-slate-400/30", back: "bg-slate-400 border-slate-500/30", left: "bg-slate-350 border-slate-400/30", right: "bg-slate-350 border-slate-400/30", top: "bg-slate-200 border-slate-300/30", bottom: "bg-slate-500 border-slate-600/30" } },
  { name: "Pure White Clean (Minimalis)", theme: "white", colors: { front: "bg-white border-neutral-200/50", back: "bg-neutral-100 border-neutral-200/50", left: "bg-neutral-50 border-neutral-200/50", right: "bg-neutral-50 border-neutral-200/50", top: "bg-neutral-100 border-neutral-200/50", bottom: "bg-neutral-200 border-neutral-300/50" } }
];

export function Product3DViewer({ category, initialMaterial = "wood" }: Product3DViewerProps) {
  const [rotation, setRotation] = useState({ x: -15, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState(materials.find(m => m.theme === initialMaterial) || materials[0]);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { x: rotation.x, y: rotation.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setRotation({
      x: Math.max(-60, Math.min(60, rotationStart.current.x - dy * 0.5)),
      y: rotationStart.current.y + dx * 0.5
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const resetRotation = () => {
    setRotation({ x: -15, y: 45 });
  };

  const currentColors = activeMaterial.colors;

  // Custom 3D structures based on active category
  const render3DModel = () => {
    const slug = category.toLowerCase().replaceAll(" ", "-");

    switch (slug) {
      case "kitchen-set":
        return (
          <>
            {/* Bottom Cabinet */}
            <Cube w={120} h={80} d={80} x={-60} y={10} z={0} faceColors={currentColors} />
            {/* Countertop */}
            <Cube 
              w={130} h={10} d={86} x={-65} y={0} z={0} 
              faceColors={{
                front: "bg-neutral-900 border border-neutral-950/20",
                back: "bg-neutral-900 border border-neutral-950/20",
                left: "bg-neutral-900 border border-neutral-950/20",
                right: "bg-neutral-900 border border-neutral-950/20",
                top: "bg-neutral-950 border border-black/20",
                bottom: "bg-neutral-900 border border-neutral-950/20"
              }} 
            />
            {/* Top Cabinet */}
            <Cube w={120} h={50} d={40} x={-60} y={-95} z={-20} faceColors={currentColors} />
          </>
        );

      case "kusen-kayu":
      case "kusen-aluminium":
        const frameColor = slug === "kusen-aluminium" 
          ? { front: "bg-slate-400 border border-slate-500", back: "bg-slate-400 border border-slate-500", left: "bg-slate-500", right: "bg-slate-500", top: "bg-slate-300", bottom: "bg-slate-600" }
          : currentColors;

        return (
          <>
            {/* Left frame */}
            <Cube w={12} h={150} d={40} x={-60} y={-75} z={0} faceColors={frameColor} />
            {/* Right frame */}
            <Cube w={12} h={150} d={40} x={48} y={-75} z={0} faceColors={frameColor} />
            {/* Top frame */}
            <Cube w={120} h={12} d={40} x={-60} y={-75} z={0} faceColors={frameColor} />
            {/* Bottom frame */}
            <Cube w={120} h={12} d={40} x={-60} y={63} z={0} faceColors={frameColor} />
            {/* Glass panel */}
            <div 
              style={{
                position: "absolute",
                width: "96px",
                height: "126px",
                transform: "translate3d(-48px, -63px, 0px)",
                background: "rgba(186, 230, 253, 0.4)",
                border: "1px solid rgba(14, 165, 233, 0.35)",
                boxShadow: "inset 0 0 15px rgba(14, 165, 233, 0.2)"
              }}
            />
          </>
        );

      case "plafon":
        return (
          <>
            {/* Base ceiling panel */}
            <Cube w={160} h={10} d={160} x={-80} y={-45} z={0} faceColors={currentColors} />
            {/* Drop layer */}
            <Cube 
              w={120} h={12} d={120} x={-60} y={-35} z={0} 
              faceColors={{
                ...currentColors,
                bottom: "bg-amber-100 shadow-[inset_0_0_20px_rgba(251,191,36,0.3)] border border-amber-200/40"
              }} 
            />
            {/* Tiny center fixture */}
            <Cube w={30} h={15} d={30} x={-15} y={-23} z={0} faceColors={{ front: "bg-yellow-400", back: "bg-yellow-400", left: "bg-yellow-400", right: "bg-yellow-400", top: "bg-yellow-300", bottom: "bg-yellow-100" }} />
          </>
        );

      case "kanopi":
        return (
          <>
            {/* Supporting columns */}
            <Cube w={10} h={110} d={10} x={-65} y={-20} z={50} faceColors={currentColors} />
            {/* Supporting columns right */}
            <Cube w={10} h={110} d={10} x={55} y={-20} z={50} faceColors={currentColors} />
            {/* Roof framework */}
            <Cube w={140} h={8} d={120} x={-70} y={-30} z={0} rx={-8} faceColors={currentColors} />
            {/* Translucent polycarbonate panel */}
            <div 
              style={{
                position: "absolute",
                width: "136px",
                height: "116px",
                transform: "translate3d(-68px, -29px, 2px) rotateX(-8deg)",
                background: "rgba(224, 242, 254, 0.45)",
                border: "1px solid rgba(56, 189, 248, 0.3)"
              }}
            />
          </>
        );

      case "pagar-gerbang":
        return (
          <>
            {/* Stone pillars */}
            <Cube 
              w={26} h={130} d={26} x={-78} y={-65} z={0} 
              faceColors={{ front: "bg-neutral-500 border border-neutral-600", back: "bg-neutral-600", left: "bg-neutral-550", right: "bg-neutral-550", top: "bg-neutral-400", bottom: "bg-neutral-700" }} 
            />
            <Cube 
              w={26} h={130} d={26} x={52} y={-65} z={0} 
              faceColors={{ front: "bg-neutral-500 border border-neutral-600", back: "bg-neutral-600", left: "bg-neutral-550", right: "bg-neutral-550", top: "bg-neutral-400", bottom: "bg-neutral-700" }} 
            />
            {/* Gate frame */}
            <Cube w={104} h={100} d={8} x={-52} y={-50} z={0} faceColors={currentColors} />
            {/* Timber style slats inside frame */}
            <div className="absolute inset-y-0 flex flex-col justify-between py-2" style={{ width: "100px", transform: "translate3d(-50px, -45px, 2px)" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-2 w-full bg-amber-700/80 border border-amber-800/40" />
              ))}
            </div>
          </>
        );

      case "partisi":
        return (
          <>
            {/* Top track */}
            <Cube w={130} h={10} d={24} x={-65} y={-70} z={0} faceColors={currentColors} />
            {/* Divider frame 1 */}
            <Cube w={60} h={120} d={8} x={-60} y={-60} z={-2} faceColors={currentColors} />
            {/* Divider frame 2 */}
            <Cube w={60} h={120} d={8} x={0} y={-60} z={2} faceColors={currentColors} />
            {/* Glass partition left */}
            <div style={{ position: "absolute", width: "52px", height: "112px", transform: "translate3d(-56px, -56px, -2px)", background: "rgba(186, 230, 253, 0.25)", border: "1px solid rgba(14,165,233,0.2)" }} />
            {/* Glass partition right */}
            <div style={{ position: "absolute", width: "52px", height: "112px", transform: "translate3d(4px, -56px, 2px)", background: "rgba(186, 230, 253, 0.25)", border: "1px solid rgba(14,165,233,0.2)" }} />
          </>
        );

      case "lemari-custom":
        return (
          <>
            {/* Wardrobe frame structure */}
            <Cube w={100} h={150} d={60} x={-50} y={-75} z={0} faceColors={currentColors} />
            {/* Sliding mirror door left */}
            <div 
              className="border border-neutral-300"
              style={{
                position: "absolute",
                width: "46px",
                height: "142px",
                transform: "translate3d(-47px, -71px, 32px)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(220,225,230,0.5) 100%)",
                boxShadow: "inset 0 0 10px rgba(255,255,255,0.5)"
              }}
            />
            {/* Sliding wood door right */}
            <Cube w={46} h={142} d={6} x={1} y={-71} z={35} faceColors={currentColors} />
          </>
        );

      case "perabotan-custom":
        return (
          <>
            {/* Modern Table Top */}
            <Cube w={130} h={10} d={70} x={-65} y={0} z={0} faceColors={currentColors} />
            {/* Leg front-left */}
            <Cube w={6} h={70} d={6} x={-60} y={10} z={28} faceColors={{ front: "bg-zinc-800", back: "bg-zinc-800", left: "bg-zinc-900", right: "bg-zinc-900", top: "bg-zinc-700", bottom: "bg-zinc-950" }} />
            {/* Leg front-right */}
            <Cube w={6} h={70} d={6} x={54} y={10} z={28} faceColors={{ front: "bg-zinc-800", back: "bg-zinc-800", left: "bg-zinc-900", right: "bg-zinc-900", top: "bg-zinc-700", bottom: "bg-zinc-950" }} />
            {/* Leg back-left */}
            <Cube w={6} h={70} d={6} x={-60} y={10} z={-28} faceColors={{ front: "bg-zinc-800", back: "bg-zinc-800", left: "bg-zinc-900", right: "bg-zinc-900", top: "bg-zinc-700", bottom: "bg-zinc-950" }} />
            {/* Leg back-right */}
            <Cube w={6} h={70} d={6} x={54} y={10} z={-28} faceColors={{ front: "bg-zinc-800", back: "bg-zinc-800", left: "bg-zinc-900", right: "bg-zinc-900", top: "bg-zinc-700", bottom: "bg-zinc-950" }} />
          </>
        );

      case "jasa-bangunan":
        return (
          <>
            {/* Green base grass block */}
            <Cube 
              w={140} h={8} d={140} x={-70} y={50} z={0} 
              faceColors={{ front: "bg-emerald-800/90", back: "bg-emerald-800/90", left: "bg-emerald-850/90", right: "bg-emerald-850/90", top: "bg-emerald-600", bottom: "bg-emerald-950" }} 
            />
            {/* Red brick wall structure */}
            <Cube 
              w={90} h={70} d={14} x={-45} y={-20} z={-10} 
              faceColors={{ front: "bg-red-800/90 border border-red-900/30", back: "bg-red-950", left: "bg-red-900", right: "bg-red-900", top: "bg-red-700", bottom: "bg-neutral-600" }} 
            />
            {/* Concrete pillar */}
            <Cube 
              w={16} h={80} d={16} x={45} y={-30} z={20} 
              faceColors={{ front: "bg-neutral-300 border border-neutral-400", back: "bg-neutral-400", left: "bg-neutral-350", right: "bg-neutral-350", top: "bg-neutral-200", bottom: "bg-neutral-500" }} 
            />
          </>
        );

      default:
        // Default rotating sample texture block for HPL / others
        return (
          <Cube w={100} h={100} d={100} x={-50} y={-50} z={0} faceColors={currentColors} />
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full text-left">
      {/* 3D Canvas area */}
      <div className="flex-1 min-h-[320px] md:min-h-[400px] bg-neutral-950 rounded-[2px] relative overflow-hidden flex items-center justify-center select-none shadow-inner border border-white/5">
        
        {/* Helper overlays */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 text-[11px] text-neutral-400 font-medium tracking-wider z-20">
          <div className="flex items-center gap-1">
            <Compass size={11} className="text-accent animate-spin-slow" />
            <span>KONTROL ROTASI 3D</span>
          </div>
          <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
            X: {Math.round(rotation.x)}° | Y: {Math.round(rotation.y)}°
          </div>
        </div>

        <button 
          onClick={resetRotation}
          className="absolute top-4 right-4 p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2px] text-neutral-300 hover:text-white transition-colors duration-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 z-20 focus:outline-none"
          title="Reset Sudut Pandang"
        >
          <RefreshCw size={11} />
          <span className="hidden sm:inline text-[10px]">Reset</span>
        </button>

        {/* Floating gesture guide */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 pointer-events-none text-neutral-500 text-xs font-medium z-20">
          <Move size={12} className="animate-pulse" />
          <span>Klik & Geser untuk memutar desain</span>
        </div>

        {/* 3D Scene Viewport */}
        <div 
          className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            perspective: "1000px",
            perspectiveOrigin: "center center",
          }}
        >
          {/* Rotate Pivot Anchor */}
          <div
            style={{
              position: "relative",
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? "none" : "transform 0.30s ease-out",
            }}
          >
            {render3DModel()}
          </div>
        </div>
      </div>

      {/* Control info sidebar */}
      <div className="w-full md:w-[240px] flex flex-col gap-5 justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-luxury text-accent block mb-1">Pilih Finishing</span>
          <h4 className="text-lg font-semibold text-primary capitalize leading-tight mb-2">
            {category.replaceAll("-", " ")}
          </h4>
          <p className="text-xs text-neutral-muted leading-relaxed mb-4">
            Sesuaikan material permukaan untuk melihat visualisasi tekstur HPL, logam, atau serat kayu jati.
          </p>

          <div className="flex flex-col gap-2">
            {materials.map((mat) => (
              <button
                key={mat.theme}
                onClick={() => setActiveMaterial(mat)}
                className={`w-full text-left px-3.5 py-2.5 rounded-[2px] border text-xs font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  activeMaterial.theme === mat.theme
                    ? "bg-accent border-accent text-primary"
                    : "bg-white border-border-premium text-neutral-muted hover:border-accent hover:text-accent"
                }`}
              >
                <span>{mat.name.split(" ")[0]}</span>
                <span className="text-[10px] opacity-75 font-normal italic">
                  {mat.theme === "wood" ? "Natural" : mat.theme === "graphite" ? "HPL Matte" : mat.theme === "aluminium" ? "Metal" : "Solid"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border-premium/50 p-4 rounded-[2px] shadow-sm flex flex-col gap-2">
          <div className="flex gap-2 items-center text-xs font-semibold text-neutral-muted">
            <Hammer size={12} className="text-accent" />
            <span className="uppercase tracking-wide">Workshop Standar</span>
          </div>
          <p className="text-[11px] text-neutral-muted leading-relaxed">
            Diproduksi dengan bahan multiplek plywood/blockboard tebal 18mm & frame aluminium kokoh di Sidareja.
          </p>
        </div>
      </div>
    </div>
  );
}
