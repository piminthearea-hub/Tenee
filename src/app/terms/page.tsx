import React from 'react';

export const metadata = {
    title: "Terms of Use | Tenee",
    description: "Terms of Use for Tenee.",
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl" style={{ lineHeight: 1.6 }}>
            <h1
                style={{
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontWeight: 800,
                    marginBottom: "1rem"
                }}
            >
                <span className="gradient-text">Terms of Use (Tenee)</span>
            </h1>

            <p style={{ color: "var(--color-text-secondary)", marginBottom: "0.25rem", fontSize: "0.95rem" }}>
                <strong>Last updated:</strong> 2026-03-03
            </p>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
                <strong>Template version:</strong> v1.0
            </p>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    1) What Tenee is
                </h3>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
                    Tenee is a free paperwork-preparation and communication-template tool. It helps users generate checklists, printable packets, and Thai message templates.
                </p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tenee is <strong>not a law firm</strong> and does <strong>not</strong> provide legal advice, legal representation, or guarantees of any outcome.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    2) Verification required
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Immigration and administrative requirements can vary by office and change over time. You are responsible for verifying requirements with official authorities and for any decisions you make based on Tenee’s outputs.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    3) Not for emergencies
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tenee is not designed for emergencies. If you need urgent help, contact local emergency services.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    4) User responsibilities
                </h3>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>You agree:</p>
                <ul style={{ color: "var(--color-text-secondary)", paddingLeft: "1.5rem", listStyleType: "disc" }}>
                    <li style={{ marginBottom: "0.25rem" }}>Not to use Tenee as a substitute for professional legal advice or representation.</li>
                    <li style={{ marginBottom: "0.25rem" }}>Not to misuse the site (e.g., hacking, scraping, denial-of-service).</li>
                    <li style={{ marginBottom: "0.25rem" }}>Not to enter or upload sensitive personal data (see Section 5).</li>
                </ul>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    5) Sensitive data warning
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Do <strong>not</strong> enter or upload sensitive personal data into Tenee, including: passport numbers, visa stamp images, bank statements, full date of birth, or private addresses. If you choose to enter information, you do so at your own risk.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    6) Intellectual property &amp; sharing
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    You may use the templates and generated outputs for personal use. You may share outputs, but you must not present Tenee as an official authority or a law firm.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    7) Third-party links
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tenee may link to third-party websites (including official sources). Tenee is not responsible for the content or availability of those sites.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    8) No warranties
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tenee is provided <strong>“as is”</strong> and <strong>“as available.”</strong> We do not guarantee accuracy, completeness, or fitness for a particular purpose.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    9) Limitation of liability
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    To the fullest extent allowed by law, Tenee and its creators are not liable for any damages arising from your use of the site or reliance on its outputs.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    10) Changes
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    We may update these Terms. The “Last updated” date shows the current version.
                </p>
            </section>
        </div>
    );
}
