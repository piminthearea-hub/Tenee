"use client";

import { useState } from "react";
import Link from "next/link";
import DocumentRequestGenerator from "@/components/legal/DocumentRequestGenerator";

type IssueType = "landlord" | "consumer" | "employment" | "family" | "criminal" | "online" | "other";

interface TimelineEvent {
    id: string;
    date: string;
    description: string;
    evidence: string;
}

export default function LegalClaimsPage() {
    const [hasConsent, setHasConsent] = useState(false);
    const [facts, setFacts] = useState("");
    const [issueType, setIssueType] = useState<IssueType | "">("");
    const [location, setLocation] = useState("");
    const [incidentDate, setIncidentDate] = useState("");
    const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);

    // Outputs visible after facts are entered and consent given
    const [showOutputs, setShowOutputs] = useState(false);
    const [timeline, setTimeline] = useState<TimelineEvent[]>([
        { id: "1", date: "", description: "", evidence: "" }
    ]);

    const CHAR_LIMIT = 800;

    const clearData = () => {
        if (confirm("Are you sure you want to clear all typed facts and organized data? This cannot be undone.")) {
            setHasConsent(false);
            setFacts("");
            setIssueType("");
            setLocation("");
            setIncidentDate("");
            setSelectedEvidence([]);
            setShowOutputs(false);
            setTimeline([{ id: "1", date: "", description: "", evidence: "" }]);
        }
    };

    const toggleEvidence = (id: string) => {
        setSelectedEvidence(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const addTimelineRow = () => {
        setTimeline([...timeline, { id: Math.random().toString(), date: "", description: "", evidence: "" }]);
    };

    const updateTimeline = (id: string, field: keyof TimelineEvent, value: string) => {
        setTimeline(timeline.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    const getQuestionsByIssue = () => {
        switch (issueType) {
            case "landlord":
                return [
                    "Which District Office (Khet/Amphoe) has jurisdiction over this property?",
                    "What is the notice period required by law for this type of dispute?",
                    "Is there a specific 'Damages' limit for the Small Claims court?"
                ];
            case "consumer":
                return [
                    "Is the vendor registered with the OCPB (Office of the Consumer Protection Board)?",
                    "What is the prescription period (statute of limitations) for a consumer claim?",
                    "Can this be filed via the online e-filing system for consumers?"
                ];
            default:
                return [
                    "Which office or court has territorial jurisdiction over this location?",
                    "What are the mandatory mediation requirements before filing?",
                    "What specific original documents must be produced at the first hearing?"
                ];
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>
            {/* Safety Banner */}
            <div style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "2px solid #ef4444",
                borderRadius: "16px",
                padding: "1.5rem",
                marginBottom: "2.5rem",
                color: "#f87171",
                textAlign: "center"
            }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>🛡️ Safety Guardrails & Disclaimer</h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>
                    <strong>Information only. Not a law firm. Not legal advice. Not representation.</strong><br />
                    We do not assess liability, predict outcomes, or provide counsel. This is an organizational toolkit only.
                </p>
            </div>

            <div className="animate-fade-in" style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
                    <span className="gradient-text-teal">Fact Intake & Organizer</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
                    Organize your facts and evidence clearly before speaking to an authority or lawyer.
                </p>
                <button onClick={clearData} className="btn-secondary" style={{ marginTop: "1rem", color: "#f87171" }}>
                    🗑️ Clear My Data
                </button>
            </div>

            <div className="glass-card" style={{ padding: "2rem", marginBottom: "3rem" }}>
                {/* Privacy Consent */}
                <div style={{
                    background: hasConsent ? "rgba(45, 212, 191, 0.05)" : "rgba(255, 255, 255, 0.02)",
                    border: hasConsent ? "1px solid #2dd4bf" : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    marginBottom: "2rem",
                    cursor: "pointer"
                }} onClick={() => setHasConsent(!hasConsent)}>
                    <label style={{ display: "flex", gap: "1rem", alignItems: "center", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={hasConsent}
                            onChange={() => setHasConsent(!hasConsent)}
                            style={{ width: "24px", height: "24px" }}
                        />
                        <span style={{ fontSize: "1.05rem", fontWeight: 600, color: hasConsent ? "#2dd4bf" : "#cbd5e1" }}>
                            I will not include sensitive personal data (passport numbers, full DOB, bank details, private addresses).
                        </span>
                    </label>
                </div>

                <div style={{ opacity: hasConsent ? 1 : 0.5, pointerEvents: hasConsent ? "auto" : "none" }}>
                    {/* Fact Description */}
                    <div style={{ marginBottom: "2rem" }}>
                        <label className="label" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                            Describe what happened (facts only)
                        </label>
                        <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "0.75rem" }}>
                            Write only facts (dates, actions, messages). Avoid opinions or legal conclusions.
                        </p>
                        <textarea
                            className="input-field"
                            placeholder="On [date] at [city], I [did/paid/signed]. The other party [did/said]. I have [receipt/chat]."
                            value={facts}
                            onChange={(e) => setFacts(e.target.value.slice(0, CHAR_LIMIT))}
                            style={{ minHeight: "200px", fontSize: "1.1rem" }}
                        />
                        <div style={{ textAlign: "right", fontSize: "0.85rem", color: facts.length >= CHAR_LIMIT ? "#ef4444" : "#94a3b8", marginTop: "0.5rem" }}>
                            {facts.length} / {CHAR_LIMIT} characters
                        </div>
                    </div>

                    {/* Structured Fields */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
                        <div>
                            <label className="label">Issue Type</label>
                            <select
                                className="input-field"
                                value={issueType}
                                onChange={(e) => setIssueType(e.target.value as IssueType)}
                            >
                                <option value="">Select issue type...</option>
                                <option value="landlord">Landlord / Tenant</option>
                                <option value="consumer">Consumer Dispute</option>
                                <option value="employment">Employment</option>
                                <option value="family">Family</option>
                                <option value="criminal">Criminal</option>
                                <option value="online">Online Dispute</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Location (Province/City)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Bangkok, Phuket"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">Incident Date(s)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. March 2026 or 2026-03-01"
                                value={incidentDate}
                                onChange={(e) => setIncidentDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">Parties Involved (Your Role)</label>
                            <select className="input-field">
                                <option>Select your role...</option>
                                <option>Claimant / Plaintiff</option>
                                <option>Respondent / Defendant</option>
                                <option>Affected Person</option>
                                <option>Witness</option>
                            </select>
                        </div>
                    </div>

                    {/* Evidence Checklist */}
                    <div style={{ marginBottom: "2.5rem" }}>
                        <label className="label" style={{ fontWeight: 700 }}>Available Evidence (Check all that apply)</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
                            {[
                                { id: "receipts", label: "Receipts / Payment Slips" },
                                { id: "contract", label: "Contract / Agreement" },
                                { id: "chat", label: "Chat Logs (Line/WhatsApp)" },
                                { id: "photos", label: "Photos / Videos" },
                                { id: "witness", label: "Witnesses" },
                                { id: "bank", label: "Bank Transfer Slip" }
                            ].map(item => (
                                <label key={item.id} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    padding: "1rem",
                                    background: "rgba(255,255,255,0.03)",
                                    borderRadius: "10px",
                                    cursor: "pointer"
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedEvidence.includes(item.id)}
                                        onChange={() => toggleEvidence(item.id)}
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                    <span style={{ fontSize: "0.95rem" }}>{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowOutputs(true)}
                        className="btn-primary"
                        style={{ width: "100%", padding: "1.5rem", fontSize: "1.2rem" }}
                        disabled={!facts || !issueType}
                    >
                        ✨ Generate Organizer Tools
                    </button>
                    {!facts && <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.85rem", marginTop: "0.75rem" }}>Please enter facts to proceed.</p>}
                </div>
            </div>

            {showOutputs && (
                <div className="animate-fade-in">
                    {/* A. Timeline Builder */}
                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "3rem", borderLeft: "4px solid #f5c542" }}>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.5rem" }}>📅 Timeline Builder (Editable)</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", color: "#cbd5e1" }}>
                                <thead>
                                    <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                        <th style={{ padding: "1rem" }}>Date</th>
                                        <th style={{ padding: "1rem" }}>Event Description</th>
                                        <th style={{ padding: "1rem" }}>Evidence Filename</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeline.map((row) => (
                                        <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                            <td style={{ padding: "0.5rem" }}>
                                                <input
                                                    type="text"
                                                    placeholder="YYYY-MM-DD"
                                                    value={row.date}
                                                    onChange={(e) => updateTimeline(row.id, "date", e.target.value)}
                                                    style={{ background: "transparent", border: "none", color: "#fff", width: "100%" }}
                                                />
                                            </td>
                                            <td style={{ padding: "0.5rem" }}>
                                                <input
                                                    type="text"
                                                    placeholder="Describe event..."
                                                    value={row.description}
                                                    onChange={(e) => updateTimeline(row.id, "description", e.target.value)}
                                                    style={{ background: "transparent", border: "none", color: "#fff", width: "100%" }}
                                                />
                                            </td>
                                            <td style={{ padding: "0.5rem" }}>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Receipt_01.jpg"
                                                    value={row.evidence}
                                                    onChange={(e) => updateTimeline(row.id, "evidence", e.target.value)}
                                                    style={{ background: "transparent", border: "none", color: "#fff", width: "100%" }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={addTimelineRow} className="btn-secondary" style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                                + Add Row
                            </button>
                        </div>
                    </div>

                    {/* B. Evidence Checklist */}
                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "3rem", borderLeft: "4px solid #2dd4bf" }}>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.5rem" }}>📂 Evidence Inventory Checklist</h2>
                        <ul style={{ paddingLeft: "1.2rem", color: "#94a3b8", lineHeight: 1.8 }}>
                            <li>Original Signed Contract(s)</li>
                            <li>Electronic Transfer Receipts (PDF/Paper)</li>
                            <li>Printed Chat Histories (showing full context)</li>
                            <li>Property/Incident Photos (with timestamps)</li>
                            <li style={{ color: "#f5c542" }}>IDs of parties (Do not upload copies here)</li>
                        </ul>
                        <p style={{ marginTop: "1rem", fontSize: "0.85rem", fontStyle: "italic", color: "#64748b" }}>
                            Gather these documents into a physical or digital folder before your meeting.
                        </p>
                    </div>

                    {/* C. Questions for Authorities */}
                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "3rem", borderLeft: "4px solid #3b82f6" }}>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.5rem" }}>❓ Questions to Ask an Authority</h2>
                        <div style={{ display: "grid", gap: "1rem" }}>
                            {getQuestionsByIssue().map((q, idx) => (
                                <div key={idx} style={{ padding: "1rem", background: "rgba(59, 130, 246, 0.05)", borderRadius: "10px", color: "#93c5fd" }}>
                                    {q}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* D. Thai Message Templates */}
                    <div className="glass-card" style={{ padding: "2rem", borderLeft: "4px solid #8b5cf6" }}>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.5rem" }}>🇹🇭 Neutral Thai Message Templates</h2>

                        <div style={{ display: "grid", gap: "2rem" }}>
                            <div>
                                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#a78bfa", marginBottom: "0.75rem" }}>1. Request for Appointment (นัดหมาย)</h3>
                                <div style={{ padding: "1.5rem", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                                        สวัสดีค่ะ/ครับ ฉันต้องการขอนัดหมายเพื่อพูดคุยเกี่ยวกับเรื่อง [ระบุเรื่อง] ในวันและเวลาที่สะดวกค่ะ/ครับ
                                    </div>
                                    <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                                        "Hello, I would like to request an appointment to discuss [ISSUE] at your convenience."
                                    </div>
                                    <button onClick={() => copyToClipboard("สวัสดีค่ะ/ครับ ฉันต้องการขอนัดหมายเพื่อพูดคุยเกี่ยวกับเรื่อง... ในวันและเวลาที่สะดวกค่ะ/ครับ")} className="btn-secondary" style={{ marginTop: "1rem", padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>
                                        📋 Copy Template
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#a78bfa", marginBottom: "0.75rem" }}>2. Request for Documents (ขอเอกสาร)</h3>
                                <div style={{ padding: "1.5rem", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                                        รบกวนขอสำเนาเอกสาร [ระบุชื่อเอกสาร] เพื่อประกอบการตรวจสอบข้อมูลเบื้องต้นด้วยค่ะ/ครับ ขอบคุณค่ะ/ครับ
                                    </div>
                                    <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                                        "Could you please provide a copy of [DOCUMENT] for basic verification? Thank you."
                                    </div>
                                    <button onClick={() => copyToClipboard("รบกวนขอสำเนาเอกสาร... เพื่อประกอบการตรวจสอบข้อมูลเบื้องต้นด้วยค่ะ/ครับ ขอบคุณค่ะ/ครับ")} className="btn-secondary" style={{ marginTop: "1rem", padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>
                                        📋 Copy Template
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#a78bfa", marginBottom: "0.75rem" }}>3. Request for Clarification (ขอคำชี้แจง)</h3>
                                <div style={{ padding: "1.5rem", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                                        ขอสอบถามข้อมูลเพิ่มเติมเกี่ยวกับ [ระบุประเด็นที่สงสัย] เพื่อทำความเข้าใจสถานการณ์ให้ตรงกันค่ะ/ครับ ขอบคุณค่ะ/ครับ
                                    </div>
                                    <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                                        "I would like to ask for more information regarding [POINT OF CONFUSION] to ensure we have the same understanding. Thank you."
                                    </div>
                                    <button onClick={() => copyToClipboard("ขอสอบถามข้อมูลเพิ่มเติมเกี่ยวกับ... เพื่อทำความเข้าใจสถานการณ์ให้ตรงกันค่ะ/ครับ ขอบคุณค่ะ/ครับ")} className="btn-secondary" style={{ marginTop: "1rem", padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>
                                        📋 Copy Template
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* E. Document Request Generator */}
                    <DocumentRequestGenerator />
                </div>
            )}
        </div>
    );
}
