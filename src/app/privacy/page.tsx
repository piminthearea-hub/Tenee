import React from 'react';

export const metadata = {
    title: "Privacy Notice | Tenee",
    description: "Privacy Notice for Tenee.",
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl" style={{ lineHeight: 1.6 }}>
            <h1
                style={{
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontWeight: 800,
                    marginBottom: "1rem"
                }}
            >
                <span className="gradient-text gradient-text-teal">Privacy Notice (Tenee)</span>
            </h1>

            <p style={{ color: "var(--color-text-secondary)", marginBottom: "0.25rem", fontSize: "0.95rem" }}>
                <strong>Last updated:</strong> 2026-03-03
            </p>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
                <strong>Template version:</strong> v1.0
            </p>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    1) Privacy-first design
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tenee is designed to be privacy-first. <strong>No login is required.</strong><br />
                    <strong>We do not sell your data.</strong>
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    2) What we collect
                </h3>
                <ul style={{ color: "var(--color-text-secondary)", paddingLeft: "1.5rem", listStyleType: "disc" }}>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Information you type in:</strong> used to generate the templates/PDFs you request.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>We do not want sensitive data:</strong> please do <strong>not</strong> enter passport numbers, visa stamp images, bank statements, full date of birth, or private addresses.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Basic technical logs (minimal):</strong> like most websites, limited technical logs may exist for security and reliability.</li>
                </ul>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    3) Cookies / local storage
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tenee may use session storage (and in some cases local storage) to remember simple preferences (e.g., language choice, print mode). This stays on your device and can be cleared via your browser settings.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    4) How we use information
                </h3>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>We use information only to:</p>
                <ul style={{ color: "var(--color-text-secondary)", paddingLeft: "1.5rem", listStyleType: "disc", marginBottom: "1rem" }}>
                    <li style={{ marginBottom: "0.25rem" }}>generate requested outputs,</li>
                    <li style={{ marginBottom: "0.25rem" }}>keep the site working,</li>
                    <li style={{ marginBottom: "0.25rem" }}>improve the tool.</li>
                </ul>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    We do <strong>not</strong> sell personal data and do not use user-entered content for advertising.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    5) Sharing
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    We do not sell user data. We do not share user-entered content with advertisers.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    6) Retention
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    Tenee is intended to avoid storing user-entered content on servers. The safest approach is still: <strong>do not input sensitive personal information</strong>.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    7) Security
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    No online service can guarantee absolute security. Please avoid entering sensitive personal information.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    8) Updates
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    We may update this notice. The “Last updated” date shows the current version.
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                    9) Contact
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                    This is a free tool and we do not provide individual support.
                </p>
            </section>
        </div>
    );
}
