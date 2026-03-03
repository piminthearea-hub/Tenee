"use client";

import { useState } from "react";
import ScamWarning from "@/components/ScamWarning";
import PrintPageButton from "@/components/PrintPageButton";

export default function FeedbackPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [noSensitiveData, setNoSensitiveData] = useState(false);
    const [category, setCategory] = useState("Suggestion");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Mock serverless submission
        setTimeout(() => {
            setStatus("success");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1200);
    };

    if (status === "success") {
        return (
            <div style={{ maxWidth: "600px", margin: "4rem auto", textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Thank You!</h1>
                <p style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.6 }}>
                    We read all feedback and use it to improve Tenee's templates and checklists.
                    <br /><br />
                    We may not respond to every message individually, but your contribution helps the whole community.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="btn-primary"
                    style={{ marginTop: "2rem" }}
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
            <div className="animate-fade-in" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text-teal">Feedback & Contact</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>
                    Help us keep Tenee accurate. Report errors or suggest improvements.
                </p>
            </div>

            <ScamWarning />

            {/* Strict Warnings */}
            <div className="edge-warn" style={{ marginBottom: "2rem", maxWidth: "100%" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>⚠️ STRICT NO-DATA POLICY</div>
                <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.6 }}>
                    <li><strong>Do NOT</strong> upload passports, visa stamps, or bank statements.</li>
                    <li><strong>Do NOT</strong> include sensitive personal data in your message.</li>
                    <li><strong>Do NOT</strong> include external links; we will not open them.</li>
                </ul>
            </div>

            {/* Sponsorship Policy Box */}
            {category === "Sponsorship" && (
                <div className="edge-info animate-fade-in" style={{ marginBottom: "2rem", maxWidth: "100%" }}>
                    <strong>Sponsorship Policy:</strong> Tenee does not accept money for ads. If a firm wants to be featured, they must contribute something genuinely useful to users (e.g., a clear public guide, printable resource, verified information page). If accepted, we will credit and feature the contribution.
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                        <label className="label" htmlFor="name">Name (optional)</label>
                        <input type="text" id="name" className="input-field" placeholder="Your name" />
                    </div>
                    <div>
                        <label className="label" htmlFor="email">Email (optional)</label>
                        <input type="email" id="email" className="input-field" placeholder="Your email" />
                    </div>
                </div>

                <div>
                    <label className="label" htmlFor="category">Category</label>
                    <select
                        id="category"
                        className="select-field"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="Correction">Correction (Office variations)</option>
                        <option value="Suggestion">Suggestion</option>
                        <option value="Bug">Bug Report</option>
                        <option value="Sponsorship">Sponsorship / Contribution</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="label" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        className="input-field"
                        placeholder="What did you experience at your local office? Did we miss a requirement?"
                        rows={5}
                        required
                        style={{ resize: "vertical" }}
                    />
                </div>

                <div>
                    <label className="label" htmlFor="attachment">Attachment (Optional — IMAGES ONLY)</label>
                    <input
                        type="file"
                        id="attachment"
                        accept="image/png, image/jpeg"
                        className="input-field"
                        style={{ paddingTop: "0.6rem" }}
                    />
                    <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                        Max 5MB. PNG or JPG only. We strip EXIF data.
                    </div>
                </div>

                <div style={{ marginTop: "1rem", background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={noSensitiveData}
                            onChange={(e) => setNoSensitiveData(e.target.checked)}
                            required
                            style={{ flexShrink: 0, marginTop: "4px", width: "18px", height: "18px", accentColor: "#2dd4bf" }}
                        />
                        <span style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "#e2e8f0" }}>
                            I confirm that <strong>I will not include sensitive personal data</strong> (passports, bank info, exact addresses) in this message or attachment.
                        </span>
                    </label>
                </div>

                <div style={{ textAlign: "center", fontSize: "0.9rem", color: "#2dd4bf", fontWeight: 600, marginTop: "0.5rem" }}>
                    🛡️ We do not sell your data. Do not upload passports, visa stamps, or bank statements.
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={!noSensitiveData || status === "submitting"}
                    style={{ opacity: !noSensitiveData || status === "submitting" ? 0.5 : 1, padding: "1rem" }}
                >
                    {status === "submitting" ? "Sending..." : "Send Feedback"}
                </button>
            </form>

            <PrintPageButton />

            <div style={{ marginTop: "3rem", textAlign: "center", fontSize: "0.75rem", color: "#64748b", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                Template version: v1.0 • Last updated: 2026-03-03
            </div>
        </div>
    );
}
