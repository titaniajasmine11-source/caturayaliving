import { whatsappUrl } from "@/lib/site";
import Link from "next/link";
import { Compass, Phone, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-48 pb-24 flex items-center justify-center">
      <section className="max-w-2xl bg-white border border-border-premium/50 rounded-[40px] p-8 sm:p-16 text-center shadow-premium flex flex-col items-center gap-6 relative overflow-hidden mx-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-2">
            <Compass size={32} className="animate-spin-slow" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">404 Error</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight">Halaman Tidak Ditemukan</h1>
          <p className="text-neutral-muted text-sm leading-relaxed max-w-md">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan ke lokasi lain. Silakan kembali ke beranda atau hubungi kami langsung via WhatsApp untuk bantuan cepat.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-6 w-full">
            <Link 
              className="text-center py-3.5 px-6 border border-border-premium/65 hover:border-accent hover:text-accent text-neutral-muted hover:bg-white text-xs font-semibold uppercase tracking-wide rounded-xl transition-all cursor-pointer bg-accent-light/10 shadow-sm"
              href="/"
            >
              Kembali ke Beranda
            </Link>
            <a 
              className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all cursor-pointer shadow-lg shadow-accent/15 group"
              href={whatsappUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Phone size={14} />
              <span>Hubungi WhatsApp</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
