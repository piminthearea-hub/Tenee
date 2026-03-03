"use client";

import { useWizard, WizardProvider } from "@/lib/wizard-context";
import { getChecklistSections } from "@/lib/checklist-data";
import PrintPageButton from "@/components/PrintPageButton";

function OfficePlanContent() {
    const { state } = useWizard();

    // If no state or no task type, they haven't run the wizard
    if (!state.taskType) {
        return (
            <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>No Plan Found</h1>
                <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
                    Please generate a packet first to view your office visit plan.
                </p>
                <a href="/wizard" className="btn-primary" style={{ textDecoration: "none" }}>
                    Go to Packet Generator
                </a>
            </div>
        );
    }

    const sections = getChecklistSections(state.taskType, state.financialProofType);

    // Filter checklist into Originals vs Copies
    const originals = sections
        .flatMap(s => s.items)
        .filter(item => item.label.toLowerCase().includes("original") || item.label.toLowerCase().includes("passport") || item.label.toLowerCase().includes("book") || item.label.toLowerCase().includes("receipt"));

    // Everything else can be considered "Copies/Prints" or general prep
    const copies = sections
        .flatMap(s => s.items)
        .filter(item => !originals.includes(item));

    // Conditional Notes
    const show90DayNote = state.taskType === "ninety_day";
    const showHotelNote = state.recentHotelStay === "yes" || state.recentHotelStay === "not_sure";

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
            <div className="print-hide" style={{ marginBottom: "2rem", textAlign: "center" }}>
                <PrintPageButton />
                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "1rem" }}>
                    Print this page and take it with you to the immigration office.
                </p>
            </div>

            {/* Main Printable Area */}
            <div className="print-area" style={{ background: "#fff", color: "#000", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>

                <header style={{ borderBottom: "3px solid #000", paddingBottom: "1rem", marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: 800, margin: 0 }}>OFFICE VISIT PLAN</h1>
                    <div style={{ fontSize: "1.2rem", marginTop: "0.5rem", color: "#475569" }}>
                        For: <strong style={{ color: "#000" }}>{state.fullName || "_________________"}</strong>
                    </div>
                </header>

                <div style={{ display: "grid", gap: "2rem" }}>

                    {/* What to Bring: Originals */}
                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, borderBottom: "2px solid #cbd5e1", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                            1. Bring these ORIGINALS
                        </h2>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "1.2rem", lineHeight: 1.6 }}>
                            {originals.length > 0 ? (
                                originals.map((item, i) => (
                                    <li key={i} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "1.5rem" }}>☐</span> {item.label.replace(/\(Original\)/i, '').trim()}
                                    </li>
                                ))
                            ) : (
                                <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                    <span style={{ fontSize: "1.5rem" }}>☐</span> Passport (Always required)
                                </li>
                            )}
                        </ul>
                    </section>

                    {/* What to Bring: Copies */}
                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, borderBottom: "2px solid #cbd5e1", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                            2. Bring these COPIES / PRINTS
                        </h2>
                        <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px", border: "1px dashed #cbd5e1", marginBottom: "1rem", fontSize: "1rem" }}>
                            <em>Tip: Sign every copy in blue ink.</em>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "1.2rem", lineHeight: 1.6 }}>
                            <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                <span style={{ fontSize: "1.5rem" }}>☐</span> Packet Cover Page & Checklist
                            </li>
                            {copies.map((item, i) => (
                                <li key={i} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                    <span style={{ fontSize: "1.5rem" }}>☐</span> {item.label.replace(/\(Copy\)/i, '').trim()}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* What to do at counter */}
                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, borderBottom: "2px solid #cbd5e1", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                            3. What to do at the counter
                        </h2>
                        <ul style={{ paddingLeft: "1.5rem", fontSize: "1.2rem", lineHeight: 1.6 }}>
                            <li>Hand them your organized <strong>Preparation Packet</strong>.</li>
                            <li>Smile and be polite (say "Sawasdee krap/kha").</li>
                            <li>If they ask for something you don't have, don't argue. Take notes.</li>
                        </ul>
                    </section>

                    {/* Questions to ask */}
                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, borderBottom: "2px solid #cbd5e1", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                            4. Questions to ask (Polite)
                        </h2>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "1.2rem", lineHeight: 1.6 }}>
                            <li style={{ marginBottom: "0.5rem" }}>• "Is anything missing?"</li>
                            <li style={{ marginBottom: "0.5rem" }}>• "Do you require TM30 proof?"</li>
                            <li style={{ marginBottom: "0.5rem" }}>• "What is the next step?"</li>
                        </ul>
                    </section>

                    {/* Conditional Warnings */}
                    {(show90DayNote || showHotelNote) && (
                        <section style={{ border: "2px solid #f59e0b", padding: "1.5rem", borderRadius: "8px", background: "#fffbeb" }}>
                            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#d97706", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                ⚠️ Important Notes
                            </h2>
                            <ul style={{ paddingLeft: "1.5rem", fontSize: "1.1rem", lineHeight: 1.5, color: "#92400e" }}>
                                {show90DayNote && (
                                    <li style={{ marginBottom: "0.5rem" }}><strong>90-Day Reporting:</strong> The online system is frequently down. If applying in person, expect queues.</li>
                                )}
                                {showHotelNote && (
                                    <li style={{ marginBottom: "0.5rem" }}><strong>Recent Hotel Stay:</strong> Because you stayed at a hotel, your TM30 address record might have changed. Ask the officer to check if your TM30 needs updating by your long-term landlord.</li>
                                )}
                            </ul>
                        </section>
                    )}

                    {/* General Reminders */}
                    <section style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "2px solid #000", fontSize: "1.1rem" }}>
                        <strong>Before you go:</strong> Check Thai public holidays (offices will be closed). Arrive early in the morning. Bring a blue pen.
                    </section>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    body { background: white !important; }
                    nav, .print-hide, footer { display: none !important; }
                    .print-area { border: none !important; padding: 0 !important; }
                }
            `}} />
        </div>
    );
}

export default function OfficePlanPage() {
    return (
        <WizardProvider>
            <OfficePlanContent />
        </WizardProvider>
    );
}
