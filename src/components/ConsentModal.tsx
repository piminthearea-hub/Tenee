"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Icon from "@/components/Icon";

export default function ConsentModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Only trigger the modal on tool routes.
        const toolRoutes = ["/wizard", "/write-thai", "/legal-claims", "/office-plan", "/feedback"];
        const isToolRoute = toolRoutes.some(route => pathname.startsWith(route));

        if (isToolRoute) {
            const hasConsented = localStorage.getItem("tenee_consent_given");
            if (!hasConsented) {
                setIsVisible(true);
            }
        } else {
            setIsVisible(false);
        }
    }, [pathname]);

    const handleContinue = () => {
        localStorage.setItem("tenee_consent_given", "true");
        setIsVisible(false);
    };

    const handleExit = () => {
        // Navigate away from the tool page
        router.push("/");
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(10, 14, 26, 0.95)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem"
        }}>
            <div className="glass-card animate-fade-in" style={{
                maxWidth: "600px",
                width: "100%",
                backgroundColor: "#111827",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                padding: "2rem",
                maxHeight: "90vh",
                overflowY: "auto"
            }}>
                <h2 style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    color: "#f5c542",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                }}>
                    <Icon name="warning" className="w-8 h-8" ariaLabel="Warning" /> Before You Continue
                </h2>

                <div style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderLeft: "4px solid #ef4444",
                    padding: "1.25rem",
                    marginBottom: "2rem",
                    borderRadius: "0 8px 8px 0"
                }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ef4444", margin: "0 0 0.5rem 0" }}>
                        Caution
                    </h3>
                    <p style={{ color: "#fca5a5", fontSize: "0.95rem", margin: 0, lineHeight: 1.6 }}>
                        Do not enter sensitive personal information such as passport numbers, identification numbers, financial records, visa stickers, document scans, or full addresses.
                    </p>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem" }}>
                        Required Acknowledgment
                    </h3>
                    <ul style={{
                        listStyleType: "none",
                        padding: 0,
                        margin: 0,
                        color: "#94a3b8",
                        fontSize: "0.95rem",
                        lineHeight: 1.6
                    }}>
                        <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <span style={{ color: "#38bdf8" }}>•</span>
                            <span>You are using this informational tool voluntarily.</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <span style={{ color: "#38bdf8" }}>•</span>
                            <span>The platform does not provide legal advice or official determinations.</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <span style={{ color: "#38bdf8" }}>•</span>
                            <span>You will not submit sensitive personal data.</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <span style={{ color: "#38bdf8" }}>•</span>
                            <span>The platform is designed not to collect or store personal data.</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <span style={{ color: "#38bdf8" }}>•</span>
                            <span>No user accounts or data retention systems are provided.</span>
                        </li>
                    </ul>
                </div>

                <label style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1.25rem",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    marginBottom: "2rem"
                }}>
                    <input
                        type="checkbox"
                        checked={acknowledged}
                        onChange={(e) => setAcknowledged(e.target.checked)}
                        style={{
                            marginTop: "3px",
                            width: "20px",
                            height: "20px",
                            accentColor: "#f5c542",
                            cursor: "pointer",
                            flexShrink: 0
                        }}
                    />
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: "#f8fafc" }}>
                        By continuing, you acknowledge that you have read and agree to the above terms.
                    </span>
                </label>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button
                        onClick={handleContinue}
                        disabled={!acknowledged}
                        style={{
                            flex: 1,
                            padding: "1rem",
                            backgroundColor: acknowledged ? "#f5c542" : "rgba(245, 197, 66, 0.2)",
                            color: acknowledged ? "#0a0e1a" : "rgba(255,255,255,0.4)",
                            border: "none",
                            borderRadius: "10px",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            cursor: acknowledged ? "pointer" : "not-allowed",
                            transition: "all 0.2s"
                        }}
                    >
                        I Understand — Continue
                    </button>
                    <button
                        onClick={handleExit}
                        style={{
                            padding: "1rem 2rem",
                            backgroundColor: "transparent",
                            color: "#94a3b8",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "10px",
                            fontWeight: 600,
                            fontSize: "1.05rem",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#f8fafc"; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
                    >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
}
