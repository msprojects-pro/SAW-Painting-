export function Footer() {
  return (
    <footer className="bg-[#0B1B36] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a
              href="#home"
              className="inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2878E5] rounded-sm mb-4"
            >
              <span
                aria-hidden="true"
                className="w-9 h-9 bg-[#1746A2] text-white flex items-center justify-center rounded-sm border border-[#2878E5] font-bold text-xs tracking-tight shrink-0"
              >
                S.A.W
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display font-extrabold text-lg tracking-tight text-white">
                  S.A.W
                </span>
                <span className="font-display font-semibold text-[11px] tracking-[0.12em] uppercase text-[#2878E5] mt-0.5">
                  Painting, Decorating &amp; Flooring
                </span>
              </span>
            </a>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              Reliable Service. Quality Work.
            </p>
            <p className="text-xs text-white/60 mt-2">
              &ldquo;For all your decorating needs, reliable and quality work guaranteed.&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs font-semibold tracking-[0.14em] uppercase text-[#2878E5] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-4">
            <h3 className="font-display text-xs font-semibold tracking-[0.14em] uppercase text-[#2878E5] mb-4">
              Contact Information
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="tel:+447725746013"
                  className="text-white/85 hover:text-white transition-colors tabular-nums"
                >
                  +44 7725 746013
                </a>
              </li>
              <li>
                <a
                  href="mailto:Stuwalton@hotmail.co.uk"
                  className="text-white/85 hover:text-white transition-colors break-all"
                >
                  Stuwalton@hotmail.co.uk
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447725746013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2878E5] hover:text-white transition-colors font-medium"
                >
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <p>&copy; 2026 S.A.W Painting, Decorating &amp; Flooring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
