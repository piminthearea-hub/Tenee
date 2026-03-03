import React from 'react';

export const metadata = {
    title: "Scope & Limits | Tenee",
    description: "Scope & limits of Tenee.",
};

export default function LimitsPage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl" style={{ lineHeight: 1.6 }}>
            <h1
                style={{
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontWeight: 800,
                    marginBottom: "1rem"
                }}
            >
                <span className="gradient-text gradient-text-teal" style={{ background: "linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-rose))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Scope &amp; Limits (Tenee)</span>
            </h1>

            <p style={{ color: "var(--color-text-secondary)", marginBottom: "0.25rem", fontSize: "0.95rem" }}>
                <strong>Last updated:</strong> 2026-03-03
            </p>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
                <strong>Template version:</strong> v1.0
            </p>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    1) Self-Service Tool Only
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tenee is a self-service utility for generating checklists and document templates. You use the tool independently and at your own sole direction.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    2) No Individual Support or Review
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Because Tenee is 100% free, we <strong>do not provide customer support, review documents, or answer specific immigration/legal questions.</strong>
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    3) Not Legal Advice
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    We are not lawyers. The checklists and templates on Tenee do not constitute legal advice. You assume all responsibility for verifying any forms and submitting them to the authorities.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    4) No Warranty
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Requirements frequently change across different Thai administrative and immigration offices. We cannot guarantee that any checklist generated will perfectly match the requirements for your specific situation on a given day.
                </p>
            </section>
        </div>
    );
}
