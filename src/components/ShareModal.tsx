"use client";

import { useState } from "react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateAnother: () => void;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://tenee.app";
const SHARE_MESSAGE = `Free Thailand paperwork packet generator (not legal advice). Printable checklist + packet order: ${APP_URL}`;

export default function ShareModal({ isOpen, onClose, onCreateAnother }: ShareModalProps) {
    const [copied, setCopied] = useState<string | null>(null);

    if (!isOpen) return null;

    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(label);
            setTimeout(() => setCopied(null), 2000);
        } catch {
            // Fallback
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopied(label);
            setTimeout(() => setCopied(null), 2000);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Tenee — Free Thailand Paperwork Packet Generator",
                    text: SHARE_MESSAGE,
                    url: APP_URL,
                });
            } catch {
                // User cancelled or error
            }
        } else {
            copyToClipboard(SHARE_MESSAGE, "message");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
                {/* Success Header */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🎉</div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                        PDFs Generated!
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                        Your checklist and preparation packet are ready to download.
                    </p>
                </div>

                {/* Share Section */}
                <div
                    style={{
                        background: "rgba(245, 197, 66, 0.05)",
                        border: "1px solid rgba(245, 197, 66, 0.15)",
                        borderRadius: "14px",
                        padding: "1.25rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            marginBottom: "0.75rem",
                            color: "#f5c542",
                        }}
                    >
                        🔗 Share with friends & community
                    </h3>
                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "0.85rem",
                            marginBottom: "1rem",
                            lineHeight: 1.5,
                        }}
                    >
                        Know someone struggling with Thailand paperwork? Share this free tool.
                    </p>

                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <button
                            className="btn-secondary"
                            onClick={() => copyToClipboard(APP_URL, "link")}
                            style={{ fontSize: "0.9rem", padding: "0.75rem 1.25rem", minHeight: "44px" }}
                            id="share-copy-link"
                        >
                            {copied === "link" ? "✅ Copied!" : "📋 Copy Link"}
                        </button>

                        <button
                            className="btn-secondary"
                            onClick={handleNativeShare}
                            style={{ fontSize: "0.9rem", padding: "0.75rem 1.25rem", minHeight: "44px" }}
                            id="share-send-friend"
                        >
                            {copied === "message" ? "✅ Copied!" : "💬 Send to a Friend"}
                        </button>

                        <button
                            className="btn-secondary"
                            onClick={() => copyToClipboard(SHARE_MESSAGE, "full")}
                            style={{ fontSize: "0.9rem", padding: "0.75rem 1.25rem", minHeight: "44px" }}
                            id="share-copy-message"
                        >
                            {copied === "full" ? "✅ Copied!" : "📝 Copy Share Message"}
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: "grid", gap: "0.75rem" }}>
                    <button
                        className="btn-primary"
                        onClick={onCreateAnother}
                        style={{ width: "100%" }}
                        id="share-create-another"
                    >
                        ➕ Create Another Packet
                    </button>
                    <button
                        className="btn-ghost"
                        onClick={onClose}
                        style={{ width: "100%" }}
                        id="share-close"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
