"use client";

import Link from "next/link";
import ScamWarning from "@/components/ScamWarning";
import PrintPageButton from "@/components/PrintPageButton";

export default function AuthoritiesPage() {
    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
            <div className="animate-fade-in" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text-teal">Relevant Authorities</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>
                    Official links to Thai government portals. Verify your local requirements directly.
                </p>
            </div>

            <ScamWarning />

            <div style={{ marginBottom: "2rem" }}>
                <Link href="/legal-claims" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    padding: "1rem",
                    borderRadius: "12px",
                    color: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 4px 15px rgba(139, 92, 246, 0.2)"
                }}>
                    ⚖️ Need to organize facts for a claim? Try the Legal Claims Organizer
                </Link>
            </div>

            <div style={{ display: "grid", gap: "1.25rem" }}>
                <a
                    href="https://www.lawyerscouncil.or.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "block",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "2px solid rgba(45, 212, 191, 0.3)",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.2s ease",
                    }}
                    className="hover:border-teal-500 hover:bg-white/5"
                >
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.25rem" }}>
                        สภาทนายความ ในพระบรมราชูปถัมภ์ (Lawyers Council of Thailand)
                    </h2>
                    <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                        www.lawyerscouncil.or.th
                    </div>
                    <div style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                        <p style={{ fontWeight: 700, marginBottom: "0.5rem", color: "#fff" }}>What this is for:</p>
                        <ul style={{ paddingLeft: "1.2rem", marginBottom: "1rem" }}>
                            <li>Verify that a person is a licensed Thai lawyer.</li>
                            <li>Useful when someone claims they can represent you in court, file a case, or provide notarial services.</li>
                        </ul>

                        <p style={{ fontWeight: 700, marginBottom: "0.5rem", color: "#fff" }}>How to verify:</p>
                        <ul style={{ paddingLeft: "1.2rem", marginBottom: "1rem" }}>
                            <li>Ask for the lawyer’s license number.</li>
                            <li>Verify using official Lawyers Council channels (official website contact/hotline and official tools).</li>
                            <li>If you are unsure, contact the Lawyers Council to confirm.</li>
                        </ul>

                        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "1rem", borderRadius: "10px", marginBottom: "1rem" }}>
                            <p style={{ color: "#f87171", fontWeight: 700, marginBottom: "0.25rem" }}>🛑 Privacy Warning</p>
                            <p style={{ fontSize: "0.85rem", color: "#fca5a5" }}>Do not send passport photos, bank statements, or other sensitive documents when asking for verification.</p>
                        </div>

                        <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                            <em>Note: The "สภาทนายความ On Mobile" official app is also available for checking license status.</em>
                        </p>
                    </div>
                </a>

                <div style={{
                    background: "rgba(59, 130, 246, 0.05)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "16px",
                    padding: "1.5rem"
                }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#60a5fa", marginBottom: "0.75rem" }}>
                        ⚖️ Court representation requires a licensed Thai lawyer
                    </h3>
                    <ul style={{ paddingLeft: "1.2rem", fontSize: "0.95rem", lineHeight: 1.5, color: "#cbd5e1" }}>
                        <li style={{ marginBottom: "0.5rem" }}>In Thailand, appearing in court and handling litigation filings on someone else’s behalf should be done by a licensed Thai lawyer.</li>
                        <li>If someone offers court representation without a license, verify first.</li>
                    </ul>
                </div>

                <div style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    padding: "1.5rem"
                }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
                        🔏 Notarial services
                    </h3>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "#94a3b8" }}>
                        Notarial services in Thailand are typically provided by licensed lawyers with relevant authorization. Verify the provider&apos;s lawyer license and notarial authorization via official channels.
                    </p>
                </div>

                <a
                    href="https://www.immigration.go.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "block",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.2s ease",
                    }}
                    className="hover:border-teal-500 hover:bg-white/5"
                >
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.25rem" }}>
                        Thai Immigration Bureau
                    </h2>
                    <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                        www.immigration.go.th
                    </div>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                        The central authority for visas and extensions within Thailand. Requirements often vary between your local provincial immigration office and the central bureau.
                    </p>
                </a>

                <a
                    href="https://www.mfa.go.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "block",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.2s ease",
                    }}
                    className="hover:border-teal-500 hover:bg-white/5"
                >
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.25rem" }}>
                        Ministry of Foreign Affairs (MFA)
                    </h2>
                    <div style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.5rem 0" }}>
                        www.mfa.go.th • <span style={{ color: "#f5c542" }}>thaievisa.go.th</span>
                    </div>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                        Governs Thai Embassies and Consulates abroad. Use their official e-Visa portal if you are applying for a visa <em>before</em> entering Thailand.
                    </p>
                </a>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <a
                        href="https://www.tourismthailand.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "block",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "16px",
                            padding: "1.25rem",
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.25rem" }}>TAT</h3>
                        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Tourism Authority of Thailand</p>
                    </a>
                    <a
                        href="https://www.krisdika.go.th/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "block",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "16px",
                            padding: "1.25rem",
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.25rem" }}>Krisdika</h3>
                        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Law library / Council of State</p>
                    </a>
                </div>
            </div>

            <div className="edge-info animate-fade-in" style={{ marginTop: "2.5rem", maxWidth: "100%" }}>
                📅 <strong>Public Holidays Reminder:</strong> Government offices, including Immigration, are closed on weekends and all Thai national public holidays. Check a current calendar before planning your visit.
            </div>

            <PrintPageButton />

            <div style={{ marginTop: "3rem", textAlign: "center", fontSize: "0.75rem", color: "#64748b", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                Template version: v1.0 • Last updated: 2026-03-03
            </div>
        </div>
    );
}
