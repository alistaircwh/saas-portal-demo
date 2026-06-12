export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0A0808] border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div className="max-w-xs">
            <div className="mb-3">
              <img src="/logo.svg" alt="Vigilant Asia" className="h-10 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm leading-6">
              Mobile Threat Defense for Malaysia, protecting iOS &amp; Android devices from real-world threats. Powered by Zimperium.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider">Get in touch</h3>
            <a
              href="mailto:info@vigilantasia.com.my"
              className="va-link-group flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <span className="va-link-underline">info@vigilantasia.com.my</span>
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Vigilant Asia. Powered by Zimperium technology.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href="/terms" className="va-link-underline text-muted-foreground hover:text-foreground text-xs transition-colors">Terms &amp; Conditions</a>
            <a href="/refund-policy" className="va-link-underline text-muted-foreground hover:text-foreground text-xs transition-colors">Refund Policy</a>
            <a href="/privacy" className="va-link-underline text-muted-foreground hover:text-foreground text-xs transition-colors">Privacy Policy</a>
            <a href="/contact" className="va-link-underline text-muted-foreground hover:text-foreground text-xs transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
