"use client";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 w-full overflow-hidden pt-16 pb-8">
      <style jsx global>{`
        /* --- FOOTER GLASS --- */
        .glass {
          backdrop-filter: blur(3px) saturate(180%);
          background: radial-gradient(
            circle,
            #fff9 0%,
            #ffdce64d 60%,
            #f9f2f4 100%
          );
          border: 1px solid #ff96b41a;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
          display: flex;
        }

        /* dark mode */
        .dark .glass {
          backdrop-filter: blur(2px) !important;
          background: radial-gradient(
            circle,
            #ffffff1a 0%,
            #2b0a14 60%,
            #3b0d19 100%
          ) !important;
          border: 1px solid #ffffff0d !important;
          border-radius: 16px !important;
        }

        /* --- SIMPLE ORB FLOAT ANIMATION --- */
        @keyframes orb-float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-12px) translateX(6px);
            opacity: 1;
          }
        }

        /* orb (rose-tinted now) */
        .orb {
          background: radial-gradient(
            circle,
            rgba(255, 182, 193, 0.35),
            /* soft rose center */ rgba(255, 182, 193, 0.15) 60%,
            transparent 100%
          );
          animation: orb-float 8s ease-in-out infinite;
          border-radius: 9999px;
        }

        /* --- LINK UNDERLINE --- */
        .footer-link {
          position: relative;
          text-decoration: none;
        }
        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 1px;
          background: currentColor;
          transition: width 0.25s ease;
          opacity: 0.5;
        }
        .footer-link:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Main footer card */}
      <div className="glass relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
        {/* Logo + description */}
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-700 text-2xl font-extrabold text-white shadow-md">
              ♻️
            </span>
            <span className="bg-gradient-to-br from-rose-200 to-rose-500 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              EcoBid
            </span>
          </a>
          <p className="text-foreground mb-6 max-w-xs text-center text-sm md:text-left">
            EcoBid connects people and companies with certified recyclers. Post
            your waste, get competitive bids, and turn trash into value.
          </p>

          {/* Socials (rose tone) */}
          <div className="mt-2 flex gap-3 text-rose-400">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-foreground transition"
            >
              🐦
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-foreground transition"
            >
              💻
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-foreground transition"
            >
              🔗
            </a>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-rose-400 uppercase">
              Platform
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Vendor Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-rose-400 uppercase">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-rose-400 uppercase">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Recycling Guides
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  API Docs
                </a>
              </li>
              <li>
                <a href="#" className="footer-link text-foreground/70">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom note */}
      <div className="text-foreground relative z-10 mt-10 text-center text-xs">
        <span>&copy; 2025 ECOBID. Turning trash into opportunity.</span>
      </div>
    </footer>
  );
}
