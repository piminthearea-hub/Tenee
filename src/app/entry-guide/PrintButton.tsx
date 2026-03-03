"use client";

export default function PrintButton() {
    return (
        <button
            className="eg-btn-secondary"
            onClick={() => window.print()}
            type="button"
        >
            🖨️ Print Entry Checklist
        </button>
    );
}
