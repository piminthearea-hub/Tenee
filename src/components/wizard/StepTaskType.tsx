"use client";

import { useWizard, TaskType, TASK_LABELS, FinancialProofType } from "@/lib/wizard-context";
import { TASK_DESCRIPTIONS } from "@/lib/checklist-data";

const TASK_ICONS: Record<TaskType, string> = {
    retirement: "🏖️",
    visa_extension: "📑",
    ninety_day: "📆",
    tm30: "🏠",
    reentry: "✈️",
};

const TASK_COLORS: Record<TaskType, string> = {
    retirement: "#f5c542",
    visa_extension: "#3b82f6",
    ninety_day: "#2dd4bf",
    tm30: "#8b5cf6",
    reentry: "#f43f5e",
};

export default function StepTaskType() {
    const { state, setField, nextStep, prevStep } = useWizard();

    const canProceed = !!state.taskType;

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                What are you preparing for?
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "2rem", fontSize: "1rem" }}>
                Choose the type of task. We&apos;ll create a tailored checklist and packet.
            </p>

            <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
                {(Object.keys(TASK_LABELS) as TaskType[]).map((task) => (
                    <button
                        key={task}
                        type="button"
                        onClick={() => setField("taskType", task)}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1rem",
                            padding: "1.25rem 1.5rem",
                            background:
                                state.taskType === task
                                    ? `${TASK_COLORS[task]}11`
                                    : "rgba(255,255,255,0.03)",
                            border:
                                state.taskType === task
                                    ? `2px solid ${TASK_COLORS[task]}88`
                                    : "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "14px",
                            cursor: "pointer",
                            textAlign: "left",
                            color: "inherit",
                            transition: "all 0.2s ease",
                        }}
                        id={`task-${task}`}
                    >
                        <span style={{ fontSize: "1.8rem" }}>{TASK_ICONS[task]}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                                {TASK_LABELS[task]}
                            </div>
                            <div style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.4 }}>
                                {TASK_DESCRIPTIONS[task]}
                            </div>
                        </div>
                        <div
                            style={{
                                width: "22px",
                                height: "22px",
                                borderRadius: "50%",
                                border:
                                    state.taskType === task
                                        ? `6px solid ${TASK_COLORS[task]}`
                                        : "2px solid rgba(255,255,255,0.2)",
                                flexShrink: 0,
                                marginTop: "4px",
                                transition: "all 0.2s ease",
                            }}
                        />
                    </button>
                ))}
            </div>

            {/* TM30 Guardrail */}
            {state.taskType === "tm30" && (
                <div className="info-box animate-fade-in" style={{ marginBottom: "1.5rem" }}>
                    <strong>ℹ️ Note:</strong> This checklist helps you request/obtain the TM30
                    receipt/proof from your landlord, host, or hotel. The TM30 filing itself is
                    the responsibility of the landlord/host.
                </div>
            )}

            {/* 90-Day Help Card */}
            {state.taskType === "ninety_day" && (
                <div className="info-box animate-fade-in" style={{ marginBottom: "1.5rem" }}>
                    <strong>💡 Help:</strong> If your online 90-day reporting status is
                    pending or rejected: requirements vary; you may need to retry or visit in
                    person. Verify with your local office.
                </div>
            )}

            {/* Retirement Financial Proof Selector */}
            {state.taskType === "retirement" && (
                <div className="animate-fade-in" style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                        Which financial proof will you use?
                    </h3>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        {([
                            { value: "deposit", label: "Bank Deposit (≥ 800,000 THB)", icon: "🏦" },
                            { value: "monthly_income", label: "Monthly Income (≥ 65,000 THB/month)", icon: "💰" },
                            { value: "combination", label: "Combination (Deposit + Income)", icon: "➕" },
                            { value: "not_sure", label: "Not sure yet", icon: "❓" },
                        ] as { value: FinancialProofType; label: string; icon: string }[]).map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setField("financialProofType", opt.value)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    padding: "0.875rem 1.25rem",
                                    background:
                                        state.financialProofType === opt.value
                                            ? "rgba(245, 197, 66, 0.1)"
                                            : "rgba(255,255,255,0.03)",
                                    border:
                                        state.financialProofType === opt.value
                                            ? "2px solid rgba(245, 197, 66, 0.5)"
                                            : "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    color: "inherit",
                                    textAlign: "left",
                                    fontSize: "0.95rem",
                                    transition: "all 0.2s ease",
                                }}
                                id={`financial-${opt.value}`}
                            >
                                <span>{opt.icon}</span>
                                <span style={{ fontWeight: 600 }}>{opt.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="disclaimer-banner" style={{ marginTop: "0.75rem", fontSize: "0.8rem" }}>
                        ⚠️ Banks/offices may request specific formats or time-held evidence; verify locally.
                    </div>
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <button className="btn-ghost" onClick={prevStep} id="step2-back">
                    ← Back
                </button>
                <button
                    className="btn-primary"
                    onClick={nextStep}
                    disabled={!canProceed}
                    id="step2-next"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
