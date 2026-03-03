import React from 'react';

export const metadata = {
    title: "Privacy & Data Protection | Tenee",
    description: "Tenee is designed to operate without collecting or storing personal data.",
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
                <span className="gradient-text gradient-text-teal">🔒 Privacy & Data Protection</span>
            </h1>

            <div style={{ color: "var(--color-text-secondary)", fontSize: "1.05rem" }}>
                <p style={{ marginBottom: "1.5rem" }}>
                    Tenee is designed to operate without collecting or storing personal data.
                </p>

                <p style={{ marginBottom: "1rem" }}>
                    This platform follows a privacy-by-design approach consistent with:
                </p>
                <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc", marginBottom: "1.5rem" }}>
                    <li style={{ marginBottom: "0.25rem" }}>Thailand Personal Data Protection Act (PDPA)</li>
                    <li style={{ marginBottom: "0.25rem" }}>EU General Data Protection Regulation (GDPR) principles</li>
                    <li style={{ marginBottom: "0.25rem" }}>Data minimization and purpose limitation standards</li>
                </ul>

                <p style={{ marginBottom: "1rem" }}>
                    Tenee does not require user accounts and does not request:
                </p>
                <ul style={{ paddingLeft: "1.5rem", listStyleType: "circle", marginBottom: "1.5rem" }}>
                    <li style={{ marginBottom: "0.25rem" }}>Passport numbers</li>
                    <li style={{ marginBottom: "0.25rem" }}>National identification numbers</li>
                    <li style={{ marginBottom: "0.25rem" }}>Financial records</li>
                    <li style={{ marginBottom: "0.25rem" }}>Visa stickers or document scans</li>
                    <li style={{ marginBottom: "0.25rem" }}>Residential addresses</li>
                </ul>

                <p style={{ marginBottom: "1.5rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                    The tool is structured to function without personal identifiers.
                </p>

                <div className="glass-card" style={{ borderLeft: "3px solid #f59e0b", padding: "1.5rem", marginBottom: "2rem" }}>
                    <p style={{ marginBottom: "0.5rem", fontWeight: 600, color: "#f5c542" }}>Tenee does not sell personal data.</p>
                    <p style={{ marginBottom: "0.5rem", fontWeight: 600, color: "#f5c542" }}>Tenee does not profile users.</p>
                    <p style={{ marginBottom: "0", fontWeight: 600, color: "#f5c542" }}>Tenee does not conduct automated decision-making related to immigration status.</p>
                </div>

                <p style={{ marginBottom: "1.5rem" }}>
                    If users choose to paste information into the platform, they do so voluntarily and at their own discretion. Users are strongly advised not to enter sensitive personal data.
                </p>

                <p style={{ marginBottom: "1.5rem", fontStyle: "italic", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
                    This platform is informational only and does not provide legal advice, eligibility assessments, or official determinations.
                </p>
            </div>
        </div>
    );
}
