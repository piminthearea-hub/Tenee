import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { PrintModeProvider } from "@/components/PrintModeContext";
import PrintModeToggle from "@/components/PrintModeToggle";
import ConsentModal from "@/components/ConsentModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tenee — Free Thailand Visa Paperwork Packet Generator",
  description:
    "Printable checklist + packet order for Thailand immigration. Free for elders, caregivers & expats. Not legal advice.",
  keywords: [
    "Thailand visa",
    "paperwork generator",
    "Thai letter builder",
    "retirement visa Thailand",
    "90 day reporting",
    "TM30",
    "expat Thailand",
  ],
  openGraph: {
    title: "Free Thailand Visa Packet Generator (Elder-friendly)",
    description: "Printable checklist + packet order. Not legal advice.",
    type: "website",
    locale: "en_US",
    siteName: "Tenee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Thailand Visa Packet Generator (Elder-friendly)",
    description: "Printable checklist + packet order. Not legal advice.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PrintModeProvider>
          {/* Sitewide Privacy Banner */}
          <div
            className="privacy-banner"
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              borderBottom: "1px solid rgba(239, 68, 68, 0.2)",
              padding: "0.5rem 1rem",
              textAlign: "center",
              fontSize: "0.8rem",
              color: "#ef4444",
              fontWeight: 600,
            }}
          >
            ⚠️ Privacy: Do not enter passport numbers, visa stamp images, bank statements, or other sensitive personal data.
          </div>

          {/* Global disclaimer bar */}
          <div
            className="disclaimer-bar"
            style={{
              background: "rgba(245, 158, 11, 0.08)",
              borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
              padding: "0.5rem 1rem",
              textAlign: "center",
              fontSize: "0.8rem",
              color: "#f59e0b",
              fontWeight: 500,
            }}
          >
            Tenee is a preparation and communication-template tool. Not a law firm. Not legal advice. Not representation. No guarantee. Requirements vary by office—verify locally.
          </div>

          {/* Navigation */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(10, 14, 26, 0.8)",
              backdropFilter: "blur(12px)",
              position: "sticky",
              top: 0,
              zIndex: 40,
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #f5c542, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Tenee
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#64748b",
                  fontWeight: 500,
                  padding: "2px 8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                }}
              >
                FREE
              </span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <PrintModeToggle />
              <div
                className="nav-divider"
                style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.1)", margin: "0 0.5rem" }}
              />
              <Link
                href="/wizard"
                className="btn-ghost nav-link"
                style={{ fontSize: "0.95rem", padding: "0.5rem 0.75rem", minHeight: "auto", fontWeight: 600 }}
              >
                Create Packet
              </Link>
              <Link
                href="/about"
                className="btn-ghost nav-link"
                style={{ fontSize: "0.95rem", padding: "0.5rem 0.75rem", minHeight: "auto", fontWeight: 600 }}
              >
                About Us
              </Link>
              <Link
                href="/safety"
                className="btn-ghost nav-link"
                style={{ fontSize: "0.95rem", padding: "0.5rem 0.75rem", minHeight: "auto", fontWeight: 600 }}
              >
                Safety & Allergy
              </Link>
              <Link
                href="/authorities"
                className="btn-ghost nav-link"
                style={{ fontSize: "0.9rem", padding: "0.5rem 0.75rem", minHeight: "auto" }}
              >
                Authorities
              </Link>
              <Link
                href="/entry-guide"
                className="btn-ghost nav-link"
                style={{ fontSize: "0.9rem", padding: "0.5rem 0.75rem", minHeight: "auto" }}
              >
                Entry Guide
              </Link>
              <Link
                href="/long-term-stay"
                className="btn-ghost nav-link"
                style={{ fontSize: "0.9rem", padding: "0.5rem 0.75rem", minHeight: "auto" }}
              >
                Long-Term Stay
              </Link>
              <Link
                href="/write-thai"
                className="btn-ghost nav-link"
                style={{ fontSize: "0.9rem", padding: "0.5rem 0.75rem", minHeight: "auto" }}
              >
                Write in Thai
              </Link>
            </div>

          </nav>

          <main>{children}</main>
          <ConsentModal />

          {/* Footer */}
          <footer
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "2rem 1.5rem",
              textAlign: "center",
              color: "#64748b",
              fontSize: "0.8rem",
            }}
          >
            <p style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "#94a3b8" }}>Tenee</strong> — Free Thailand
              Paperwork Preparation Tool
            </p>
            <p>
              Not a law firm. Not legal advice. Not representation. Not guaranteed
              approval. Requirements vary by office and can change. Thailand only.
            </p>
            <p style={{ marginTop: "0.5rem", color: "#2dd4bf", fontWeight: 600 }}>
              🛡️ Privacy-by-design. Data minimization. Informational use only.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
              <Link href="/terms" style={{ color: "#64748b", textDecoration: "none" }}>
                Terms of Use
              </Link>
              <Link href="/privacy" style={{ color: "#64748b", textDecoration: "none" }}>
                Privacy Notice
              </Link>
              <Link href="/limits" style={{ color: "#64748b", textDecoration: "none" }}>
                Scope & Limits
              </Link>
            </div>
          </footer>
        </PrintModeProvider>
      </body>
    </html>
  );
}
