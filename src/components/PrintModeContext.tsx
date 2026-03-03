"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PrintModeContextType {
    isPrintMode: boolean;
    togglePrintMode: () => void;
}

const PrintModeContext = createContext<PrintModeContextType | undefined>(undefined);

export function PrintModeProvider({ children }: { children: ReactNode }) {
    const [isPrintMode, setIsPrintMode] = useState(false);

    // Load from sessionStorage on mount
    useEffect(() => {
        const saved = sessionStorage.getItem("tenee_print_mode");
        if (saved === "true") {
            setIsPrintMode(true);
        }
    }, []);

    // Update body attribute and sessionStorage on change
    useEffect(() => {
        document.body.setAttribute("data-print-mode", isPrintMode.toString());
        sessionStorage.setItem("tenee_print_mode", isPrintMode.toString());
    }, [isPrintMode]);

    const togglePrintMode = () => setIsPrintMode((prev) => !prev);

    return (
        <PrintModeContext.Provider value={{ isPrintMode, togglePrintMode }}>
            {children}
        </PrintModeContext.Provider>
    );
}

export function usePrintMode() {
    const context = useContext(PrintModeContext);
    if (context === undefined) {
        throw new Error("usePrintMode must be used within a PrintModeProvider");
    }
    return context;
}
