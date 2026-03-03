"use client";

import Link from "next/link";

export default function AboutPage() {
    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
            <div className="animate-fade-in" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text-teal">About Tenee</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>
                    Why we built a free paperwork generator for Thailand.
                </p>
            </div>

            <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "2rem",
                marginBottom: "2.5rem",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#cbd5e1"
            }}>
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.75rem" }}>
                        Who we are
                    </h2>
                    <p>
                        Tenee is built by Peem and Yuri, Thai law graduates who love building practical tools.
                    </p>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.75rem" }}>
                        How we keep it reliable
                    </h2>
                    <p>
                        We keep checklists simple, link to official authorities for verification, and date-stamp updates. Requirements can vary by office—please verify locally.
                    </p>
                </div>

                <div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f5c542", marginBottom: "0.75rem" }}>
                        Disclaimer
                    </h2>
                    <p style={{ fontSize: "0.95rem", color: "#94a3b8" }}>
                        Tenee is a paperwork preparation tool. Not a law firm. Not legal advice. Requirements vary by office—verify locally.
                    </p>
                </div>

                <div style={{ marginTop: "2rem" }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.75rem" }}>
                        Privacy
                    </h2>
                    <p style={{ fontSize: "0.95rem", color: "#94a3b8" }}>
                        Tenee does not sell your data. Please avoid entering sensitive personal data (passport numbers, bank statements, visa stamp images).
                    </p>
                </div>
            </div>


            <div style={{ marginTop: "3rem", textAlign: "center", fontSize: "0.75rem", color: "#64748b", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                Template version: v1.0 • Last updated: 2026-03-03
            </div>
        </div>
    );
}
