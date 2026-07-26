import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
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
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-background px-6 pt-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
              alt={siteConfig.name}
              width={2896}
              height={2172}
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-sm text-white/60">
            LICET&apos;s flagship technical symposium. Assemble. Innovate. Elevate.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-avenger-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3">
            {footerLinks.quick.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/65 transition-colors hover:text-avenger-red"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-avenger-gold">
            Contact Us
          </h3>

          <h4 className="mt-4 text-xs font-semibold uppercase tracking-widest text-avenger-gold">
            Coordinators
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {footerLinks.contact.coordinators.map((coordinator) => (
              <li key={coordinator.name}>
                {coordinator.name} : {coordinator.phone}
              </li>
            ))}
          </ul>

          <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-avenger-gold">
            Mail Us
          </h4>
          <a
            href={`mailto:${footerLinks.contact.email}`}
            className="mt-3 inline-flex items-center gap-2 text-sm text-white/65 underline decoration-white/30 underline-offset-2 transition-colors hover:text-avenger-red"
          >
            <Mail size={16} className="shrink-0" />
            {footerLinks.contact.email}
          </a>

          <ul className="mt-6 space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0" />
              {footerLinks.contact.phone}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              {footerLinks.contact.address}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-avenger-gold">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-avenger-red hover:text-avenger-red"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Flair 2k26, LICET. All rights reserved.
      </div>

      {/* Oversized bleed wordmark — purely decorative. Sized in vw (not rem)
          so it scales to fill the full viewport width at any breakpoint,
          rather than sitting at a fixed size anchored to one side. Clipped
          by the footer's own overflow-hidden so it never adds horizontal
          scroll even if a letter edge would otherwise poke past. */}
      <div
        aria-hidden
        className="pointer-events-none -mx-6 mt-8 select-none whitespace-nowrap text-center font-avenger uppercase leading-none text-white/5 text-[18vw]"
      >
        FLAIR2K26
      </div>
    </footer>
  );
}
