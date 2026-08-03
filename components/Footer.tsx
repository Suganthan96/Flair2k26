import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
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

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
};

const CONTRIBUTORS = ["Suganthan96", "sylesh7", "samuveljohnson1416", "yugindhanam"];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-background px-6 pt-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1.3fr_0.9fr]">
        <div>
          <div className="flex items-start gap-3">
            <Image
              src="/assets/FLAIR.png"
              alt={siteConfig.name}
              width={2896}
              height={2172}
              className="h-10 w-auto object-contain"
            />
            <Image
              src="/assets/grait-logo.webp"
              alt="GRAIT logo"
              width={96}
              height={96}
              className="-mt-3 h-20 w-20 object-contain"
            />
          </div>
          <p className="mt-4 text-sm text-white/60">
            LICET&apos;s flagship technical symposium. Assemble. Innovate. Elevate.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Contact Us
          </h3>

          <h4 className="mt-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            For Queries
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-white/65">
            {footerLinks.contact.queries.map((contact) => (
              <li key={contact.name} className="whitespace-nowrap">
                {contact.name} : {contact.phone}
              </li>
            ))}
          </ul>

          <h4 className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Coordinators
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-white/65">
            {footerLinks.contact.coordinators.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Mail Us
          </h3>
          <a
            href={`mailto:${footerLinks.contact.email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/65 underline decoration-white/30 underline-offset-2 transition-colors hover:text-avenger-red"
          >
            <Mail size={16} className="shrink-0" />
            {footerLinks.contact.email}
          </a>

          <ul className="mt-3 space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <a
                href={footerLinks.contact.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-avenger-red"
              >
                {footerLinks.contact.address}
              </a>
            </li>
          </ul>

          {/* No API key needed: the plain `output=embed` query form (as
              opposed to the `/maps/embed/v1/...` endpoint) works unauthenticated.
              Not wrapped in a link — the iframe is its own interactive
              document, so an outer <a> would just sit uselessly behind it. */}
          <div className="mt-3 overflow-hidden rounded-xl border border-white/15">
            <iframe
              src="https://maps.google.com/maps?q=13.0592975,80.2336586&z=16&output=embed"
              title="LICET campus location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-32 w-full grayscale invert-[92%] sm:h-36"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
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

          <p className="mt-8 text-xs text-white/40">Built with hands by</p>
          <div className="mt-3 flex gap-2">
            {CONTRIBUTORS.map((handle) => (
              <a
                key={handle}
                href={`https://github.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`@${handle}`}
                aria-label={`@${handle} on GitHub`}
                className="block h-8 w-8 overflow-hidden rounded-full border border-white/15 transition-colors hover:border-avenger-red"
              >
                {/* Plain <img> (not next/image): avatars.githubusercontent.com
                    is an external host we'd otherwise need to allowlist in
                    next.config.ts, for four tiny 32px icons that don't
                    benefit much from Next's optimizer anyway. */}
                <img
                  src={`https://github.com/${handle}.png?size=64`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
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
