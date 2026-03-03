"use client";

import { useEffect, useState } from "react";
import factsData from "@/data/provinces_fun_facts.json";

interface FunFact {
    province: string;
    fact: string;
    source_url: string;
}

export default function FunFactCard() {
    const [fact, setFact] = useState<FunFact | null>(null);

    useEffect(() => {
        // Daily rotation logic: use the current date (YYYY-MM-DD) as a seed
        const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD format

        // Simple deterministic hash of the date string
        let hash = 0;
        for (let i = 0; i < today.length; i++) {
            const char = today.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        const index = Math.abs(hash) % factsData.length;
        setFact(factsData[index]);
    }, []);

    if (!fact) return null;

    return (
        <div
            className="animate-fade-in"
            style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "1.5rem",
                marginTop: "2rem",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Background Accent */}
            <div style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                background: "radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, transparent 70%)",
                filter: "blur(20px)",
                zIndex: 0
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                    color: "#f5c542",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                }}>
                    <span style={{ fontSize: "1.1rem" }}>💡</span>
                    Fun fact: Thailand&apos;s 77 provinces
                </div>

                <div style={{ marginBottom: "0.5rem" }}>
                    <span style={{
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        color: "#fff",
                        display: "block",
                        marginBottom: "0.25rem"
                    }}>
                        {fact.province}
                    </span>
                    <p style={{
                        color: "#94a3b8",
                        fontSize: "1rem",
                        lineHeight: 1.6
                    }}>
                        {fact.fact}
                    </p>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginTop: "1rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)"
                }}>
                    <a
                        href={fact.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: "0.75rem",
                            color: "#3b82f6",
                            textDecoration: "none",
                            fontWeight: 600
                        }}
                        className="hover:underline"
                    >
                        Source →
                    </a>
                    <span style={{
                        fontSize: "0.7rem",
                        color: "#475569",
                        fontStyle: "italic"
                    }}>
                        Fun facts are for learning; verify details at the source.
                    </span>
                </div>
            </div>
        </div>
    );
}
