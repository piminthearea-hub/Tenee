"use client";

import React from "react";
import { usePrintMode } from "./PrintModeContext";

export default function PrintPageButton() {
    const { isPrintMode } = usePrintMode();

    if (!isPrintMode) return null;

    return (
        <button
            onClick={() => window.print()}
            className="btn-primary no-print"
            style={{
                marginTop: "2rem",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                background: "#000",
                color: "#fff",
                border: "2px solid #000"
            }}
        >
            🖨️ Print this page
        </button>
    );
}
