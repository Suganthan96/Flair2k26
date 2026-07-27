import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { footerLinks } from "@/data/mockData";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4v14h-4v-14zM8.5 8.5h3.8v1.9h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v8.05h-4v-7.14c0-1.7-.03-3.9-2.37-3.9-2.38 0-2.74 1.86-2.74 3.78v7.26h-4v-14z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
};

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-emerald-500/30 px-6 py-16">
      {/* High-visibility Repeating Background Video */}
      <video
        src="/assets/footer_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 select-none"
      />

      {/* Minimal Overlay to keep video background clearly visible while ensuring text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 backdrop-blur-[0.5px]" />

      {/* Top Accent Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

      {/* Content Grid */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="rounded-2xl border border-white/15 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/50 hover:bg-black/35">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/licet-logo.webp"
              alt="LICET logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            />
            <Image
              src="/assets/FLAIR.png"
              alt="FLAIR logo"
              width={500}
              height={500}
              className="h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            />
          </div>
          <p className="mt-4 text-xs font-medium leading-relaxed text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            LICET&apos;s flagship technical symposium. Assemble. Innovate. Elevate.
          </p>
        </div>

        {/* Quick Links */}
        <div className="rounded-2xl border border-white/15 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/50 hover:bg-black/35">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.quick.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-medium text-white/90 transition-colors hover:text-emerald-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-white/15 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/50 hover:bg-black/35">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-xs font-medium text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            <li className="flex items-start gap-2.5">
              <Mail size={15} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="break-all">{footerLinks.contact.email}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={15} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{footerLinks.contact.phone}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{footerLinks.contact.address}</span>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="rounded-2xl border border-white/15 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/50 hover:bg-black/35">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Follow Us
          </h3>
          <div className="mt-4 flex gap-3">
            {footerLinks.social.map((social) => {
              const Icon = socialIcons[social.label] ?? InstagramIcon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/25 text-white transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/25 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 mx-auto mt-10 max-w-6xl rounded-xl border border-white/15 bg-black/25 px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        © {new Date().getFullYear()} Flair 2k26, LICET. All rights reserved.
      </div>
    </footer>
  );
}
