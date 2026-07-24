import Image from "next/image";
import { Mail, Phone, MapPin, Zap } from "lucide-react";
import { footerLinks, siteConfig } from "@/data/mockData";

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
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-emerald-900/20 px-6 py-16"
      style={{ background: "#05060a" }}
    >
      {/* Subtle green glow at the top */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_30%_at_50%_0%,rgba(16,185,129,0.06),transparent_60%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/licet-logo.webp"
              alt="LICET logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
             <Image
              src="/assets/FLAIR.png"
              alt="FLAIR logo"
              width={500}
              height={500}
              className="h-15 w-15 object-contain"
            />

            <span className="font-avenger text-base uppercase text-white/90">
              
            </span>
          </div>
          <p className="mt-4 text-sm text-emerald-300/40">
            LICET's flagship technical symposium. Assemble. Innovate. Elevate.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-500/70">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3">
            {footerLinks.quick.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-emerald-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-500/70">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/50">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-emerald-400/60" />
              {footerLinks.contact.email}
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-emerald-400/60" />
              {footerLinks.contact.phone}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-400/60" />
              {footerLinks.contact.address}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-500/70">
            Follow Us
          </h3>
          <div className="mt-4 flex gap-4">
            {footerLinks.social.map((social) => {
              const Icon = socialIcons[social.label] ?? InstagramIcon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/25 text-white/50 transition-all duration-500 hover:border-emerald-500/60 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                >
                  {/* Doom's power release on hover */}
                  <div className="pointer-events-none absolute -inset-6 rounded-full opacity-0 transition-all duration-700 group-hover:opacity-100">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_60%)]" />
                  </div>
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-6xl border-t border-emerald-900/20 pt-6 text-center text-xs uppercase tracking-[0.2em] text-white/30">
          <span className="inline-flex items-center gap-2">
            <Zap size={10} className="text-emerald-500/50" />
            © {new Date().getFullYear()} Flair 2k26, LICET. All rights reserved.
            <Zap size={10} className="text-emerald-500/50" />
          </span>
      </div>
    </footer>
  );
}