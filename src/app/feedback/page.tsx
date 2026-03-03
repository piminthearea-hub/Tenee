"use client";

import { useState } from "react";

export default function FeedbackPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Mock serverless email forwarder
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
                    Your feedback has been submitted successfully.
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
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
            <div className="animate-fade-in" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text-teal">Contact</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.6 }}>
                    This channel is for general feedback or technical issues only.
                </p>
                <p style={{ color: "#fca5a5", fontSize: "1.05rem", fontWeight: 600, marginTop: "0.5rem", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "0.5rem", borderRadius: "8px" }}>
                    Please do not submit personal immigration details, case-specific questions, or sensitive documents.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem", backgroundColor: "rgba(255,255,255,0.02)", padding: "2rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                    <label className="label" htmlFor="name">Name</label>
                    <input type="text" id="name" className="input-field" placeholder="Name" required />
                </div>
                <div>
                    <label className="label" htmlFor="email">Email</label>
                    <input type="email" id="email" className="input-field" placeholder="Email" required />
                </div>

                <div>
                    <label className="label" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        className="input-field"
                        placeholder="Your feedback or technical issue..."
                        rows={6}
                        required
                        style={{ resize: "vertical" }}
                    />
                </div>

                <div style={{ textAlign: "center", fontSize: "0.9rem", color: "#94a3b8", fontWeight: 500, margin: "0.5rem 0" }}>
                    This platform does not provide legal advice or case-specific guidance.
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === "submitting"}
                    style={{ opacity: status === "submitting" ? 0.5 : 1, padding: "1rem", marginTop: "1rem" }}
                >
                    {status === "submitting" ? "Sending..." : "Send Feedback"}
                </button>
            </form>
        </div>
    );
}
