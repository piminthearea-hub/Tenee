"use client";

import React, { useState } from "react";
import { useWizard, daysUntil, HotelStay } from "@/lib/wizard-context";
import Icon from "@/components/Icon";

export default function StepDates() {
    const { state, setField, nextStep, prevStep } = useWizard();

    const daysToExpiry = state.expiryDate ? daysUntil(state.expiryDate) : NaN;
    const daysToNinetyDay = state.ninetyDayDueDate ? daysUntil(state.ninetyDayDueDate) : NaN;

    const show90Day = state.taskType === "ninety_day";
    const showExpiryUrgency = state.taskType === "visa_extension" || state.taskType === "retirement";
    const showHotelQuestion =
        state.taskType === "ninety_day" ||
        state.taskType === "visa_extension" ||
        state.taskType === "retirement";

    // Determine online system warning level
    const deadlineDays = show90Day ? daysToNinetyDay : daysToExpiry;
    const showOnlineWarning = show90Day && !isNaN(deadlineDays);
    const onlineWarningRed = showOnlineWarning && deadlineDays <= 3;
    const onlineWarningYellow = showOnlineWarning && deadlineDays > 3 && deadlineDays <= 15;

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Important Dates
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "2rem", fontSize: "1rem" }}>
                These help us add reminders and context to your packet. You can skip if
                you&apos;re not sure.
            </p>

            <div style={{ display: "grid", gap: "1.5rem", marginBottom: "2rem" }}>
                {/* Last Entry Date */}
                <div>
                    <label className="label" htmlFor="lastEntryDate">
                        Last Entry Date into Thailand
                    </label>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <input
                            id="lastEntryDate"
                            type="date"
                            className="input-field"
                            value={state.lastEntryNotSure ? "" : state.lastEntryDate}
                            onChange={(e) => setField("lastEntryDate", e.target.value)}
                            disabled={state.lastEntryNotSure}
                            style={{
                                flex: 1,
                                opacity: state.lastEntryNotSure ? 0.4 : 1,
                            }}
                        />
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#94a3b8",
                                fontSize: "0.9rem",
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                                padding: "0.5rem 0.75rem",
                                background: state.lastEntryNotSure
                                    ? "rgba(245, 197, 66, 0.1)"
                                    : "transparent",
                                border: state.lastEntryNotSure
                                    ? "1px solid rgba(245, 197, 66, 0.3)"
                                    : "1px solid transparent",
                                borderRadius: "10px",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={state.lastEntryNotSure}
                                onChange={(e) => setField("lastEntryNotSure", e.target.checked)}
                                style={{ width: "18px", height: "18px", accentColor: "#f5c542" }}
                            />
                            Not sure
                        </label>
                    </div>
                </div>

                {/* Stay Expiry Date */}
                <div>
                    <label className="label" htmlFor="expiryDate">
                        Stay Expiry Date (Permission to Stay Until)
                    </label>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <input
                            id="expiryDate"
                            type="date"
                            className="input-field"
                            value={state.expiryNotSure ? "" : state.expiryDate}
                            onChange={(e) => setField("expiryDate", e.target.value)}
                            disabled={state.expiryNotSure}
                            style={{
                                flex: 1,
                                opacity: state.expiryNotSure ? 0.4 : 1,
                            }}
                        />
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#94a3b8",
                                fontSize: "0.9rem",
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                                padding: "0.5rem 0.75rem",
                                background: state.expiryNotSure
                                    ? "rgba(245, 197, 66, 0.1)"
                                    : "transparent",
                                border: state.expiryNotSure
                                    ? "1px solid rgba(245, 197, 66, 0.3)"
                                    : "1px solid transparent",
                                borderRadius: "10px",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={state.expiryNotSure}
                                onChange={(e) => setField("expiryNotSure", e.target.checked)}
                                style={{ width: "18px", height: "18px", accentColor: "#f5c542" }}
                            />
                            Not sure
                        </label>
                    </div>
                </div>

                {/* 90-Day Due Date (for 90-day flow only) */}
                {show90Day && (
                    <div className="animate-fade-in">
                        <label className="label" htmlFor="ninetyDayDueDate">
                            90-Day Reporting Due Date
                        </label>
                        <input
                            id="ninetyDayDueDate"
                            type="date"
                            className="input-field"
                            value={state.ninetyDayDueDate}
                            onChange={(e) => setField("ninetyDayDueDate", e.target.value)}
                        />
                        <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.35rem" }}>
                            Check your last TM.47 receipt or passport stamp for the due date.
                        </p>
                    </div>
                )}
            </div>

            {/* === EDGE CASE #3: DEADLINE URGENCY === */}

            {/* Extension/Retirement: Strict deadline warning */}
            {showExpiryUrgency && state.expiryDate && !isNaN(daysToExpiry) && (
                <div
                    className={daysToExpiry <= 7 ? "urgency-red" : "caution-yellow"}
                    style={{ marginBottom: "1.25rem" }}
                >
                    <div className={daysToExpiry <= 7 ? "urgency-title" : "caution-title"}>
                        <Icon name="exclamation" className="inline-block mr-1" />{daysToExpiry <= 7 ? "" : ""} Strict deadline: Permission expires{" "}
                        {daysToExpiry <= 0
                            ? "TODAY or has passed!"
                            : `in ${daysToExpiry} day${daysToExpiry === 1 ? "" : "s"} `}
                    </div>
                    <div style={{ lineHeight: 1.6, fontSize: "0.9rem" }}>
                        {daysToExpiry <= 0
                            ? "If your stay permission has passed, you may be considered overstaying. Contact your immigration office immediately."
                            : "If you miss this date, you may be considered overstaying. Apply early and verify your office's process."}
                    </div>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", fontStyle: "italic", opacity: 0.8 }}>
                        System/office behavior warning — not official; verify locally.
                    </div>
                </div>
            )}

            {/* 90-Day: Timeline bar */}
            {show90Day && state.ninetyDayDueDate && (
                <div className="caution-yellow" style={{ marginBottom: "1.25rem" }}>
                    <div className="caution-title">
                        <Icon name="calendar" className="inline-block mr-1" /> 90-Day Reporting Timeline
                    </div>
                    <div className="timeline-bar">
                        <div className="seg seg-early">Earliest (15 days before)</div>
                        <div className="seg seg-due">Due date</div>
                        <div className="seg seg-late">Late (up to ~7 days)</div>
                    </div>
                    <div style={{ fontSize: "0.82rem", lineHeight: 1.5, marginTop: "0.5rem" }}>
                        You may submit from <strong>15 days before</strong> until the due date.
                        Some offices may accept late in-person reports up to ~7 days after.
                        Online reporting may have a narrower window than in-person. Verify locally.
                    </div>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", fontStyle: "italic", opacity: 0.8 }}>
                        System/office behavior — not official; verify locally.
                    </div>
                </div>
            )}

            {/* === EDGE CASE #1: ONLINE SYSTEM WARNING === */}
            {onlineWarningRed && (
                <div className="urgency-red" style={{ marginBottom: "1.25rem" }}>
                    <div className="urgency-title">
                        <Icon name="exclamation" className="inline-block mr-1" /> Backup plan: Deadline within 3 days
                    </div>
                    <div style={{ lineHeight: 1.6, fontSize: "0.92rem" }}>
                        Immigration online systems may be offline or reject valid
                        submissions. <strong>Prepare a paper packet and consider going in
                            person</strong> since your deadline is very close.
                    </div>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", fontStyle: "italic", opacity: 0.8 }}>
                        System/office behavior warning — not official; verify locally.
                    </div>
                </div>
            )}
            {onlineWarningYellow && (
                <div className="caution-yellow" style={{ marginBottom: "1.25rem" }}>
                    <div className="caution-title flex items-center gap-2">
                        <Icon name="warning" className="w-5 h-5 text-current" ariaLabel="Warning" /> Online system note
                    </div>
                    <div style={{ lineHeight: 1.6, fontSize: "0.9rem" }}>
                        Immigration online systems may be offline or reject valid submissions.
                        If your deadline is within 3 days, prepare a paper packet and consider going in person.
                    </div>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", fontStyle: "italic", opacity: 0.8 }}>
                        System/office behavior warning — not official; verify locally.
                    </div>
                </div>
            )}

            {/* === EDGE CASE #2: HOTEL STAY → TM30 OVERWRITE === */}
            {showHotelQuestion && (
                <div className="hotel-card" style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Icon name="office" className="w-5 h-5 text-current" ariaLabel="Hotel" /> Recent hotel stay?
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.5 }}>
                        Have you stayed at a hotel in Thailand recently (past 14 days)?
                    </div>
                    <div className="hotel-options">
                        {(["yes", "no", "not_sure"] as HotelStay[]).map((v) => (
                            <button
                                key={v}
                                type="button"
                                className={state.recentHotelStay === v ? "selected" : ""}
                                onClick={() => setField("recentHotelStay", v)}
                            >
                                {v === "yes" ? (
                                    <span className="flex items-center gap-1 justify-center"><Icon name="check" className="w-4 h-4 text-green-500" ariaLabel="Yes" /> Yes</span>
                                ) : v === "no" ? (
                                    <span className="flex items-center gap-1 justify-center"><Icon name="x" className="w-4 h-4 text-red-500" ariaLabel="No" /> No</span>
                                ) : (
                                    <span className="flex items-center gap-1 justify-center"><Icon name="question" className="w-4 h-4 text-yellow-500" ariaLabel="Not sure" /> Not sure</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* TM30 update warning */}
                    {(state.recentHotelStay === "yes" || state.recentHotelStay === "not_sure") && (
                        <div
                            className="caution-yellow animate-fade-in"
                            style={{ marginTop: "1rem" }}
                        >
                            <div className="caution-title">
                                📋 TM30 update likely
                            </div>
                            <div style={{ lineHeight: 1.6, fontSize: "0.88rem" }}>
                                When you stay at a hotel, the hotel may file a new address
                                notification. Some offices may ask your home landlord/host to
                                update TM30 again. <strong>Verify with your local office.</strong>
                            </div>
                            <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", fontStyle: "italic", opacity: 0.8 }}>
                                System/office behavior — not official; verify locally.
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Privacy Mode Toggle */}
            <div
                style={{
                    padding: "1.25rem",
                    background: "rgba(59, 130, 246, 0.05)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "14px",
                    marginBottom: "2rem",
                }}
            >
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        cursor: "pointer",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={state.privacyMode}
                        onChange={(e) => setField("privacyMode", e.target.checked)}
                        style={{ width: "22px", height: "22px", accentColor: "#3b82f6" }}
                        id="privacy-mode"
                    />
                    <div>
                        <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                            🔒 Privacy Mode{" "}
                            <span
                                style={{
                                    fontSize: "0.7rem",
                                    padding: "2px 8px",
                                    borderRadius: "6px",
                                    background: state.privacyMode
                                        ? "rgba(34, 197, 94, 0.2)"
                                        : "rgba(239, 68, 68, 0.2)",
                                    color: state.privacyMode ? "#22c55e" : "#ef4444",
                                    fontWeight: 600,
                                }}
                            >
                                {state.privacyMode ? "ON" : "OFF"}
                            </span>
                        </div>
                        <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                            When on, DOB and exact dates are hidden on the PDF (shows month/year or omitted)
                        </div>
                    </div>
                </label>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <button className="btn-ghost" onClick={prevStep} id="step4-back">
                    ← Back
                </button>
                <button className="btn-primary" onClick={nextStep} id="step4-next">
                    Continue →
                </button>
            </div>
        </div>
    );
}
