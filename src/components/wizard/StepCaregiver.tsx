"use client";

import { useWizard, WizardMode } from "@/lib/wizard-context";
import Icon from "@/components/Icon";

export default function StepCaregiver() {
    const { state, setField, nextStep } = useWizard();

    const canProceed =
        state.mode === "self" || (state.mode === "caregiver" && state.caregiverConsent);

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Who is this packet for?
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "2rem", fontSize: "1rem" }}>
                Select whether you&apos;re preparing paperwork for yourself or helping someone else.
            </p>

            <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                {([
                    {
                        value: "self" as WizardMode,
                        icon: <Icon name="user" className="icon text-current" ariaLabel="Myself" />,
                        title: "Myself",
                        desc: "I'm organizing my own paperwork",
                    },
                    {
                        value: "caregiver" as WizardMode,
                        icon: <Icon name="users" className="icon text-current" ariaLabel="Someone I Help" />,
                        title: "Someone I Help",
                        desc: "I'm a caregiver or family member helping someone",
                        badge: "Caregiver Mode",
                    },
                ]).map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setField("mode", option.value)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            padding: "1.25rem 1.5rem",
                            background:
                                state.mode === option.value
                                    ? "rgba(245, 197, 66, 0.1)"
                                    : "rgba(255,255,255,0.03)",
                            border:
                                state.mode === option.value
                                    ? "2px solid rgba(245, 197, 66, 0.5)"
                                    : "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "14px",
                            cursor: "pointer",
                            textAlign: "left",
                            color: "inherit",
                            transition: "all 0.2s ease",
                        }}
                        id={`mode-${option.value}`}
                    >
                        <span style={{ fontSize: "2rem" }}>{option.icon}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{option.title}</span>
                                {option.badge && (
                                    <span
                                        style={{
                                            fontSize: "0.7rem",
                                            padding: "2px 8px",
                                            borderRadius: "6px",
                                            background: "rgba(139, 92, 246, 0.2)",
                                            color: "#a78bfa",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {option.badge}
                                    </span>
                                )}
                            </div>
                            <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{option.desc}</span>
                        </div>
                        <div
                            style={{
                                width: "22px",
                                height: "22px",
                                borderRadius: "50%",
                                border:
                                    state.mode === option.value
                                        ? "6px solid #f5c542"
                                        : "2px solid rgba(255,255,255,0.2)",
                                flexShrink: 0,
                                transition: "all 0.2s ease",
                            }}
                        />
                    </button>
                ))}
            </div>

            {state.mode === "caregiver" && (
                <div
                    className="animate-fade-in"
                    style={{ marginBottom: "2rem" }}
                >
                    <label className="checkbox-wrapper" id="caregiver-consent-wrapper">
                        <input
                            type="checkbox"
                            checked={state.caregiverConsent}
                            onChange={(e) => setField("caregiverConsent", e.target.checked)}
                            id="caregiver-consent"
                        />
                        <span style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                            <strong>I have the applicant&apos;s consent</strong> to assist with
                            this paperwork preparation.
                        </span>
                    </label>
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                    className="btn-primary"
                    onClick={nextStep}
                    disabled={!canProceed}
                    id="step1-next"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
