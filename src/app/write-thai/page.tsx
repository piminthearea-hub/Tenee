"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PrintPageButton from "@/components/PrintPageButton";
import Icon from "@/components/Icon";
import {
    RecipientType,
    Tone,
    RECIPIENT_LABELS,
    RECIPIENT_ICONS,
    PURPOSES,
    generateTemplate,
    TemplateInput,
} from "@/lib/thai-templates";

function WriteThaiForm() {
    const searchParams = useSearchParams();

    const [recipient, setRecipient] = useState<RecipientType | "">("");
    const [purpose, setPurpose] = useState("");
    const [tone, setTone] = useState<Tone>("normal");
    const [copied, setCopied] = useState<string | null>(null);
    const [hasGenerated, setHasGenerated] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);

    // Input fields
    const [applicantName, setApplicantName] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [passportLast4, setPassportLast4] = useState("");
    const [address, setAddress] = useState("");
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");
    const [accountOrRef, setAccountOrRef] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [condoName, setCondoName] = useState("");
    const [bankBranch, setBankBranch] = useState("");
    const [company, setCompany] = useState("");
    const [officeCityImm, setOfficeCityImm] = useState("");
    const [agencyName, setAgencyName] = useState("");
    const [requestDesc, setRequestDesc] = useState("");
    const [task, setTask] = useState("");
    const [status, setStatus] = useState("");

    // Initialize from URL params once
    useEffect(() => {
        if (searchParams) {
            const getParam = (k: string) => searchParams.get(k) || "";

            const rType = getParam("recipient_type") as RecipientType;
            if (Object.keys(RECIPIENT_LABELS).includes(rType)) {
                setRecipient(rType);
            }
            if (getParam("purpose")) setPurpose(getParam("purpose"));
            if (getParam("office_city")) setOfficeCityImm(getParam("office_city"));
            if (getParam("applicant_name")) setApplicantName(getParam("applicant_name"));
            if (getParam("tone") === "very_polite") setTone("very_polite");
        }
    }, [searchParams]);

    const availablePurposes = recipient ? PURPOSES[recipient] : [];

    const result = useMemo(() => {
        if (!recipient || !purpose) return null;
        const input: TemplateInput = {
            recipientName,
            applicantName,
            passportLast4,
            address,
            unit,
            date,
            accountOrRef,
            phone,
            email,
            condoName,
            bankBranch,
            company,
            officeCityImm,
            agencyName,
            requestDesc,
            task,
            status,
            tone,
        };
        return generateTemplate(recipient, purpose, input);
    }, [
        recipient, purpose, tone, applicantName, recipientName, passportLast4,
        address, unit, date, accountOrRef, phone, email, condoName, bankBranch,
        company, officeCityImm, agencyName, requestDesc, task, status,
    ]);

    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadPdf = () => {
        if (!result) return;
        const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Thai Letter - Tenee</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+Thai:wght@400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', 'Noto Sans Thai', sans-serif; color: #1a1a2e; padding: 50px; font-size: 16px; }
  .disclaimer { background: #fff9e6; border: 1px solid #f5c542; border-radius: 8px; padding: 10px 14px; margin-bottom: 24px; font-size: 11px; color: #8b6914; }
  h2 { font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #1a1a2e; }
  .thai { font-family: 'Noto Sans Thai', sans-serif; font-size: 17px; line-height: 2; white-space: pre-wrap; padding: 20px; background: #f8f9fa; border-radius: 10px; margin-bottom: 30px; }
  .english { font-size: 14px; line-height: 1.7; white-space: pre-wrap; color: #555; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
  .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 16px; }
  .footer a { color: #f59e0b; text-decoration: none; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<div class="disclaimer">
  ⚠️ This is a communication template only. Not legal advice or representation. Generated by Tenee (free). Thailand-only.
</div>

<h2>🇹🇭 Thai Message</h2>
<div class="thai">${result.thai}</div>

<h2>🇺🇸 English Translation</h2>
<div class="english">${result.english}</div>

<div class="footer">
  Generated by <strong>Tenee</strong> (free) — <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://tenee.app"}">${process.env.NEXT_PUBLIC_APP_URL || "https://tenee.app"}</a>
</div>
</body>
</html>`;

        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.onload = () => setTimeout(() => printWindow.print(), 500);
        }
    };

    // Dynamic field visibility
    const showRecipientName = recipient === "landlord";
    const showCondoName = recipient === "juristic";
    const showUnit = recipient === "juristic";
    const showBankBranch = recipient === "bank";
    const showCompany = recipient === "insurance";
    const showOfficeCityImm = recipient === "immigration";
    const showAgency = recipient === "government";
    const showRequestDesc = recipient === "government";
    const showTask = recipient === "immigration" && purpose === "doc_inquiry";
    const showStatus = recipient === "immigration" && purpose === "ninety_day_status";
    const showPassport = recipient === "landlord" && purpose === "tm30_request";
    const showAccount = ["bank", "insurance"].includes(recipient || "") || (recipient === "government" && purpose !== "general_inquiry");

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
            {/* Banner */}
            <div className="disclaimer-banner flex items-center justify-center gap-2" style={{ marginBottom: "2rem", textAlign: "center" }}>
                <Icon name="globe" className="w-5 h-5 text-current" ariaLabel="Thai" /> This is a communication template only. Not legal advice or representation. Thailand-only.
            </div>

            {/* Title */}
            <div className="animate-fade-in" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    <span className="gradient-text-teal">Write in Thai</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                    Generate polite Thai messages for landlords, banks, offices, and more.
                </p>
                <div className="flex items-center gap-2" style={{ padding: "0.5rem", background: "rgba(245, 197, 66, 0.1)", border: "1px solid rgba(245, 197, 66, 0.3)", borderRadius: "8px", display: "inline-block", color: "#f5c542", fontSize: "0.9rem", fontWeight: 600 }}>
                    <Icon name="warning" className="w-4 h-4 text-current" ariaLabel="Warning" /> Do not include sensitive personal data (e.g. full passport number, bank account).
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                    {!confirmClear ? (
                        <button
                            onClick={() => setConfirmClear(true)}
                            style={{
                                background: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                color: "#ef4444",
                                padding: "0.4rem 1rem",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                fontWeight: 600
                            }}
                        >
                            <span className="flex items-center gap-2 justify-center"><Icon name="trash" className="w-4 h-4" ariaLabel="Clear" /> Clear my data</span>
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
                                        window.location.href = '/write-thai';
                                    }}
                                    style={{
                                        background: "#ef4444",
                                        border: "none",
                                        color: "#fff",
                                        padding: "0.4rem 1rem",
                                        borderRadius: "20px",
                                        fontSize: "0.85rem",
                                        cursor: "pointer",
                                        fontWeight: 600
                                    }}
                                >
                                    Yes, clear it
                                </button>
                                <button
                                    onClick={() => setConfirmClear(false)}
                                    style={{
                                        background: "rgba(255,255,255,0.1)",
                                        border: "none",
                                        color: "#cbd5e1",
                                        padding: "0.4rem 1rem",
                                        borderRadius: "20px",
                                        fontSize: "0.85rem",
                                        cursor: "pointer",
                                        fontWeight: 600
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Form */}
            <div style={{ display: "grid", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {/* Recipient Type */}
                <div>
                    <label className="label">Recipient Type</label>
                    <select
                        className="select-field"
                        value={recipient}
                        onChange={(e) => {
                            setRecipient(e.target.value as RecipientType);
                            setPurpose("");
                            setHasGenerated(false);
                        }}
                        id="recipient-type"
                    >
                        <option value="">Select recipient...</option>
                        {(Object.keys(RECIPIENT_LABELS) as RecipientType[]).map((r) => (
                            <option key={r} value={r}>
                                {RECIPIENT_ICONS[r]} {RECIPIENT_LABELS[r]}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Purpose */}
                {recipient && (
                    <div className="animate-fade-in">
                        <label className="label">Purpose</label>
                        <select
                            className="select-field"
                            value={purpose}
                            onChange={(e) => {
                                setPurpose(e.target.value);
                                setHasGenerated(false);
                            }}
                            id="purpose"
                        >
                            <option value="">Select purpose...</option>
                            {availablePurposes.map((p) => (
                                <option key={p.value} value={p.value}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Dynamic fields */}
                {purpose && (
                    <div className="animate-fade-in" style={{ display: "grid", gap: "1rem" }}>
                        <div>
                            <label className="label" htmlFor="wt-name">Your Name</label>
                            <input
                                id="wt-name"
                                type="text"
                                className="input-field"
                                placeholder="e.g. JOHN SMITH"
                                value={applicantName}
                                onChange={(e) => { setApplicantName(e.target.value); setHasGenerated(false); }}
                            />
                        </div>

                        {showRecipientName && (
                            <div>
                                <label className="label" htmlFor="wt-recipient">Recipient Name (optional)</label>
                                <input
                                    id="wt-recipient"
                                    type="text"
                                    className="input-field"
                                    placeholder="Landlord name"
                                    value={recipientName}
                                    onChange={(e) => { setRecipientName(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showCondoName && (
                            <div>
                                <label className="label" htmlFor="wt-condo">Condo Name</label>
                                <input
                                    id="wt-condo"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. The Base Sukhumvit"
                                    value={condoName}
                                    onChange={(e) => { setCondoName(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showUnit && (
                            <div>
                                <label className="label" htmlFor="wt-unit">Room / Unit</label>
                                <input
                                    id="wt-unit"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. 1234"
                                    value={unit}
                                    onChange={(e) => { setUnit(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showBankBranch && (
                            <div>
                                <label className="label" htmlFor="wt-bank">Bank / Branch</label>
                                <input
                                    id="wt-bank"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Bangkok Bank, Sukhumvit Branch"
                                    value={bankBranch}
                                    onChange={(e) => { setBankBranch(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showCompany && (
                            <div>
                                <label className="label" htmlFor="wt-company">Insurance Company</label>
                                <input
                                    id="wt-company"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. AIA Thailand"
                                    value={company}
                                    onChange={(e) => { setCompany(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showOfficeCityImm && (
                            <div>
                                <label className="label" htmlFor="wt-office">Office / City</label>
                                <input
                                    id="wt-office"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Chaeng Wattana (Bangkok)"
                                    value={officeCityImm}
                                    onChange={(e) => { setOfficeCityImm(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showAgency && (
                            <div>
                                <label className="label" htmlFor="wt-agency">Agency / Department</label>
                                <input
                                    id="wt-agency"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. District Office, Revenue Department"
                                    value={agencyName}
                                    onChange={(e) => { setAgencyName(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showRequestDesc && (
                            <div>
                                <label className="label" htmlFor="wt-request">What are you requesting?</label>
                                <input
                                    id="wt-request"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Birth certificate copy, tax document"
                                    value={requestDesc}
                                    onChange={(e) => { setRequestDesc(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showTask && (
                            <div>
                                <label className="label" htmlFor="wt-task">Task Type</label>
                                <input
                                    id="wt-task"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Retirement extension, Visa extension"
                                    value={task}
                                    onChange={(e) => { setTask(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showStatus && (
                            <div>
                                <label className="label" htmlFor="wt-status">Online Status</label>
                                <select
                                    id="wt-status"
                                    className="select-field"
                                    value={status}
                                    onChange={(e) => { setStatus(e.target.value); setHasGenerated(false); }}
                                >
                                    <option value="">Select...</option>
                                    <option value="PENDING (รอดำเนินการ)">Pending</option>
                                    <option value="REJECTED (ไม่อนุมัติ)">Rejected</option>
                                </select>
                            </div>
                        )}

                        {showPassport && (
                            <div>
                                <label className="label" htmlFor="wt-passport">Passport Last 4 Digits (optional)</label>
                                <input
                                    id="wt-passport"
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. 1234"
                                    maxLength={4}
                                    value={passportLast4}
                                    onChange={(e) => { setPassportLast4(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        {showAccount && (
                            <div>
                                <label className="label" htmlFor="wt-account">Account / Policy / Reference #</label>
                                <input
                                    id="wt-account"
                                    type="text"
                                    className="input-field"
                                    placeholder="Account or reference number (optional)"
                                    value={accountOrRef}
                                    onChange={(e) => { setAccountOrRef(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        )}

                        <div>
                            <label className="label" htmlFor="wt-address">Address (optional)</label>
                            <input
                                id="wt-address"
                                type="text"
                                className="input-field"
                                placeholder="Your address"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value); setHasGenerated(false); }}
                            />
                        </div>

                        <div>
                            <label className="label" htmlFor="wt-date">Date (optional)</label>
                            <input
                                id="wt-date"
                                type="date"
                                className="input-field"
                                value={date}
                                onChange={(e) => { setDate(e.target.value); setHasGenerated(false); }}
                            />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                            <div>
                                <label className="label" htmlFor="wt-phone">Phone (optional)</label>
                                <input
                                    id="wt-phone"
                                    type="tel"
                                    className="input-field"
                                    placeholder="e.g. 081-234-5678"
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                            <div>
                                <label className="label" htmlFor="wt-email">Email (optional)</label>
                                <input
                                    id="wt-email"
                                    type="email"
                                    className="input-field"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setHasGenerated(false); }}
                                />
                            </div>
                        </div>

                        {/* Tone selector */}
                        <div>
                            <label className="label">Tone</label>
                            <div style={{ display: "flex", gap: "0.75rem" }}>
                                {([
                                    { value: "normal" as Tone, label: "Normal Polite", icon: <Icon name="happy" ariaLabel="Normal" /> },
                                    { value: "very_polite" as Tone, label: "Very Polite", icon: <Icon name="thumbUp" ariaLabel="Very Polite" /> },
                                ]).map((t) => (
                                    <button
                                        key={t.value}
                                        type="button"
                                        onClick={() => { setTone(t.value); setHasGenerated(false); }}
                                        style={{
                                            flex: 1,
                                            padding: "0.75rem 1rem",
                                            background:
                                                tone === t.value
                                                    ? "rgba(45, 212, 191, 0.1)"
                                                    : "rgba(255,255,255,0.03)",
                                            border:
                                                tone === t.value
                                                    ? "2px solid rgba(45, 212, 191, 0.5)"
                                                    : "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "12px",
                                            cursor: "pointer",
                                            color: "inherit",
                                            fontSize: "0.95rem",
                                            fontWeight: 600,
                                            textAlign: "center",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        <div className="flex items-center justify-center gap-2">{t.icon} {t.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button Wrapper */}
                        <div style={{ marginTop: "1rem" }}>
                            <button
                                className="btn-primary"
                                style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
                                onClick={() => setHasGenerated(true)}
                                disabled={!applicantName}
                            >
                                {applicantName ? <span className="flex items-center justify-center gap-2"><Icon name="sparkles" className="w-5 h-5" ariaLabel="Generate" /> Generate Message</span> : "Please enter your name first"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Output */}
            {hasGenerated && result && (
                <div className="animate-fade-in">
                    {/* Thai output */}
                    <div
                        style={{
                            marginBottom: "1.5rem",
                            background: "rgba(45, 212, 191, 0.05)",
                            border: "1px solid rgba(45, 212, 191, 0.2)",
                            borderRadius: "16px",
                            padding: "1.5rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "1rem",
                            }}
                        >
                            <h3 className="flex items-center gap-2" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                                <Icon name="globe" className="w-5 h-5" ariaLabel="Thai" /> Thai Message
                            </h3>
                            <button
                                className="btn-secondary"
                                style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", minHeight: "36px" }}
                                onClick={() => copyToClipboard(result.thai, "thai")}
                                id="copy-thai"
                            >
                                {copied === "thai" ? <span className="flex items-center gap-1"><Icon name="check" className="w-4 h-4 text-green-500" ariaLabel="Copied" /> Copied!</span> : <span className="flex items-center gap-1"><Icon name="clipboard" className="w-4 h-4" ariaLabel="Copy" /> Copy Thai</span>}
                            </button>
                        </div>
                        <div
                            className="thai-text"
                            style={{
                                background: "rgba(0,0,0,0.2)",
                                padding: "1.25rem",
                                borderRadius: "12px",
                                fontSize: "1.1rem",
                            }}
                        >
                            {result.thai}
                        </div>
                    </div>

                    {/* English output */}
                    <div
                        style={{
                            marginBottom: "1.5rem",
                            background: "rgba(59, 130, 246, 0.05)",
                            border: "1px solid rgba(59, 130, 246, 0.15)",
                            borderRadius: "16px",
                            padding: "1.5rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "1rem",
                            }}
                        >
                            <h3 className="flex items-center gap-2" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                                <Icon name="globe" className="w-5 h-5" ariaLabel="English" /> English Translation
                            </h3>
                            <button
                                className="btn-secondary"
                                style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", minHeight: "36px" }}
                                onClick={() => copyToClipboard(result.english, "english")}
                                id="copy-english"
                            >
                                {copied === "english" ? <span className="flex items-center gap-1"><Icon name="check" className="w-4 h-4 text-green-500" ariaLabel="Copied" /> Copied!</span> : <span className="flex items-center gap-1"><Icon name="clipboard" className="w-4 h-4" ariaLabel="Copy" /> Copy English</span>}
                            </button>
                        </div>
                        <div
                            style={{
                                background: "rgba(0,0,0,0.2)",
                                padding: "1.25rem",
                                borderRadius: "12px",
                                fontSize: "0.95rem",
                                whiteSpace: "pre-wrap",
                                lineHeight: 1.7,
                                color: "#94a3b8",
                            }}
                        >
                            {result.english}
                        </div>
                    </div>

                    {/* Download PDF */}
                    <button
                        className="btn-primary"
                        onClick={downloadPdf}
                        style={{ width: "100%" }}
                        id="download-thai-pdf"
                    >
                        <span className="flex items-center justify-center gap-2"><Icon name="document" className="w-5 h-5" ariaLabel="Download" /> Download as PDF</span>
                    </button>
                </div>
            )}
            <PrintPageButton />
        </div>
    );
}

export default function WriteThai() {
    return (
        <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "#64748b" }}>Loading...</div>}>
            <WriteThaiForm />
        </Suspense>
    );
}
