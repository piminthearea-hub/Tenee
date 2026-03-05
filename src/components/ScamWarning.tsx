"use client";

import React from "react";
import Icon from "@/components/Icon";

export default function ScamWarning() {
    return (
        <div
            className="glass-card"
            style={{
                borderLeft: "4px solid #ef4444",
                background: "rgba(239, 68, 68, 0.05)",
                marginBottom: "1.5rem",
                padding: "1rem 1.25rem"
            }}
        >
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span className="text-red-500 w-6 h-6 flex-shrink-0" style={{ marginTop: "2px" }}><Icon name="warning" ariaLabel="Warning" /></span>
                <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#ef4444", marginBottom: "0.25rem", textTransform: "uppercase" }}>
                        Scam warning
                    </h4>
                    <p style={{ fontSize: "0.88rem", color: "#fca5a5", lineHeight: 1.5, margin: 0 }}>
                        We do not ask for passport images or bank statements. Official Thai government sites typically use <strong>.go.th</strong>. Beware paid look-alike sites.
                    </p>
                </div>
            </div>
        </div>
    );
}
