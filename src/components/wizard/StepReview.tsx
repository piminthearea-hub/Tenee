"use client";

import { useWizard, maskPassport, TASK_LABELS, daysUntil } from "@/lib/wizard-context";
import { getChecklistSections } from "@/lib/checklist-data";
import Icon from "@/components/Icon";
import { useState } from "react";
import CommonMistakes from "@/components/CommonMistakes";
import ScamWarning from "@/components/ScamWarning";
import PrintPageButton from "@/components/PrintPageButton";

interface StepReviewProps {
    onGenerate: () => void;
    isGenerating: boolean;
}

export default function StepReview({ onGenerate, isGenerating }: StepReviewProps) {
    const { state, setField, prevStep } = useWizard();
    const [showMissing, setShowMissing] = useState(true);

    const missing: string[] = [];
    if (!state.fullName) missing.push("Full name");
    if (!state.nationality) missing.push("Nationality");
    if (!state.passportNumber) missing.push("Passport number");
    if (!state.currentAddress) missing.push("Current address");
    if (!state.officeCity) missing.push("Immigration office/city");
    if (!state.lastEntryDate && !state.lastEntryNotSure) missing.push("Last entry date");
    if (!state.expiryDate && !state.expiryNotSure) missing.push("Stay expiry date");

    const sections = state.taskType
        ? getChecklistSections(state.taskType, state.financialProofType)
        : [];

    const formatDate = (d: string, privacy: boolean) => {
        if (!d) return "Not provided";
        if (privacy) {
            const date = new Date(d);
            return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
        }
        return new Date(d).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // Edge case logic
    const daysToExpiry = state.expiryDate ? daysUntil(state.expiryDate) : NaN;
    const showExpiryUrgency = (state.taskType === "visa_extension" || state.taskType === "retirement") && !isNaN(daysToExpiry);
    const showHotelWarning = (state.recentHotelStay === "yes" || state.recentHotelStay === "not_sure")
        && (state.taskType === "ninety_day" || state.taskType === "visa_extension" || state.taskType === "retirement");
    const show90DayTimeline = state.taskType === "ninety_day" && state.ninetyDayDueDate;

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Review & Generate
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "1.5rem", fontSize: "1rem" }}>
                Review your information before generating the preparation packet.
            </p>

            {/* ==== EDGE-CASE WARNINGS IN REVIEW ==== */}

            {/* Strict deadline reminder */}
            {showExpiryUrgency && daysToExpiry <= 14 && (
                <div
                    className={daysToExpiry <= 3 ? "urgency-red" : "caution-yellow"}
                    style={{ marginBottom: "1.25rem" }}
                >
                    <div className={daysToExpiry <= 3 ? "urgency-title" : "caution-title"}>
                        <Icon name="exclamation" className="inline-block mr-1" />{daysToExpiry <= 3 ? "" : ""} Strict deadline:{" "}
                        {daysToExpiry <= 0
                            ? "Expired or today!"
                            : `${daysToExpiry} day${daysToExpiry === 1 ? "" : "s"} remaining`}
                    </div>
                    <div style={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                        {daysToExpiry <= 0
                            ? "If your stay permission has passed, you may be considered overstaying. Contact your immigration office immediately."
                            : "Apply early and verify your office's process. Missing this date may result in overstay."}
                    </div>
                    <div style={{ marginTop: "0.4rem", fontSize: "0.75rem", fontStyle: "italic", opacity: 0.7 }}>
                        System/office behavior warning — not official; verify locally.
                    </div>
                </div>
            )}

            {/* Hotel stay → TM30 warning */}
            {showHotelWarning && (
                <div className="caution-yellow" style={{ marginBottom: "1.25rem" }}>
                    <div className="caution-title"><Icon name="clipboard" className="inline-block mr-1" /> TM30 update may be needed</div>
                    <div style={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                        You indicated a recent hotel stay. Some offices may ask your landlord/host to
                        update TM30 again. Verify with your local office.
                    </div>
                    <div style={{ marginTop: "0.4rem", fontSize: "0.75rem", fontStyle: "italic", opacity: 0.7 }}>
                        System/office behavior — not official; verify locally.
                    </div>
                </div>
            )}

            {/* 90-Day online note */}
            {show90DayTimeline && (
                <div className="caution-yellow" style={{ marginBottom: "1.25rem" }}>
                    <div className="caution-title">📅 90-Day Reporting</div>
                    <div className="timeline-bar">
                        <div className="seg seg-early">Earliest (15 before)</div>
                        <div className="seg seg-due">Due</div>
                        <div className="seg seg-late">Late (~7d)</div>
                    </div>
                    <div style={{ fontSize: "0.82rem", lineHeight: 1.5, marginTop: "0.4rem" }}>
                        Online reporting may have a narrower window. Verify locally.
                    </div>
                </div>
            )}

            {/* Public holiday reminder */}
            <div className="info-box" style={{ marginBottom: "1.5rem" }}>
                📅 <strong>Before you go:</strong> Check Thai public holidays — immigration offices are
                closed on national holidays and weekends.
            </div>

            <CommonMistakes taskType={state.taskType} />
            <ScamWarning />

            {/* Missing items */}
            {missing.length > 0 && (
                <div className="warning-box" style={{ marginBottom: "1.5rem" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => setShowMissing(!showMissing)}
                    >
                        <strong>⚠️ {missing.length} optional item(s) not filled in</strong>
                        <span style={{ fontSize: "0.8rem" }}>{showMissing ? "▲" : "▼"}</span>
                    </div>
                    {showMissing && (
                        <ul
                            style={{
                                marginTop: "0.5rem",
                                paddingLeft: "1.25rem",
                                fontSize: "0.85rem",
                            }}
                        >
                            {missing.map((m) => (
                                <li key={m}>{m}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Summary Card */}
            <div
                className="glass-card"
                style={{ marginBottom: "1.5rem", cursor: "default" }}
            >
                <h3
                    style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        marginBottom: "1rem",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        paddingBottom: "0.75rem",
                    }}
                >
                    📋 Case Summary
                </h3>

                <div style={{ display: "grid", gap: "0.75rem", fontSize: "0.95rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Mode</span>
                        <span style={{ fontWeight: 600 }}>
                            {state.mode === "caregiver" ? "🤝 Caregiver" : "🙋 Self"}
                        </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Task</span>
                        <span style={{ fontWeight: 600 }}>
                            {state.taskType ? TASK_LABELS[state.taskType] : "—"}
                        </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Name</span>
                        <span style={{ fontWeight: 600 }}>{state.fullName || "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Nationality</span>
                        <span style={{ fontWeight: 600 }}>{state.nationality || "—"}</span>
                    </div>
                    {state.dateOfBirth && !state.dobPrivacy && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#94a3b8" }}>Date of Birth</span>
                            <span style={{ fontWeight: 600 }}>
                                {formatDate(state.dateOfBirth, state.privacyMode)}
                            </span>
                        </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Passport</span>
                        <span style={{ fontWeight: 600 }}>
                            {state.passportNumber ? maskPassport(state.passportNumber) : "—"}
                        </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Office</span>
                        <span style={{ fontWeight: 600 }}>{state.officeCity || "—"}</span>
                    </div>
                    {state.expiryDate && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#94a3b8" }}>Expiry Date</span>
                            <span style={{ fontWeight: 600 }}>
                                {formatDate(state.expiryDate, state.privacyMode)}
                            </span>
                        </div>
                    )}
                    {showHotelWarning && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#94a3b8" }}>Recent Hotel Stay</span>
                            <span style={{ fontWeight: 600, color: "#f59e0b" }}>
                                {state.recentHotelStay === "yes" ? (<span className="inline-flex items-center"><Icon name="check" className="inline-block mr-1" /> Yes</span>) : (<span className="inline-flex items-center"><Icon name="question" className="inline-block mr-1" /> Not sure</span>)}
                            </span>
                        </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#94a3b8" }}>Privacy Mode</span>
                        <span
                            style={{
                                fontWeight: 600,
                                color: state.privacyMode ? "#22c55e" : "#ef4444",
                            }}
                        >
                            {state.privacyMode ? "🔒 ON" : "OFF"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Checklist Preview with Tier Legend */}
            {sections.length > 0 && (
                <div
                    className="glass-card"
                    style={{ marginBottom: "1.5rem", cursor: "default" }}
                >
                    <h3
                        style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            marginBottom: "0.75rem",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            paddingBottom: "0.75rem",
                        }}
                    >
                        <Icon name="check" className="inline-block mr-1" /> Checklist Preview ({sections.reduce((a, s) => a + s.items.length, 0)} items)
                    </h3>

                    {/* Tier Legend */}
                    <div className="tier-legend" style={{ marginBottom: "1rem" }}>
                        <div className="tier-badge">
                            <span className="dot dot-baseline" /> Baseline (required to start)
                        </div>
                        <div className="tier-badge">
                            <span className="dot dot-often" /> Often requested (varies by office)
                        </div>
                        <div className="tier-badge">
                            <span className="dot dot-situational" /> Situational
                        </div>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title} style={{ marginBottom: "1rem" }}>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    color: "#f5c542",
                                    marginBottom: "0.5rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                {section.title}
                            </div>
                            {section.items.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "0.5rem",
                                        padding: "0.35rem 0",
                                        fontSize: "0.9rem",
                                        color: "#94a3b8",
                                    }}
                                >
                                    <span>☐</span>
                                    <span>
                                        {item.tier && (
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: "7px",
                                                    height: "7px",
                                                    borderRadius: "50%",
                                                    marginRight: "5px",
                                                    background:
                                                        item.tier === "baseline"
                                                            ? "#22c55e"
                                                            : item.tier === "often"
                                                                ? "#f59e0b"
                                                                : "#3b82f6",
                                                }}
                                            />
                                        )}
                                        {item.label}
                                        {item.required && (
                                            <span style={{ color: "#f43f5e", fontSize: "0.75rem" }}> *</span>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {/* Next Steps & Extras */}
            <div className="glass-card" style={{ marginBottom: "1.5rem" }}>
                <h3
                    style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        marginBottom: "1rem",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        paddingBottom: "0.75rem",
                    }}
                >
                    🚀 Next Steps & Extras
                </h3>

                <div style={{ display: "grid", gap: "1rem" }}>
                    {/* Office Visit Plan */}
                    <div style={{ background: "rgba(245, 197, 66, 0.05)", borderRadius: "12px", border: "1px solid rgba(245, 197, 66, 0.15)", padding: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <strong style={{ color: "#f5c542", fontSize: "1.05rem" }}>🏢 Office Visit Plan</strong>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1rem" }}>
                            Generate an elder-friendly, printable plan summarizing your visit: what to bring, what to say, and key warnings.
                        </p>
                        <a
                            href="/office-plan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{ display: "block", textAlign: "center", padding: "0.6rem 1rem", fontSize: "0.9rem", textDecoration: "none" }}
                        >
                            Generate Office Visit Plan
                        </a>
                    </div>

                    {/* One-Click Thai Messages */}
                    <div style={{ background: "rgba(45, 212, 191, 0.05)", borderRadius: "12px", border: "1px solid rgba(45, 212, 191, 0.15)", padding: "1.25rem" }}>
                        <strong style={{ color: "#2dd4bf", fontSize: "1.05rem", display: "block", marginBottom: "0.5rem" }}>💬 One-Click Thai Messages</strong>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1rem" }}>
                            Instantly generate context-aware templates in Thai without retyping your info.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <a
                                href={`/write-thai?recipient_type=landlord&purpose=tm30_request&office_city=${encodeURIComponent(state.officeCity || "")}&applicant_name=${encodeURIComponent(state.fullName || "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                                style={{ display: "block", textAlign: "left", padding: "0.6rem 1rem", fontSize: "0.9rem", textDecoration: "none" }}
                            >
                                🏠 Message landlord/host about TM30 proof
                            </a>

                            {state.taskType === "retirement" && (
                                <a
                                    href={`/write-thai?recipient_type=bank&purpose=statement_request&applicant_name=${encodeURIComponent(state.fullName || "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                    style={{ display: "block", textAlign: "left", padding: "0.6rem 1rem", fontSize: "0.9rem", textDecoration: "none" }}
                                >
                                    🏦 Message bank for bank letter/statement
                                </a>
                            )}

                            <a
                                href={`/write-thai?recipient_type=immigration&purpose=doc_inquiry&office_city=${encodeURIComponent(state.officeCity || "")}&applicant_name=${encodeURIComponent(state.fullName || "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                                style={{ display: "block", textAlign: "left", padding: "0.6rem 1rem", fontSize: "0.9rem", textDecoration: "none" }}
                            >
                                🏢 Message immigration office (inquiry only)
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="disclaimer-banner" style={{ marginBottom: "1.5rem" }}>
                <label className="checkbox-wrapper" style={{ background: "transparent", border: "none", padding: 0 }}>
                    <input
                        type="checkbox"
                        checked={state.legalDisclaimer}
                        onChange={(e) => setField("legalDisclaimer", e.target.checked)}
                        id="legal-disclaimer"
                    />
                    <span style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                        <strong>I understand</strong> this is not legal advice and I must verify
                        requirements with my local immigration office. Tenee is a paperwork
                        preparation and information tool. Not a law firm. Not representation.
                        No guarantee. Only immigration officers decide outcomes.
                    </span>
                </label>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <button className="btn-ghost" onClick={prevStep} id="step6-back">
                    ← Back
                </button>
                <button
                    className="btn-primary"
                    onClick={onGenerate}
                    disabled={!state.legalDisclaimer || isGenerating}
                    id="generate-button"
                    style={{ minWidth: "200px" }}
                >
                    {isGenerating ? "⏳ Generating..." : "📄 Generate PDFs"}
                </button>
            </div>

            <PrintPageButton />
        </div>
    );
}
