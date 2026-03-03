import { WizardState, maskPassport, TASK_LABELS, daysUntil } from "@/lib/wizard-context";
import { getChecklistSections, getAssemblyOrder } from "@/lib/checklist-data";

const SHORTLINK = "tenee.app";

function formatDateForPdf(dateStr: string, privacyMode: boolean): string {
  if (!dateStr) return "Not provided";
  const date = new Date(dateStr);
  if (privacyMode) {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// No longer generating QR codes per master prompt guidelines

export async function generateChecklistHtml(state: WizardState): Promise<string> {
  const sections = state.taskType
    ? getChecklistSections(state.taskType, state.financialProofType)
    : [];
  const taskLabel = state.taskType ? TASK_LABELS[state.taskType] : "General";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Checklist - ${taskLabel} - Tenee</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Noto+Sans+Thai:wght@400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', 'Noto Sans Thai', sans-serif; color: #1a1a2e; padding: 40px; font-size: 16px; }
  .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #f5c542; padding-bottom: 20px; }
  .header h1 { font-size: 26px; font-weight: 800; color: #1a1a2e; margin-bottom: 4px; }
  .header .subtitle { font-size: 14px; color: #666; }
  .case-info { background: #f8f9fa; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; font-size: 14px; }
  .case-info .row { display: flex; justify-content: space-between; padding: 4px 0; }
  .case-info .label { color: #666; }
  .case-info .value { font-weight: 600; }
  .section { margin-bottom: 24px; }
  .section-title { font-size: 16px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 6px; }
  .item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 18px; }
  .checkbox { width: 24px; height: 24px; border: 2px solid #ccc; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
  .item-label { flex: 1; line-height: 1.4; }
  .item-note { font-size: 13px; color: #888; margin-top: 2px; }
  .required { color: #e74c3c; font-size: 12px; }
  .footer { margin-top: 40px; text-align: center; padding-top: 20px; border-top: 2px solid #f5c542; font-size: 11px; color: #999; }
  .footer a { color: #f59e0b; text-decoration: none; }
  .footer .qr-section { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 8px; }
  .footer .qr-section img { border-radius: 4px; }
  .disclaimer { background: #fff9e6; border: 1px solid #f5c542; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; font-size: 12px; color: #8b6914; line-height: 1.5; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<div class="header">
  <h1>📋 PREPARATION CHECKLIST</h1>
  <div class="subtitle">${taskLabel} — Not an official form</div>
</div>

<div class="disclaimer">
  <strong>⚠️ DISCLAIMER:</strong> Tenee is not a law firm. This checklist is for organization only. Requirements vary by office and can change. Only immigration officers decide outcomes. Verify with your local office.
</div>

<div class="case-info">
  <div class="row"><span class="label">Name:</span><span class="value">${state.fullName || "—"}</span></div>
  <div class="row"><span class="label">Nationality:</span><span class="value">${state.nationality || "—"}</span></div>
  ${state.dateOfBirth && !state.dobPrivacy && !state.privacyMode ? `<div class="row"><span class="label">DOB:</span><span class="value">${formatDateForPdf(state.dateOfBirth, false)}</span></div>` : ""}
  ${state.dateOfBirth && !state.dobPrivacy && state.privacyMode ? `<div class="row"><span class="label">DOB:</span><span class="value">${formatDateForPdf(state.dateOfBirth, true)}</span></div>` : ""}
  <div class="row"><span class="label">Passport:</span><span class="value">${maskPassport(state.passportNumber)}</span></div>
  <div class="row"><span class="label">Office:</span><span class="value">${state.officeCity || "—"}</span></div>
  ${state.expiryDate ? `<div class="row"><span class="label">Expiry:</span><span class="value">${formatDateForPdf(state.expiryDate, state.privacyMode)}</span></div>` : ""}
</div>

${sections
      .map(
        (section) => `
<div class="section">
  <div class="section-title">${section.title}</div>
  ${section.items
            .map(
              (item) => `
  <div class="item">
    <div class="checkbox"></div>
    <div class="item-label">
      ${item.label} ${item.required ? '<span class="required">*required</span>' : ""}
      ${item.note ? `<div class="item-note">💡 ${item.note}</div>` : ""}
    </div>
  </div>`
            )
            .join("")}
</div>`
      )
      .join("")}

<div class="footer">
  <div>Generated by Tenee (free) — ${SHORTLINK}</div>
  <p style="margin-top: 4px;">Template version: v1.0 • Last updated: ${new Date().toISOString().split("T")[0]} — Not a law firm. Not legal advice. Thailand only.</p>
</div>
</body>
</html>`;
}

export async function generatePacketHtml(state: WizardState): Promise<string> {
  const sections = state.taskType
    ? getChecklistSections(state.taskType, state.financialProofType)
    : [];
  const assemblyOrder = state.taskType ? getAssemblyOrder(state.taskType) : [];
  const taskLabel = state.taskType ? TASK_LABELS[state.taskType] : "General";
  const lastUpdated = new Date().toISOString().split("T")[0];

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Preparation Packet - ${taskLabel} - Tenee</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Noto+Sans+Thai:wght@400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', 'Noto Sans Thai', sans-serif; color: #1a1a2e; font-size: 14px; }
  .page { padding: 40px; min-height: 100vh; page-break-after: always; }
  .page:last-child { page-break-after: auto; }

  /* Cover Page */
  .cover { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
  .cover h1 { font-size: 28px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
  .cover .not-official { font-size: 14px; color: #e74c3c; font-weight: 700; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 1px; }
  .cover .disclaimer-box { background: #fff3f3; border: 2px solid #e74c3c; border-radius: 12px; padding: 20px 24px; margin-bottom: 30px; text-align: left; font-size: 13px; color: #8b2020; line-height: 1.6; max-width: 500px; }
  .cover .case-box { background: #f8f9fa; border-radius: 12px; padding: 20px 24px; max-width: 500px; width: 100%; text-align: left; margin-bottom: 30px; }
  .cover .case-box .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #eee; }
  .cover .case-box .row:last-child { border-bottom: none; }
  .cover .case-box .label { color: #666; }
  .cover .case-box .value { font-weight: 600; }
  .cover .viral-footer { background: linear-gradient(135deg, #fffbeb, #f0f9ff); border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px 20px; max-width: 500px; width: 100%; text-align: center; }
  .cover .viral-footer .brand { font-size: 16px; font-weight: 700; color: #f59e0b; margin-bottom: 4px; }
  .cover .viral-footer .link { color: #3b82f6; text-decoration: none; font-weight: 600; font-size: 14px; }

  /* Checklist Page */
  .section { margin-bottom: 20px; }
  .section-title { font-size: 14px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
  .item { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 16px; }
  .checkbox { width: 20px; height: 20px; border: 2px solid #ccc; border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
  .item-note { font-size: 12px; color: #888; margin-top: 2px; }
  .required { color: #e74c3c; font-size: 11px; }

  /* Assembly Page */
  .assembly-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 14px; margin-bottom: 8px; background: #f8f9fa; border-radius: 8px; font-size: 15px; }
  .assembly-num { width: 28px; height: 28px; border-radius: 50%; background: #f5c542; color: #1a1a2e; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }

  h2 { font-size: 20px; font-weight: 700; margin-bottom: 16px; color: #1a1a2e; }
  .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 12px; }
  .footer a { color: #f59e0b; text-decoration: none; }
  .edge-warn { background: #fff3f3; border: 1px solid #e74c3c; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 12px; color: #8b2020; line-height: 1.5; max-width: 500px; }
  .edge-info { background: #eff6ff; border: 1px solid #93c5fd; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 12px; color: #1e40af; line-height: 1.5; max-width: 500px; }
  .edge-caution { background: #fff9e6; border: 1px solid #f5c542; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 12px; color: #8b6914; line-height: 1.5; }
  .tier-legend-pdf { display: flex; gap: 16px; margin-bottom: 16px; font-size: 11px; color: #666; }
  .tier-legend-pdf .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 4px; }
  @media print { .page { padding: 20px; } }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="page cover">
  <h1>📄 PREPARATION PACKET</h1>
  <div class="not-official">(NOT AN OFFICIAL FORM)</div>
  <div style="font-size: 13px; color: #666; margin-bottom: 24px;">Template version: v1.0 • Last updated: ${lastUpdated}</div>

  <div class="disclaimer-box">
    <strong>⚠️ IMPORTANT DISCLAIMER</strong><br><br>
    Tenee is a paperwork preparation and information tool. Not a law firm. Not legal advice. Not representation. No guarantee. Requirements vary by office — verify locally.<br><br>
    This document is NOT a government form. It is a preparation guide to help organize your paperwork. Always verify current requirements with your local immigration office.<br><br>
    <span style="color:#2a9d8f; font-weight:600;">We do not sell your data. Please avoid including sensitive personal data in printed/shared copies.</span>
  </div>

  <div class="edge-info" style="max-width:500px;width:100%;text-align:left;">
    📅 <strong>Before you go:</strong> Check Thai public holidays — immigration offices are closed on national holidays and weekends.
  </div>

  ${(state.recentHotelStay === "yes" || state.recentHotelStay === "not_sure") ? `
  <div class="edge-caution" style="max-width:500px;width:100%;text-align:left;">
    🏨 <strong>TM30 update may be needed:</strong> Recent hotel stay indicated. Some offices may ask your landlord/host to update TM30 again. Verify locally.
    <br><em style="font-size:11px;">System/office behavior — not official; verify locally.</em>
  </div>` : ""}

  ${(!isNaN(daysUntil(state.expiryDate)) && daysUntil(state.expiryDate) <= 7 && (state.taskType === "visa_extension" || state.taskType === "retirement")) ? `
  <div class="edge-warn" style="max-width:500px;width:100%;text-align:left;">
    🚨 <strong>Strict deadline:</strong> Permission to stay expires in ${daysUntil(state.expiryDate)} day(s). Apply early. Missing this date may result in overstay.
    <br><em style="font-size:11px;">System/office behavior warning — not official; verify locally.</em>
  </div>` : ""}

  <div class="case-box">
    <div class="row"><span class="label">Task:</span><span class="value">${taskLabel}</span></div>
    <div class="row"><span class="label">Name:</span><span class="value">${state.fullName || "—"}</span></div>
    <div class="row"><span class="label">Nationality:</span><span class="value">${state.nationality || "—"}</span></div>
    <div class="row"><span class="label">Passport:</span><span class="value">${maskPassport(state.passportNumber)}</span></div>
    <div class="row"><span class="label">Office:</span><span class="value">${state.officeCity || "—"}</span></div>
    ${state.expiryDate ? `<div class="row"><span class="label">Expiry:</span><span class="value">${formatDateForPdf(state.expiryDate, state.privacyMode)}</span></div>` : ""}
    <div class="row"><span class="label">Mode:</span><span class="value">${state.mode === "caregiver" ? "Caregiver" : "Self"}</span></div>
  </div>

  <div class="viral-footer" style="padding: 12px 20px;">
    <div class="brand">Generated by Tenee (free) — ${SHORTLINK}</div>
  </div>
</div>

<!-- CHECKLIST PAGE -->
<div class="page">
  <h2>✅ Document Checklist</h2>
  <div class="tier-legend-pdf">
    <span><span class="dot" style="background:#22c55e;"></span> Baseline (required to start)</span>
    <span><span class="dot" style="background:#f59e0b;"></span> Often requested</span>
    <span><span class="dot" style="background:#3b82f6;"></span> Situational</span>
  </div>
  ${sections
      .map(
        (section) => `
  <div class="section">
    <div class="section-title">${section.title}</div>
    ${section.items
            .map(
              (item) => `
    <div class="item">
      <div class="checkbox"></div>
      <div>
        ${item.label} ${item.required ? '<span class="required">*</span>' : ""}
        ${item.note ? `<div class="item-note">💡 ${item.note}</div>` : ""}
      </div>
    </div>`
            )
            .join("")}
  </div>`
      )
      .join("")}

  <div class="footer">
    <span>Generated by Tenee (free) — ${SHORTLINK}</span>
  </div>
</div>

<!-- ASSEMBLY ORDER PAGE -->
<div class="page">
  <h2>📑 Assembly Order</h2>
  <p style="color:#666; margin-bottom:20px; font-size:14px; line-height:1.5;">
    Organize your documents in this order when submitting. This is a general guide — your office may have specific preferences.
  </p>

  ${assemblyOrder
      .map(
        (item, i) => `
  <div class="assembly-item">
    <div class="assembly-num">${i + 1}</div>
    <div>${item}</div>
  </div>`
      )
      .join("")}

  <div class="footer" style="margin-top:40px;">
    <span>Generated by Tenee (free) — ${SHORTLINK}</span>
  </div>
</div>

</body>
</html>`;
}

export function downloadHtmlAsPdf(html: string, filename: string) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    // Fallback: download as HTML
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.replace(".pdf", ".html");
    a.click();
    URL.revokeObjectURL(url);
    return;
  }

  printWindow.document.write(html);
  printWindow.document.close();

  // Wait for fonts to load then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
}
