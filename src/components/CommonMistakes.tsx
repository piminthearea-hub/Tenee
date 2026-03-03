"use client";

import React from "react";
import { TaskType, TASK_LABELS } from "@/lib/wizard-context";

interface CommonMistakesProps {
    taskType: TaskType | null;
}

const MISTAKES: Record<TaskType, string[]> = {
    retirement: [
        "Don’t wait until the last minute—office requirements can vary.",
        "Bring extra copies—many offices request additional photocopies.",
        "Verify bank letter dates—some offices require them to be very recent (e.g., within 24–72 hours).",
        "Do not share passport images in public chats; use last-4 only."
    ],
    visa_extension: [
        "Check for public holidays—offices close on all Thai national holidays.",
        "Bring plenty of 4x6cm photos—standard passport size may be rejected.",
        "Have an in-person backup if urgent—online systems may be offline.",
        "Do not share passport images in public chats; use last-4 only."
    ],
    ninety_day: [
        "Online systems may be offline—have an in-person backup if urgent.",
        "Keep your previous receipt—it may be requested even if reporting online.",
        "Don't report too early or too late—the window is usually 15 days before to 7 days after.",
        "Do not share passport images in public chats; use last-4 only."
    ],
    tm30: [
        "Landlord must file first—you cannot get the receipt until they report your stay.",
        "Always get a physical or digital copy of the receipt—don't just take their word.",
        "Recent hotel stays may reset your TM30—verify with your local office.",
        "Do not share passport images in public chats; use last-4 only."
    ],
    reentry: [
        "Do this BEFORE you leave Thailand—your visa may be cancelled if you leave without one.",
        "Check airport hours—re-entry desks at airports aren't always open 24/7.",
        "Multiple vs Single—if you plan to travel more than 3 times, Multiple is usually better value.",
        "Do not share passport images in public chats; use last-4 only."
    ]
};

export default function CommonMistakes({ taskType }: CommonMistakesProps) {
    if (!taskType) return null;

    const mistakes = MISTAKES[taskType] || [];

    return (
        <div
            className="glass-card"
            style={{
                borderLeft: "4px solid #f59e0b",
                background: "rgba(245, 158, 11, 0.05)",
                marginBottom: "1.5rem"
            }}
        >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f59e0b", marginBottom: "0.75rem" }}>
                Common mistakes (quick check)
            </h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.95rem", color: "#e2e8f0", lineHeight: 1.6 }}>
                {mistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                ))}
            </ul>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.75rem", fontStyle: "italic" }}>
                Note: Requirements vary by office. Always verify locally.
            </p>
        </div>
    );
}
