"use client";

import { WizardProvider, useWizard } from "@/lib/wizard-context";
import StepCaregiver from "@/components/wizard/StepCaregiver";
import StepTaskType from "@/components/wizard/StepTaskType";
import StepPersonalDetails from "@/components/wizard/StepPersonalDetails";
import StepDates from "@/components/wizard/StepDates";
import StepReview from "@/components/wizard/StepReview";
import ShareModal from "@/components/ShareModal";
import { generateChecklistHtml, generatePacketHtml, downloadHtmlAsPdf } from "@/lib/pdf/generate-pdf";
import { useState } from "react";

const STEP_LABELS = [
    "Who",
    "Task",
    "Details",
    "Dates",
    "Review",
];

function WizardContent() {
    const { state, reset } = useWizard();
    const [isGenerating, setIsGenerating] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);

        try {
            // Small delay for UX
            await new Promise((r) => setTimeout(r, 600));

            // Generate Checklist PDF
            const checklistHtml = await generateChecklistHtml(state);
            downloadHtmlAsPdf(checklistHtml, "tenee-checklist.pdf");

            // Small delay between downloads
            await new Promise((r) => setTimeout(r, 1000));

            // Generate Packet PDF
            const packetHtml = await generatePacketHtml(state);
            downloadHtmlAsPdf(packetHtml, "tenee-packet.pdf");

            setShowShareModal(true);
        } catch (err) {
            console.error("Generation error:", err);
            alert("Something went wrong generating the PDFs. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCreateAnother = () => {
        setShowShareModal(false);
        reset();
    };

    const renderStep = () => {
        switch (state.currentStep) {
            case 1:
                return <StepCaregiver />;
            case 2:
                return <StepTaskType />;
            case 3:
                return <StepPersonalDetails />;
            case 4:
                return <StepDates />;
            case 5:
                return (
                    <StepReview
                        onGenerate={handleGenerate}
                        isGenerating={isGenerating}
                    />
                );
            default:
                return <StepCaregiver />;
        }
    };

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "0 auto",
                padding: "2rem 1.5rem 4rem",
            }}
        >
            {/* Progress Stepper */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.25rem",
                    marginBottom: "2.5rem",
                }}
            >
                {STEP_LABELS.map((label, i) => {
                    const stepNum = i + 1;
                    const isActive = stepNum === state.currentStep;
                    const isDone = stepNum < state.currentStep;

                    return (
                        <div key={label} style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                <div
                                    className={`step-indicator ${isActive ? "step-active" : isDone ? "step-done" : "step-pending"
                                        }`}
                                >
                                    {isDone ? "✓" : stepNum}
                                </div>
                                <span
                                    style={{
                                        fontSize: "0.65rem",
                                        color: isActive ? "#f5c542" : isDone ? "#22c55e" : "#64748b",
                                        fontWeight: isActive ? 700 : 500,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {label}
                                </span>
                            </div>
                            {i < STEP_LABELS.length - 1 && (
                                <div
                                    style={{
                                        width: "24px",
                                        height: "2px",
                                        background:
                                            isDone
                                                ? "#22c55e"
                                                : "rgba(255,255,255,0.1)",
                                        margin: "0 4px",
                                        marginBottom: "18px",
                                        borderRadius: "1px",
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Step Content */}
            {renderStep()}

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                onCreateAnother={handleCreateAnother}
            />

            {/* Clear Data */}
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
                {!confirmClear ? (
                    <button
                        onClick={() => setConfirmClear(true)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            textDecoration: "underline",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            opacity: 0.8
                        }}
                    >
                        Clear my data
                    </button>
                ) : (
                    <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", color: "#ef4444", fontWeight: 600 }}>Are you sure?</span>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <button
                                onClick={() => {
                                    const consent = localStorage.getItem("tenee_consent_given");
                                    localStorage.clear();
                                    sessionStorage.clear();
                                    if (consent) {
                                        localStorage.setItem("tenee_consent_given", consent);
                                    }
                                    reset();
                                    window.location.reload();
                                }}
                                style={{
                                    background: "#ef4444",
                                    border: "none",
                                    color: "#fff",
                                    padding: "0.4rem 1rem",
                                    borderRadius: "4px",
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                    fontWeight: 700
                                }}
                            >
                                Yes, Clear Data
                            </button>
                            <button
                                onClick={() => setConfirmClear(false)}
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    border: "none",
                                    color: "#cbd5e1",
                                    padding: "0.4rem 1rem",
                                    borderRadius: "4px",
                                    fontSize: "0.75rem",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function WizardPage() {
    return (
        <WizardProvider>
            <WizardContent />
        </WizardProvider>
    );
}
