"use client";

import { useState } from "react";

type IssueType = "landlord" | "consumer" | "employment" | "government" | "followup" | "";

export default function DocumentRequestGenerator() {
    const [hasConsent, setHasConsent] = useState(false);
    const [issueType, setIssueType] = useState<IssueType>("");

    // Form fields
    const [recipient, setRecipient] = useState("");
    const [sender, setSender] = useState("");
    const [contact, setContact] = useState("");
    const [reference, setReference] = useState("");
    const [deadline, setDeadline] = useState("");
    const [dateRange, setDateRange] = useState("");
    const [docRequest, setDocRequest] = useState(""); // For government
    const [extraDocs, setExtraDocs] = useState(""); // Free text max 200

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    const clearForm = () => {
        if (confirm("Clear all fields?")) {
            setIssueType("");
            setRecipient("");
            setSender("");
            setContact("");
            setReference("");
            setDeadline("");
            setDateRange("");
            setDocRequest("");
            setExtraDocs("");
        }
    };

    const generateThai = () => {
        if (!issueType) return "";

        let text = "";
        const recipientText = recipient ? `คุณ${recipient}` : "";
        const deadlineText = deadline ? `\n\nหากสะดวก รบกวนส่งภายในวันที่ ${deadline} ได้ไหมคะ/ครับ` : "";
        const contactText = contact ? `\n${contact}` : "";
        const senderText = sender ? `\n\n${sender}` : "";
        const extraDocsText = extraDocs ? `\nเพิ่มเติม: ${extraDocs}` : "";

        switch (issueType) {
            case "landlord":
                text = `เรื่อง: ขอเอกสาร/รายละเอียดประกอบการตรวจสอบ\n\nสวัสดีค่ะ/ครับ ${recipientText}\nรบกวนขอเอกสาร/รายละเอียดที่เกี่ยวข้องกับการเช่าที่พัก เพื่อให้ฉันสามารถตรวจสอบข้อมูลให้ถูกต้องได้ค่ะ/ครับ ได้แก่\n1) สัญญาเช่า/ข้อตกลงการเช่า (ถ้ามี)\n2) หลักฐานการชำระเงิน/ใบเสร็จ (ค่าเช่า/เงินประกัน)\n3) รายการสรุปยอดคงค้างหรือยอดเงินประกัน (ถ้ามี)\n4) รายละเอียดวันที่เกี่ยวข้อง (วันเริ่มเช่า/วันย้ายเข้า/วันย้ายออก)${extraDocsText}${deadlineText}\nขอบคุณมากค่ะ/ครับ${senderText}${contactText}`;
                // Remove greeting if no recipient
                if (!recipient) text = text.replace("คุณ\n", "\n"); // crude, better to build string carefully
                break;
            case "consumer":
                const refTextConsumer = reference ? `\n4) ช่องทางติดต่อผู้รับผิดชอบ/เลขที่ออเดอร์/เลขที่งาน: ${reference}` : "";
                text = `เรื่อง: ขอเอกสารประกอบ (ใบเสร็จ/ใบกำกับ/ประกัน/รายละเอียดบริการ)\n\nเรียน ${recipient || "ผู้เกี่ยวข้อง"}\nข้าพเจ้า ${sender || "ผู้ใช้บริการ"} รบกวนขอเอกสารประกอบเพื่อใช้ตรวจสอบรายการซื้อ/บริการให้ถูกต้อง ได้แก่\n1) ใบเสร็จ/ใบกำกับภาษี/หลักฐานการชำระเงิน\n2) เงื่อนไขการรับประกัน/นโยบายคืนสินค้า (ถ้ามี)\n3) รายละเอียดงานบริการ/ใบรับงาน/บันทึกการซ่อม (ถ้ามี)${refTextConsumer}${extraDocsText}${deadlineText}\nขอบคุณค่ะ/ครับ${senderText}${contactText}`;
                break;
            case "employment":
                const drText = dateRange ? ` (ช่วงวันที่ ${dateRange})` : "";
                text = `เรื่อง: ขอเอกสารยืนยันการจ้างงาน/การชำระค่าจ้าง\n\nเรียน ${recipient || "ผู้เกี่ยวข้อง"}\nข้าพเจ้า ${sender || "พนักงาน"} ขอความอนุเคราะห์เอกสารที่เกี่ยวข้องเพื่อใช้ตรวจสอบข้อมูลการจ้างงานให้ถูกต้อง ได้แก่\n1) สัญญาจ้าง/ข้อตกลงการจ้างงาน (ถ้ามี)\n2) สลิปเงินเดือน/หลักฐานการจ่ายค่าจ้าง${drText}\n3) หนังสือรับรองการทำงาน/รายละเอียดตำแหน่งงานและช่วงเวลาทำงาน (ถ้ามี)\n4) รายละเอียดการหักเงิน/สวัสดิการ (ถ้ามี)${extraDocsText}${deadlineText}\nขอบพระคุณค่ะ/ครับ${senderText}${contactText}`;
                break;
            case "government":
                const refTextGov = reference ? `\nเลขอ้างอิง (ถ้ามี): ${reference}` : "";
                const ctTextGov = contact ? `\nเบอร์ติดต่อ: ${contact}` : "";
                text = `เรื่อง: ขอความอนุเคราะห์ออกเอกสาร/สำเนารับรอง\n\nเรียน ${recipient || "เจ้าหน้าที่ที่เกี่ยวข้อง"}\nข้าพเจ้า ${sender || "ผู้ร้องขอ"} ขอความอนุเคราะห์ออกเอกสาร/สำเนารับรองเกี่ยวกับ ${docRequest || "[เอกสารที่ต้องการ]"} เพื่อใช้ประกอบการดำเนินการ/ยื่นเอกสารกับหน่วยงานที่เกี่ยวข้อง\n\nรายละเอียดผู้ขอ:\nชื่อ: ${sender || "-"}${refTextGov}${ctTextGov}\n\nจึงเรียนมาเพื่อโปรดพิจารณา และขอขอบพระคุณล่วงหน้าค่ะ/ครับ\n\nขอแสดงความนับถือ${senderText}`;
                break;
            case "followup":
                text = `สวัสดีค่ะ/ครับ ขออนุญาตติดตามเรื่องเอกสารที่ขอไว้เมื่อวันที่ ${deadline || "[วันที่]"} ค่ะ/ครับ\nหากยังไม่สะดวก รบกวนแจ้งกำหนดเวลาที่สามารถส่งได้ ขอบคุณมากค่ะ/ครับ`;
                break;
        }

        // Clean up empty lines if any variables were empty
        return text;
    };

    const generateEnglish = () => {
        if (!issueType) return "";

        const dlText = deadline ? ` If possible, by ${deadline}.` : "";
        const extraDocsEn = extraDocs ? ` Additional requests: ${extraDocs}.` : "";

        switch (issueType) {
            case "landlord":
                return `Hi, could you please share the lease/receipts/payment proof and a summary of deposit/balances so I can verify the records?${extraDocsEn}${dlText} Thank you.`;
            case "consumer":
                const refTextCon = reference ? ` and order/reference number ${reference}` : "";
                return `Please provide the receipt/invoice, warranty/return policy, service records${refTextCon} so I can verify the transaction.${extraDocsEn}${dlText} Thank you.`;
            case "employment":
                const drText = dateRange ? ` for ${dateRange}` : "";
                return `Please share the employment agreement, pay records${drText}, and any employment confirmation letter so I can verify my records.${extraDocsEn}${dlText} Thank you.`;
            case "government":
                const refTextGov = reference ? ` Reference ${reference} if any.` : "";
                return `I’m requesting a certified copy/confirmation regarding ${docRequest || "[Document Request]"}${extraDocsEn} for submission to a relevant agency.${refTextGov} Thank you.`;
            case "followup":
                return `Following up on the documents requested on ${deadline || "[DATE]"}. If not convenient yet, please let me know when you can send them. Thank you.`;
        }
        return "";
    };

    return (
        <div className="glass-card" style={{ padding: "2rem", borderLeft: "4px solid #f43f5e", marginTop: "3rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1rem" }}>📝 Request for Documents (Thai Template)</h2>

            {/* Safety Banner */}
            <div style={{
                background: "rgba(244, 63, 94, 0.1)",
                border: "1px solid #f43f5e",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1.5rem",
                color: "#fb7185",
                fontSize: "0.95rem"
            }}>
                <strong>Communication template only. Not legal advice or representation.</strong> Keep it factual and polite. Do not include sensitive personal data.
            </div>

            {/* Consent Checkbox */}
            <div style={{
                background: hasConsent ? "rgba(45, 212, 191, 0.05)" : "rgba(255, 255, 255, 0.02)",
                border: hasConsent ? "1px solid #2dd4bf" : "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "2rem",
                cursor: "pointer"
            }} onClick={() => setHasConsent(!hasConsent)}>
                <label style={{ display: "flex", gap: "0.75rem", alignItems: "center", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={hasConsent}
                        onChange={() => setHasConsent(!hasConsent)}
                        style={{ width: "20px", height: "20px" }}
                    />
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: hasConsent ? "#2dd4bf" : "#cbd5e1" }}>
                        I will not include sensitive personal data.
                    </span>
                </label>
            </div>

            {/* Form */}
            <div style={{ opacity: hasConsent ? 1 : 0.4, pointerEvents: hasConsent ? "auto" : "none", transition: "all 0.3s ease" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                    <label className="label">Issue Type</label>
                    <select
                        className="input-field"
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value as IssueType)}
                    >
                        <option value="">Select issue type...</option>
                        <option value="landlord">Landlord / Tenant</option>
                        <option value="consumer">Consumer</option>
                        <option value="employment">Employment</option>
                        <option value="government">Government office</option>
                        <option value="followup">Follow-up</option>
                    </select>
                </div>

                {issueType && (
                    <div className="animate-fade-in">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                            <div>
                                <label className="label">Recipient Name/Organization (Optional)</label>
                                <input type="text" className="input-field" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="e.g. Somchai Residence" />
                            </div>
                            {(issueType === "consumer" || issueType === "government") && (
                                <div>
                                    <label className="label">Reference/Order Number (Optional)</label>
                                    <input type="text" className="input-field" value={reference} onChange={e => setReference(e.target.value)} placeholder="e.g. ORD-12345" />
                                </div>
                            )}
                            <div>
                                <label className="label">Sender Name (Optional)</label>
                                <input type="text" className="input-field" value={sender} onChange={e => setSender(e.target.value)} placeholder="Your name" />
                            </div>
                            <div>
                                <label className="label">Contact Method (Optional)</label>
                                <input type="text" className="input-field" value={contact} onChange={e => setContact(e.target.value)} placeholder="Phone/Email" />
                            </div>

                            <div>
                                <label className="label">{issueType === 'followup' ? 'Original Request Date' : 'Deadline Date (Optional)'}</label>
                                <input type="text" className="input-field" value={deadline} onChange={e => setDeadline(e.target.value)} placeholder="e.g. 15 Oct 2026" />
                            </div>
                            {issueType === "employment" && (
                                <div>
                                    <label className="label">Date Range (Optional)</label>
                                    <input type="text" className="input-field" value={dateRange} onChange={e => setDateRange(e.target.value)} placeholder="e.g. Jan-Mar 2026" />
                                </div>
                            )}
                            {issueType === "government" && (
                                <div>
                                    <label className="label">Document Requested</label>
                                    <input type="text" className="input-field" value={docRequest} onChange={e => setDocRequest(e.target.value)} placeholder="e.g. Police Report Copy" />
                                </div>
                            )}
                        </div>

                        {issueType !== "followup" && (
                            <div style={{ marginBottom: "1.5rem" }}>
                                <label className="label">Extra Document Requests (Optional, Max 200)</label>
                                <textarea
                                    className="input-field"
                                    value={extraDocs}
                                    onChange={e => setExtraDocs(e.target.value.slice(0, 200))}
                                    placeholder="Append as bullet point..."
                                    style={{ minHeight: "80px" }}
                                />
                                <div style={{ fontSize: "0.8rem", color: extraDocs.length >= 200 ? "#ef4444" : "#94a3b8", textAlign: "right", marginTop: "0.25rem" }}>
                                    {extraDocs.length} / 200
                                </div>
                            </div>
                        )}

                        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                            <button onClick={clearForm} className="btn-secondary" style={{ padding: "0.75rem 1.5rem", color: "#f87171" }}>
                                🗑️ Clear
                            </button>
                        </div>

                        {/* Outputs */}
                        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <div style={{ marginBottom: "2rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#a78bfa" }}>Thai Message (Primary)</h3>
                                    <button onClick={() => copyToClipboard(generateThai())} className="btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
                                        📋 Copy Thai
                                    </button>
                                </div>
                                <div style={{
                                    fontSize: "1.2rem",
                                    fontWeight: 500,
                                    color: "#fff",
                                    fontFamily: "'Noto Sans Thai', sans-serif",
                                    whiteSpace: "pre-wrap",
                                    lineHeight: 1.6,
                                    background: "rgba(255,255,255,0.05)",
                                    padding: "1.5rem",
                                    borderRadius: "8px"
                                }}>
                                    {generateThai()}
                                </div>
                            </div>

                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#94a3b8" }}>English Summary</h3>
                                    <button onClick={() => copyToClipboard(generateEnglish())} className="btn-secondary" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
                                        📋 Copy English
                                    </button>
                                </div>
                                <div style={{
                                    fontSize: "0.95rem",
                                    color: "#cbd5e1",
                                    whiteSpace: "pre-wrap",
                                    lineHeight: 1.5,
                                    background: "rgba(0,0,0,0.2)",
                                    padding: "1rem",
                                    borderRadius: "8px"
                                }}>
                                    {generateEnglish()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

