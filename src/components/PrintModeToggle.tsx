"use client";

import React from "react";
import { usePrintMode } from "./PrintModeContext";

export default function PrintModeToggle() {
    const { isPrintMode, togglePrintMode } = usePrintMode();

    return (
        <button
            onClick={togglePrintMode}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: isPrintMode ? "#f5c542" : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor: isPrintMode ? "#f5c542" : "rgba(255,255,255,0.1)",
                borderRadius: "10px",
                color: isPrintMode ? "#0a0e1a" : "#94a3b8",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                minHeight: "40px",
                whiteSpace: "nowrap"
            }}
            title="Toggle Print Mode for elders (larger text, high contrast)"
        >
            <span>{isPrintMode ? "👓 Print Mode: ON" : "👓 Print Mode"}</span>
        </button>
    );
}
